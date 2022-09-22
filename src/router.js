// import { ref } from 'vue'
import '@/seed.js' // random number seed
import { createRouter, createWebHashHistory } from 'vue-router'
import useSmileStore from '@/stores/smiledata' // get access to the global store
import appconfig from '@/config'
import { processQuery } from '@/utils'
import Timeline from '@/timeline'

// 1. Import route components
import RecruitmentChooser from '@/components/pages/RecruitmentChooserPage.vue'
import MTurk from '@/components/pages/MTurkRecruitPage.vue'
import Advertisement from '@/components/pages/AdvertisementPage.vue'
import Consent from '@/components/pages/ConsentPage.vue'
import DemographicSurvey from '@/components/pages/DemographicSurveyPage.vue'
import Captcha from '@/components/pages/CaptchaPage.vue'
import Instructions from '@/components/pages/InstructionsPage.vue'
import Exp from '@/components/pages/ExpPage.vue'
import Debrief from '@/components/pages/DebriefPage.vue'
import Thanks from '@/components/pages/ThanksPage.vue'
import Config from '@/components/pages/ConfigPage.vue'
// add new routes here.  generally these will be things in components/pages/[something].vue

// 2. Define some routes to the timeline
// Each route should map to a component.
// Each needs a name
// these routes can be accessed in any order generally
// but for most experiment they go in sequence from begining
// to the end of this list
const timeline = new Timeline()

// add the recruitment chooser if in development mode
if (appconfig.mode === 'development') {
  timeline.pushRoute({
    path: '/',
    name: 'recruit',
    component: RecruitmentChooser,
    meta: { allowDirectEntry: true },
  })
} else {
  // auto refer to the anonymous welcome page
  timeline.pushRoute({
    path: '/',
    name: 'landing',
    redirect: { name: 'welcome_anonymous' },
    meta: { allowDirectEntry: true },
  })
}

// welcome screen for non-referral
timeline.pushSeqRoute({
  path: '/welcome',
  name: 'welcome_anonymous',
  component: Advertisement,
  meta: { next: 'consent' }, // override what is next
})

// welcome screen for referral
timeline.pushSeqRoute({
  path: '/welcome/:service',
  name: 'welcome_referred',
  component: Advertisement,
  meta: { next: 'consent', allowDirectEntry: true }, // override what is next
  beforeEnter: (to) => {
    processQuery(to.query, to.params.service)
  },
})

// consent
timeline.pushSeqRoute({
  path: '/consent',
  name: 'consent',
  component: Consent,
})

// demographic survery
timeline.pushSeqRoute({
  path: '/demograph',
  name: 'demograph',
  component: DemographicSurvey,
  // beforeEnter: (to, from) => {
  //   // before loading this route, identify the user
  //   const smilestore = useSmileStore()
  //   if (!smilestore.isKnownUser) {
  //     console.log('not known')
  //     smilestore.setKnown() // set new user and add document
  //   }
  // },
})

// captcha
timeline.pushSeqRoute({
  path: '/captcha',
  name: 'captcha',
  component: Captcha,
})

// instructions
timeline.pushSeqRoute({
  path: '/instructions',
  name: 'instructions',
  component: Instructions,
})

// main experiment
timeline.pushSeqRoute({
  path: '/exp',
  name: 'exp',
  component: Exp,
})

// debriefing form
timeline.pushSeqRoute({
  path: '/debrief',
  name: 'debrief',
  component: Debrief,
})

// thanks/submit page
timeline.pushSeqRoute({
  path: '/thanks',
  name: 'thanks',
  component: Thanks,
})

// this is a the special page that loads in the iframe on mturk.com
timeline.pushRoute({
  path: '/mturk',
  name: 'mturk',
  component: MTurk,
  beforeEnter: (to) => {
    processQuery(to.query, 'mturk')
  },
})

// this is a special route with config/debugging information
timeline.pushRoute({
  path: '/config',
  name: 'config',
  component: Config,
  meta: { allowDirectEntry: true },
})

// 3. add navigation guards
//    currently these check if user is known
//    and if they are, they redirect to last route
function addGuards(r) {
  r.beforeEach((to, from) => {
    // Set queries to be combination of from queries and to queries (TO overwrites FROM if there is one with the same key)
    const newQueries = { ...from.query, ...to.query }
    to.query = newQueries

    // console.log('loading', to.name)
    // console.log('from', from.name)
    // console.log('allowDirectEntry', to.meta.allowDirectEntry)

    const smilestore = useSmileStore()
    // if the database isn't connected and they're a known user, reload their data
    if (smilestore.isKnownUser && !smilestore.isDBConnected) {
      smilestore.loadData()
    }

    // if you're going to an always-allowed route or if you're in jumping mode, allow the new route
    if (
      to.meta.allowDirectEntry ||
      (smilestore.config.mode === 'development' &&
        smilestore.local.allowJumps) ||
      (to.name === 'welcome_anonymous' &&
        from.name === undefined &&
        !smilestore.isKnownUser)
    ) {
      smilestore.setLastRoute(to.name)
      return true
    }
    // if you're trying to go to the next route, allow it
    if (from.meta.next === to.name) {
      smilestore.setLastRoute(to.name)
      return true
    }
    // if you're trying to go to the same route you're already on, allow it
    if (smilestore.lastRoute === to.name) {
      return true
    }
    // if you're a known user (and not trying to go to the next or same route), send back to most recent route
    if (smilestore.isKnownUser) {
      return { name: smilestore.lastRoute, replace: true }
    }
    if (!smilestore.isKnownUser && to.name === 'landing') {
      return { name: 'welcome_anonymous', replace: true }
    }
    if (to.name !== 'welcome_anonymous') {
      // otherwise (for an unknown user who's not trying to go to next/same route), just send to welcome anonymous screen
      return { name: 'welcome_anonymous', replace: true }
    }
    return true
  })
}
timeline.build()

const { routes } = timeline

// 4. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHashHistory(), // We are using the hash history for now/simplicity
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})
addGuards(router) // add the guards defined above

// they are defined in a function like this for the testing harness
export { routes, addGuards }

export default router
