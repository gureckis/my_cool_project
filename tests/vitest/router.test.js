/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { describe, it, expect, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { plugin, defaultConfig, reset } from '@formkit/vue'
import '@/icons' // configure fontawesome

import App from '@/App.vue'
import { routes, addGuards } from '@/router' // This import should point to your routes file declared above
import useSmileStore from '@/stores/smiledata'
import appconfig from '@/config'

let router
let pinia

/* general purpose helper functions */
// sets up app and the mock dom
function setupapp() {
  const wrapper = mount(App, {
    global: {
      plugins: [router, pinia, [plugin, defaultConfig]],
      stubs: ['FAIcon'],
    },
  })
  return wrapper
}

// resets the local storage.  simulates deleting it in the browser
function resetLocalStorage() {
  localStorage.setItem(appconfig.local_storage_key, null)
}

// sets a json version of data in local storage
function setLocalStorage(data) {
  localStorage.setItem(appconfig.local_storage_key, JSON.stringify(data))
}

// returns the local storage as a javascript object
function getLocalStorage() {
  return JSON.parse(localStorage.getItem(appconfig.local_storage_key))
}

/* generic router tests */

//  these tests verify that the router works correctly and
//  writes is state to the localstorage
//  the important thing about these test is that due to
//  the beforEach you can think of it as the browser loads
//  BEFORE the test runs.
describe('Generic router tests', () => {
  beforeEach(() => {
    // before each test we need to set up:
    // - pinia (because the router depends on it)
    // - router
    pinia = createTestingPinia({ stubActions: false })
    router = createRouter({
      history: createWebHashHistory(),
      routes,
    })
    addGuards(router)
  })

  /* there are some basic sanity checks */
  it('localstorage is modified by writing to it', () => {
    localStorage.setItem('test', 'test')
    expect(localStorage.getItem('test')).toBe('test')
  })

  // it isn't ideal that state maintains between tests, but
  // it does unless you reset the storage each time in beforeEach()
  // this just test if the key test survived from the previous test
  it('localstorage survives between tests', () => {
    expect(localStorage.getItem('test')).toBe('test')
  })

  /* now test the app */
  // the getLocalStorage() returns null if there is not
  // local storage set yet.
  it('there should be no smilestore before the app created', () => {
    expect(getLocalStorage()).toBe(null)
  })

  // when you create the app it will create the store
  // and therefore it will exist!
  it('there should be smilestore state after the app started', async () => {
    const wrapper = setupapp()
    await router.isReady()
    // local storage created here by the import of the useSmileStore in the app
    expect(getLocalStorage()).not.toBe(null)
  })

  // when you create the app it will create the store
  // but reseting the local storage will clear it
  it('there should be no localstorage if it is reset', async () => {
    const wrapper = setupapp()
    await router.isReady()
    resetLocalStorage()
    expect(getLocalStorage()).toBe(null)
  })

  // if you try to load / it will load the 'welcome_anonymous' page
  it('should render welcome_anonymous when accessing /', async () => {
    const wrapper = setupapp()
    const smilestore = useSmileStore()
    resetLocalStorage()
    router.push('/')
    await router.isReady()
    expect(wrapper.html()).toContain('Please help us')
    expect(smilestore.local.lastRoute).toBe('welcome_anonymous')
    expect(router.currentRoute.value.name).toBe('welcome_anonymous') // have to use .value.name here to unpack reactivity mechanism
  })

  // the next few test check for different referral routes
  // test prolific
  it('should render welcome_referred when accessing a prolific route', async () => {
    const wrapper = setupapp()
    const smilestore = useSmileStore()
    resetLocalStorage()
    router.push('/welcome/prolific?test=test')
    await router.isReady()
    expect(wrapper.html()).toContain('Please help us')
    expect(smilestore.local.lastRoute).toBe('welcome_referred')
    expect(router.currentRoute.value.name).toBe('welcome_referred') // have to use .value.name here to unpack reactivity mechanism
  })

  // test cloudresearch
  it('should render welcome_referred when accessing a cloudresearch route', async () => {
    const wrapper = setupapp()
    const smilestore = useSmileStore()
    resetLocalStorage()
    router.push('/welcome/cloudresearch?test=test')
    await router.isReady()
    expect(wrapper.html()).toContain('Please help us')
    expect(smilestore.local.lastRoute).toBe('welcome_referred')
    expect(router.currentRoute.value.name).toBe('welcome_referred') // have to use .value.name here to unpack reactivity mechanism
  })

  // test mechanical turk
  it('should render welcome_referred when accessing an amt route', async () => {
    const wrapper = setupapp()
    const smilestore = useSmileStore()
    resetLocalStorage()
    router.push('/welcome/mturk?test=test')
    await router.isReady()
    expect(wrapper.html()).toContain('Please help us')
    expect(smilestore.local.lastRoute).toBe('welcome_referred')
  })

  // test citizen science site
  it('should render welcome_referred when accessing a citizenscience route', async () => {
    const wrapper = setupapp()
    const smilestore = useSmileStore()
    resetLocalStorage()
    router.push('/welcome/mturk?test=test')
    await router.isReady()
    expect(wrapper.html()).toContain('Please help us')
    expect(smilestore.local.lastRoute).toBe('welcome_referred')
    expect(router.currentRoute.value.name).toBe('welcome_referred') // have to use .value.name here to unpack reactivity mechanism
  })

  // should first render the welcome
  it('should render welcome_anonymous when accessing / then the informed consent after a click', async () => {
    const wrapper = setupapp()
    const smilestore = useSmileStore()
    resetLocalStorage()
    router.push('/')
    await router.isReady()
    expect(wrapper.html()).toContain('Please help us')
    expect(smilestore.local.lastRoute).toBe('welcome_anonymous')
    await wrapper.find('#finish').trigger('click')
    await new Promise((r) => setTimeout(r, 10)) // wait a bit for the page to update and render after the click
    expect(wrapper.html()).toContain('Please take the time to read')
    expect(smilestore.local.lastRoute).toBe('consent') // check that smilestore was updated
  })

  it('should let you access config even if known and last route set', async () => {
    const smilestore = useSmileStore()
    smilestore.setKnown()
    smilestore.setLastRoute('consent') // pretend we stopped on consent
    const wrapper = setupapp()
    await router.isReady()
    await flushPromises()
    router.push('/config') // go to config
    await router.isReady()
    await flushPromises()
    expect(router.currentRoute.value.name).not.toBe('consent') // not this
    expect(router.currentRoute.value.name).toBe('config') // yes this
  })
})

describe('Testing page reloads', () => {
  it('should redirect you to the last route if you are known', async () => {
    // pretend that user has localstorage set to known and /exp
    setLocalStorage({ knownUser: true, lastRoute: 'exp' })

    // double check that worked
    expect(getLocalStorage().lastRoute).toBe('exp')
    expect(getLocalStorage().knownUser).toBe(true)

    // great app (close to opening browser)
    pinia = createTestingPinia({ stubActions: false })
    router = createRouter({
      history: createWebHashHistory(),
      routes,
    })
    addGuards(router)
    const wrapper = setupapp() // create the app
    router.push('/')
    // still the same?
    expect(getLocalStorage().lastRoute).toBe('exp')
    expect(getLocalStorage().knownUser).toBe(true)

    // did the smilestore load that?
    const smilestore = useSmileStore()
    expect(smilestore.lastRoute).toBe('exp') // should be exp
    expect(smilestore.isKnownUser).toBe(true) // should be true

    await new Promise((r) => setTimeout(r, 10)) // wait a bit for the page to update and render after the click
    expect(router.currentRoute.value.name).toBe('exp') // yes this
  })

  // there's not way to redirect to welcome_anonymous if you are unknown and known to not be a referral currently
  // it('should redirect you to welcome_anonymous if you are unknown and accessed from an anonymous welcome', async () => {})

  it('should send you to the last route if you are known and you try to access a different route', async () => {
    // pretend that user has localstorage set to known and /exp
    setLocalStorage({ knownUser: true, lastRoute: 'exp' })

    // double check that worked
    expect(getLocalStorage().lastRoute).toBe('exp')
    expect(getLocalStorage().knownUser).toBe(true)

    // great app (close to opening browser)
    pinia = createTestingPinia({ stubActions: false })
    router = createRouter({
      history: createWebHashHistory(),
      routes,
    })
    addGuards(router)
    const wrapper = setupapp() // create the app
    router.push('/debrief') // try to access debrief instead
    // still the same?
    expect(getLocalStorage().lastRoute).toBe('exp')
    expect(getLocalStorage().knownUser).toBe(true)

    // did the smilestore load that?
    const smilestore = useSmileStore()
    expect(smilestore.lastRoute).toBe('exp') // should be exp
    expect(smilestore.isKnownUser).toBe(true) // should be true

    await new Promise((r) => setTimeout(r, 10)) // wait a bit for the page to update and render after the click
    expect(router.currentRoute.value.name).toBe('exp') // yes this
  })
})
