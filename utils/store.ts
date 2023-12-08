import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedCurrency {
  selectedCurrency: number
  changeCurrency: (newCurrency: number) => void
}

const useStore = create<SelectedCurrency>()(set => ({
  selectedCurrency: 0,
  changeCurrency: (newCurrency: number) =>
    set({ selectedCurrency: newCurrency }),
}))

export interface UserInfo {
  Token: string
  SetToken: (token: string) => void
}

export const useUserStore = create<UserInfo>()(
  persist(
    set => ({
      Token: '',
      SetToken: (token: string) => set({ Token: token }),
    }),
    {
      name: 'user',
      getStorage: () => localStorage,
    },
  ),
)

export interface Hints {
  HintShown: boolean
  HintText: string
  SetHintShow: (show: boolean) => void
  SetHintText: (hintText: string) => void
}

export const useTaskStore = create<Hints>(set => ({
  HintShown: false,
  HintText: '',
  SetHintShow: show => set(() => ({ HintShown: show })),
  SetHintText: hintText => set(() => ({ HintText: hintText })),
}))

export default useStore
