import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import appconfig from '@/config'

import {
  createDoc,
  updateSubjectDataRecord,
  updateExperimentCounter,
  loadDoc,
  fsnow,
} from './firestore-db'

// ENTER YOUR BETWEEN-SUBJECTS CONDITIONS HERE
const conditions = {instructionsCond: ["A", "B"], taskCond: ["C", "D", "E"]}
// 

export default defineStore('smilestore', {
  // arrow function recommended for full type inference
  state: () => ({
    local: useStorage(appconfig.local_storage_key, {
      // syncs with local storage
      knownUser: false,
      lastRoute: appconfig.mode === 'development' ? 'recruit' : 'landing',
      allowJumps: appconfig.mode === 'development',
      docRef: null,
      partNum: null,
      completionCode: '',
      totalWrites: 0,
      lastWrite: null,
      condStr: ''
    }),
    global: {
      // ephemeral state, resets on browser refresh
      progress: 0,
      page_bg_color: '#fff',
      page_text_color: '#000',
      status_bar_bg_color: '#fff',
      status_bar_text_color: '#000',
      db_connected: false,
      search_params: null,
      possible_conditions: conditions,
    },
    dev: {
      // ephemeral state, utilized by developer mode functions
      page_provides_autofill: null,
    },
    data: {
      // syncs with firestore
      trial_num: 0, // not being updated correctly
      consented: false,
      done: false,
      recruitment_service: 'web', // fake
      recruitment_info: {}, // empty
      browser_data: [], // empty
      demographic_form: {}, // empty
      conditions: {},
      withdraw: false, // false
      withdraw_data: {}, // empty
    },
    config: appconfig,
  }),

  getters: {
    isKnownUser: (state) => state.local.knownUser,
    isConsented: (state) => state.data.consented,
    isDone: (state) => state.data.done,
    lastRoute: (state) => state.local.lastRoute,
    isDBConnected: (state) => state.global.db_connected,
    hasAutofill: (state) => state.dev.page_provides_autofill,
    searchParams: (state) => state.global.search_params,
    recruitmentService: (state) => state.data.recruitment_service,
    getCondString: (state) => state.local.condStr
  },

  actions: {
    assignConds(id){
      if(this.data.conditions !== {}){ // if there's already a condition in the URL, skip random condition assignment
        return 
      }

      const keys = Object.keys(conditions)

      // function for all possible combinations of N arrays (from https://stackoverflow.com/questions/8936610/how-can-i-create-every-combination-possible-for-the-contents-of-two-arrays)
      const combine = ([head, ...[headTail, ...tailTail]]) => {
        if (!headTail) return head
        const combined = headTail.reduce((acc, x) => acc.concat(head.map(h => `${h}-${x}`)), [])
        return combine([combined, ...tailTail])
      }

      // Append conditions
      const combos = combine(Object.values(conditions))

      // generate as many random numbers as the id number (seeded), then take the last one
      const rand = Array(id+1).fill().map(Math.random)[id] // add one so it works when ID is 0

      // select a condition
      const randomCond = combos[Math.floor(rand * combos.length)];

      // parse into separate variables
      const randomCondParsed = randomCond.split("-");

      // save according to keys
      const conditionList = {}
      let i = 0;
      while (i < keys.length) {
          conditionList[keys[i]] = randomCondParsed[i]
          i += 1;
      }

      this.local.condStr = randomCond // string of conditions for URL
      this.data.conditions = conditionList // full list of conditions
    },
    overwriteConds(condStr){
      const keys = Object.keys(conditions)

      // parse into separate variables
      const randomCondParsed = condStr.split("-");

      // save according to keys
      const conditionList = {}
      let i = 0;
      while (i < keys.length) {
        const possibles = conditions[keys[i]]
        const assigned = randomCondParsed[i]
        if(possibles.indexOf(assigned) === -1){
          alert("That's not a valid condition!")
          return false
        }
        conditionList[keys[i]] = assigned
        i += 1;
      }

      this.local.condStr = condStr // string of conditions for URL
      this.data.conditions = conditionList // full list of conditions
      return true
    },
    setDBConnected() {
      this.global.db_connected = true
    },
    setSearchParams(search_params) {
      this.global.search_params = search_params
    },
    setConsented() {
      this.data.consented = true
    },
    setDone() {
      this.data.done = true
    },
    setCompletionCode(code) {
      this.local.completionCode = code
    },
    recordWindowEvent(type, event_data = null) {
      if (event_data) {
        this.data.browser_data.push({
          event_type: type,
          timestamp: fsnow(),
          event_data,
        })
      } else {
        this.data.browser_data.push({
          event_type: type,
          timestamp: fsnow(),
        })
      }
    },
    setPageAutofill(fn) {
      this.dev.page_provides_autofill = fn
    },
    removePageAutofill() {
      this.dev.page_provides_autofill = null
    },
    setRecruitmentService(service, info) {
      this.data.recruitment_service = service
      this.data.recruitment_info = info
    },
    autofill() {
      if (this.dev.page_provides_autofill) {
        this.dev.page_provides_autofill()
      }
    },
    saveDemographicForm(data) {
      this.data.demographic_form = data
    },
    async setKnown() {
      this.local.knownUser = true
      this.local.docRef = await createDoc(this.data)
      this.local.partNum = await updateExperimentCounter('participants')

      // assign conditions, with id number for randomization
      this.assignConds(this.local.partNum)

      if (this.local.docRef) {
        this.setDBConnected()
      }
    },
    async loadData() {
      let data
      if (this.local.docRef) {
        data = await loadDoc(this.local.docRef)
      }
      if (data) {
        this.data = data
        this.setDBConnected()
      }
    },
    setLastRoute(route) {
      this.local.lastRoute = route
      // if (route !== 'config') {
      //   this.local.lastRoute = route
      // }
    },
    async saveData(force = false) {
      if (this.isDBConnected) {
        if (!force && this.local.totalWrites >= appconfig.max_writes) {
          console.error(
            'SMILESTORE: max writes reached to firebase.  Data NOT saved.  Call saveData() less numerously to avoid problems/cost issues.'
          )
          return
        }

        if (
          !force &&
          this.local.lastWrite &&
          Date.now() - this.local.lastWrite < appconfig.min_write_interval
        ) {
          console.error(
            'SMILESTORE: write interval too short for firebase.  Data NOT saved. Call saveData() less frequently to avoid problems/cost issues.'
          )
          console.error(
            'SMILESTORE: interval was',
            appconfig.min_write_interval
          )
          // console.error(Date.now() - this.local.lastWrite)
          return
        }
        updateSubjectDataRecord(this.data, this.local.docRef)
        this.local.totalWrites += 1
        this.local.lastWrite = Date.now()
        console.log('Request to firebase successful')
      }
    },
    resetLocal() {
      // this.local.knownUser = false
      // this.local.lastRoute = 'welcome'
      // this.local.allowJumps = false
      // this.global.db_connected = false
      this.$reset()
    },
  },
})
