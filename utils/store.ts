import { create } from 'zustand'

interface SelectedCurrency {
  selectedCurrency: number
  changeCurrency: (newCurrency: number) => void
}

const useStore = create<SelectedCurrency>()(set => ({
  selectedCurrency: 0,
  changeCurrency: (newCurrency: number) =>
    set({ selectedCurrency: newCurrency }),
}))


interface Hints {
  HintShown: boolean
  HintText: string
  SetHintShow: (show: boolean) => void
  SetHintText: (hintText: string) => void
}

export const useTaskStore = create<Hints>(set => ({
  HintShown: false,
  HintText: '',
  SetHintShow: (show) => set(() => ({ HintShown: show })),
  SetHintText: (hintText) => set(() => ({ HintText: hintText })),
}))

export default useStore
