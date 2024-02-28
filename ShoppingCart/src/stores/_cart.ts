import { defineStore } from 'pinia'

interface IState {
  items: Object[]
}

const initState: IState = {
  items: []
}

export const useCartStore = defineStore('carts', {
  state: () => {
    return { ...initState }
  },
  actions: {
    addItem(item: any) {
      this.items.push(item)
    }
  }
})
