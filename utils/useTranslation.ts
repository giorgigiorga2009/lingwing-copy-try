import { useIntl } from 'react-intl'

export const useTranslation = () => {
  const intl = useIntl()
  const t = (id: string) => intl.formatMessage({ id })
  return { t }
}
