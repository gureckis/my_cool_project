/* eslint-disable no-undef */
import Timeline from '@/timeline'

describe('Timeline tests', () => {
  it('should be able to create a timeline', () => {
    const timeline = new Timeline()
    expect(timeline).toBeDefined()
  })

  it('should add a sequential route', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'index',
      component: MockComponent,
    })
    expect(timeline.routes.length).toBe(1)
    expect(timeline.seqtimeline.length).toBe(1)
  })

  it('should add a nonsequential route', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushRoute({
      path: '/',
      name: 'index',
      component: MockComponent,
    })
    expect(timeline.routes.length).toBe(1)
    expect(timeline.seqtimeline.length).toBe(0)

    // non sequential routes should be null
    expect(timeline.routes[0].meta.prev).toBe(null) // should be null
    expect(timeline.routes[0].meta.next).toBe(null) // should be null
  })

  it('should leave next and prev undefined but meta defined if a sequential route', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'index',
      component: MockComponent,
      // meta: { prev: 'prev', next: 'next' },
    })
    expect(timeline.routes[0].meta).toBeDefined()
    expect(timeline.routes[0].meta.next).toBe(undefined)
    expect(timeline.routes[0].meta.prev).toBe(undefined)
  })

  it('should leave next or prev undefined if meta is configured for the other', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'index',
      component: MockComponent,
      meta: { next: 'next' },
    })
    expect(timeline.routes[0].meta).toBeDefined()
    expect(timeline.routes[0].meta.next).toBe('next')
    expect(timeline.routes[0].meta.prev).toBe(undefined)

    const timeline2 = new Timeline()
    timeline2.pushSeqRoute({
      path: '/',
      name: 'index',
      component: MockComponent,
      meta: { prev: 'prev' },
    })
    expect(timeline2.routes[0].meta.next).toBe(undefined)
    expect(timeline2.routes[0].meta.prev).toBe('prev')

    const timeline3 = new Timeline()
    timeline3.pushSeqRoute({
      path: '/',
      name: 'index',
      component: MockComponent,
    })
    expect(timeline3.routes[0].meta.next).toBe(undefined)
    expect(timeline3.routes[0].meta.prev).toBe(undefined)
  })

  it('should raise an error if a nonsequential route has prev/next defined', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()

    const errorTrigger = () => {
      timeline.pushRoute({
        path: '/',
        name: 'index',
        component: MockComponent,
        meta: { prev: 'prev', next: 'next' }, // this should raise an error because nonsequential route
      })
    }
    expect(errorTrigger).toThrowError()
  })

  it('should add a nonsequential and sequential route', () => {
    const MockComponentOne = { template: '<div>Mock Component One</div>' }
    const MockComponentTwo = { template: '<div>Mock Component Two</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/one',
      name: 'one',
      component: MockComponentOne,
    })
    timeline.pushRoute({
      path: '/two',
      name: 'two',
      component: MockComponentTwo,
    })
    expect(timeline.routes.length).toBe(2)
    expect(timeline.seqtimeline.length).toBe(1)
  })

  it('should not allow the same sequential route to be registered twice', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/thanks',
      name: 'thank',
      component: MockComponent,
    })

    const errorTrigger = () => {
      timeline.pushSeqRoute({
        path: '/thanks',
        name: 'thanks',
        component: MockComponent,
      })
    }
    expect(errorTrigger).toThrowError()
    expect(timeline.routes.length).toBe(1)
    expect(timeline.seqtimeline.length).toBe(1) // only first one should work
  })

  it('should not allow the same non-sequential route to be registered twice', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushRoute({
      path: '/thanks',
      name: 'thank',
      component: MockComponent,
    })
    const errorTrigger = () => {
      timeline.pushRoute({
        path: '/thanks',
        name: 'thanks',
        component: MockComponent,
      })
    }
    expect(errorTrigger).toThrowError()
    expect(timeline.routes.length).toBe(1)
    expect(timeline.seqtimeline.length).toBe(0)
  })

  it('should not allow the same route to be registered twice', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/thanks',
      name: 'thank',
      component: MockComponent,
    })
    const errorTrigger = () => {
      timeline.pushRoute({
        path: '/thanks',
        name: 'thanks',
        component: MockComponent,
      })
    }
    expect(errorTrigger).toThrowError()
    expect(timeline.routes.length).toBe(1)
    expect(timeline.seqtimeline.length).toBe(1) // only first one should work
  })

  it('build method should correctly configure a doubly linked list', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'one',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/two',
      name: 'two',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/three',
      name: 'three',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/four',
      name: 'four',
      component: MockComponent,
    })
    timeline.build()

    expect(timeline.seqtimeline[0].meta.next).toBe('two')
    expect(timeline.seqtimeline[1].meta.next).toBe('three')
    expect(timeline.seqtimeline[2].meta.next).toBe('four')

    expect(timeline.seqtimeline[0].meta.prev).toBe(null)
    expect(timeline.seqtimeline[1].meta.prev).toBe('one')
    expect(timeline.seqtimeline[2].meta.prev).toBe('two')
    expect(timeline.seqtimeline[3].meta.prev).toBe('three')
  })

  it('build method should configure a loop', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/',
      name: 'one',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/two',
      name: 'two',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/three',
      name: 'three',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/four',
      name: 'four',
      component: MockComponent,
      meta: { next: 'one' },
    })
    timeline.build()

    expect(timeline.seqtimeline[0].meta.next).toBe('two')
    expect(timeline.seqtimeline[1].meta.next).toBe('three')
    expect(timeline.seqtimeline[2].meta.next).toBe('four')
    expect(timeline.seqtimeline[3].meta.next).toBe('one')

    // first line here a little unclear... previous is not defined for a loop
    // implicily.  but it changes if you have gone through the loop
    expect(timeline.seqtimeline[0].meta.prev).toBe(null) // oh not sure about this
    expect(timeline.seqtimeline[1].meta.prev).toBe('one')
    expect(timeline.seqtimeline[2].meta.prev).toBe('two')
    expect(timeline.seqtimeline[3].meta.prev).toBe('three')
  })

  it('build method should allow complex routes, disconnect sequences', () => {
    const MockComponent = { template: '<div>Mock Component</div>' }
    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/one-a',
      name: 'one',
      component: MockComponent,
      meta: { next: 'two' },
    })
    timeline.pushSeqRoute({
      path: '/one-b',
      name: 'one-b',
      component: MockComponent,
      meta: { next: 'two' },
    })
    // both flow into node two
    timeline.pushRoute({
      // this has not implicit successor
      path: '/two',
      name: 'two',
      component: MockComponent,
    }) // leaving this node has to happen with logic inside the component

    // let hand branch
    timeline.pushSeqRoute({
      path: '/three',
      name: 'three',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/four',
      name: 'four',
      component: MockComponent,
      meta: { next: 'one' },
    })
    timeline.pushRoute({
      // this has no implicit successor
      path: '/five',
      name: 'five',
      component: MockComponent,
      meta: { next: 'one' },
    })

    // right hand branch
    timeline.pushSeqRoute({
      path: '/six',
      name: 'six',
      component: MockComponent,
    })
    timeline.pushSeqRoute({
      path: '/seven',
      name: 'seven',
      component: MockComponent,
    })
    timeline.pushRoute({
      // this has no implicit successor
      path: '/eight',
      name: 'eight',
      component: MockComponent,
    })

    timeline.build()

    expect(timeline.seqtimeline[0].meta.next).toBe('two')
    expect(timeline.seqtimeline[1].meta.next).toBe('three')
    expect(timeline.seqtimeline[2].meta.next).toBe('four')
    expect(timeline.seqtimeline[3].meta.next).toBe('one')

    // first line here a little unclear... previous is not defined for a loop
    // implicily.  but it changes if you have gone through the loop
    expect(timeline.seqtimeline[0].meta.prev).toBe(null) // oh not sure about this
    expect(timeline.seqtimeline[1].meta.prev).toBe('one')
    expect(timeline.seqtimeline[2].meta.prev).toBe('two')
    expect(timeline.seqtimeline[3].meta.prev).toBe('three')
  })
  /*
  it('should compute the progress correctly', () => {
    const MockComponentOne = { template: '<div>Mock Component One</div>' }
    const MockComponentTwo = { template: '<div>Mock Component Two</div>' }
    const MockComponentThree = { template: '<div>Mock Component Three</div>' }
    const MockComponentFour = { template: '<div>Mock Component Four</div>' }

    const timeline = new Timeline()
    timeline.pushSeqRoute({
      path: '/one',
      name: 'one',
      component: MockComponentOne,
    })
    timeline.pushSeqRoute({
      path: '/two',
      name: 'two',
      component: MockComponentTwo,
    })
    timeline.pushSeqRoute({
      path: '/three',
      name: 'three',
      component: MockComponentThree,
    })
    timeline.buildProgress()
    expect(timeline.seqtimeline[0].meta.progress).toBe((100 * 0) / (3 - 1)) // zero progress
    expect(timeline.seqtimeline[1].meta.progress).toBe((100 * 1) / (3 - 1)) // remaining is split
    expect(timeline.seqtimeline[2].meta.progress).toBe((100 * 2) / (3 - 1))

    timeline.pushSeqRoute({
      path: '/four',
      name: 'four',
      component: MockComponentFour,
    })

    timeline.buildProgress() // rebuild timeline
    expect(timeline.seqtimeline[0].meta.progress).toBe((100 * 0) / (4 - 1)) // zero progress
    expect(timeline.seqtimeline[1].meta.progress).toBe((100 * 1) / (4 - 1)) // remaining is split
    expect(timeline.seqtimeline[2].meta.progress).toBe((100 * 2) / (4 - 1))
    expect(timeline.seqtimeline[3].meta.progress).toBe((100 * 3) / (4 - 1))
  })
  */
})
