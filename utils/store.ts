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

export interface VoiceRecognition {
  transcript: string
  SetTranscript: (totranscriptken: string) => void
}

export const useVoiceRecognition = create<VoiceRecognition>(set => ({
  transcript: '',
  SetTranscript: transcript => set(() => ({ transcript: transcript })),
}))

export const getVoiceRecognition = (state: VoiceRecognition) => ({
  transcript: state.transcript,
  SetTranscript: state.SetTranscript,
})

export interface RecognitionActive {
  isRecordingActive: boolean
  ToggleRecordingActive: (IsRecordingActive: boolean) => void
}

export const useRecognitionActive = create<RecognitionActive>(set => ({
  isRecordingActive: false,
  ToggleRecordingActive: RecordingActive =>
    set(() => ({ isRecordingActive: !RecordingActive })),
}))

export const getVoiceRecognitionActive = (state: RecognitionActive) => ({
  isRecordingActive: state.isRecordingActive,
  ToggleRecordingActive: state.ToggleRecordingActive,
})

// Update the VoiceActive interface
export interface VoiceActive {
  isVoicePlaying: boolean
  ToggleVoicePlaying: (isVoicePlaying: boolean) => void
}

export const useVoiceActive = create<VoiceActive>(set => ({
  isVoicePlaying: false,
  ToggleVoicePlaying: (isVoicePlaying: boolean) =>
    set(() => ({ isVoicePlaying: isVoicePlaying })),
}))

export default useStore
