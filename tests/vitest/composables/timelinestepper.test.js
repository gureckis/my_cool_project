/* eslint-disable no-undef */
import { defineComponent, onMounted } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHashHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import useTimelineStepper from '@/composables/timelinestepper'
import { Timeline, processQuery } from '@/timeline'

let router
let pinia

describe.skip('Stepper tests', () => {
  // set up the app
  function setupapp(routes) {
    const TestAppRouter = {
      template: `<h1>hi</h1><router-view></router-view>`,
    }
    pinia = createTestingPinia({ stubActions: true })

    router = createRouter({
      history: createWebHashHistory(),
      routes,
    })

    const wrapper = mount(TestAppRouter, {
      global: {
        plugins: [router, pinia],
      },
    })
    return wrapper
  }

  it('computes the correct next step for sequential routes', async () => {
    const TestComponent = defineComponent({
      template: `<h2>{{ next }}</h2>`,
      setup(props) {
        const { nextFn, prevFn } = useTimeline()
        const next = nextFn()
        const prev = prevFn()
        return { next, prev }
      },
    })

    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'one',
      component: TestComponent,
    })

    timeline.pushSeqRoute({
      path: '/two',
      name: 'two',
      component: TestComponent,
    })

    // timeline.buildProgress()
    const { routes } = timeline

    const wrapper = setupapp(routes)
    await router.isReady()
    router.push('/')
    expect(wrapper.html()).contains('two') // the "next" route is "two"
  })

  it('computes the correct prev step for sequential routes', async () => {
    const TestComponent = defineComponent({
      template: `<h2>{{ prev }}</h2>`,
      setup(props) {
        const { nextFn, prevFn } = useTimeline()
        const next = nextFn()
        const prev = prevFn()
        return { next, prev }
      },
    })

    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'one',
      component: TestComponent,
    })

    timeline.pushSeqRoute({
      path: '/two',
      name: 'two',
      component: TestComponent,
    })

    // timeline.buildProgress()
    const { routes } = timeline

    const wrapper = setupapp(routes)
    await router.isReady()
    router.push('/two')
    expect(wrapper.html()).contains('one') // the "next" route is "two"
  })

  it('computes the correct next step for meta override routes', async () => {
    const TestComponent = defineComponent({
      template: `<h2>{{ next }}</h2>`,
      setup(props) {
        const { nextFn, prevFn } = useTimeline()
        const next = nextFn()
        const prev = prevFn()
        return { next, prev }
      },
    })

    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'one',
      component: TestComponent,
      meta: { next: 'consent' }, // override what is next
    })

    timeline.pushSeqRoute({
      path: '/two',
      name: 'two',
      component: TestComponent,
    })

    // timeline.buildProgress()
    const { routes } = timeline

    const wrapper = setupapp(routes)
    await router.isReady()
    router.push('/')
    expect(wrapper.html()).contains('consent') // should be overridden
  })
})
