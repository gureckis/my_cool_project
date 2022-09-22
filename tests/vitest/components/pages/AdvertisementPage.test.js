/* eslint-disable import/no-unresolved */
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHashHistory } from 'vue-router'
import Advertisement from '@/components/pages/AdvertisementPage.vue'
// import useSmileStore from '@/stores/smiledata'
import { routes } from '@/router' // This import should point to your routes file declared above

let router
let pinia

describe('Advertisement tests', () => {
  beforeEach(() => {
    pinia = createTestingPinia({ stubActions: false })
    router = createRouter({
      history: createWebHashHistory(),
      routes,
    })
  })

  it('should render', async () => {
    const wrapper = mount(Advertisement, {
      global: {
        plugins: [router, pinia],
        stubs: ['FAIcon'],
      },
    })
    await new Promise((r) => setTimeout(r, 200)) // wait for db connection
    expect(wrapper.html()).toContain('Please help us')
  })
})
