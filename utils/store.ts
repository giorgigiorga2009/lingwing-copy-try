import { create } from 'zustand'
//import { devtools } from 'zustand/middleware'

interface SelectedCurrency {
  selectedCurrency: number
  changeCurrency: (newCurrency: number) => void
}

const useStore = create<SelectedCurrency>()(set => ({
  selectedCurrency: 0,
  changeCurrency: (newCurrency: number) =>
    set({ selectedCurrency: newCurrency }),
}))

export default useStore
