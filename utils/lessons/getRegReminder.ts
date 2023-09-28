export interface RegistrationReminderPopupProps {
  packetTitle?: string
  creditCard?: string
  isRegReminder: boolean
  completedTasks?: number
  totalTasksAmount?: number
  languageTo?: string | string[] | undefined
  languageFrom?: string | string[] | undefined
}
