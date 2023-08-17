import React, { useState, useEffect } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { Country, City } from 'country-state-city'
import styles from './countrySelector.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface CustomCity {
  name: string
  countryCode: string
}

interface Props {
  defaultCountry?: string
  defaultCity?: string
}

const CountrySelector: React.FC<Props> = ({
  defaultCountry = '',
  defaultCity = '',
}) => {
  const [country, setCountry] = useState(defaultCountry)
  const [city, setCity] = useState(defaultCity)

  const { t } = useTranslation()

  useEffect(() => {
    setCountry(defaultCountry)
    setCity(defaultCity)
  }, [defaultCountry, defaultCity])

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry)
    setCity('')
  }

  const handleCityChange = (selectedCity: string) => {
    setCity(selectedCity)
  }

  const getCities = (): CustomCity[] => {
    const countryObj = Country.getAllCountries().find(c => c.name === country)
    if (countryObj) {
      const countryCode = countryObj.isoCode
      const cities = City.getCitiesOfCountry(countryCode)
      return (
        cities?.map(city => ({
          name: city.name,
          countryCode,
        })) || []
      )
    }
    return []
  }

  return (
    <>
      <div className={styles.selector}>
        <label>{t('APP_PROFILE_COUNTRY')}</label>
        <div className={styles.country}>
          <CountryDropdown
            name="country"
            value={country}
            onChange={handleCountryChange}
            valueType="full"
            priorityOptions={['US', 'CA', 'GB']}
          />
        </div>
      </div>
      <div className={styles.selector}>
        <label>{t('APP_PROFILE_CITY')}</label>
        <select
          name="city"
          value={city}
          onChange={e => handleCityChange(e.target.value)}
          disabled={!country}
        >
          <option value="">Select City</option>
          {getCities().map((city, index) => (
            <option key={`${city.name}-${index}`} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default CountrySelector
