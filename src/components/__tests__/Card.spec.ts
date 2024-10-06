import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders properly', () => {
    const wrapper = mount(Card, { 
      props: { 
        details: {
          id: "faf",
          urls: { thumb: "", regular: "", small: "" },
          user: { name: "", location: "" }
        },
      } 
    })
    // expect(wrapper.text()).toContain('Hello Vitest')
  })
})

describe('Card', () => {
  it('renders loader version', () => {
    const wrapper = mount(Card, { 
      props: { 
         
      } 
    })
    // expect(wrapper.text()).toContain('Hello Vitest')
  })
})

describe('Card', () => {
  it('opens modal if clicked', () => {
    const wrapper = mount(Card, { 
      props: { 
        details: {
          id: 'dsds',
          urls: { thumb: "", regular: "", small: "" },
          user: { name: "", location: "" }
        } 
      } 
    })
    // expect(wrapper.text()).toContain('Hello Vitest')
  })
})