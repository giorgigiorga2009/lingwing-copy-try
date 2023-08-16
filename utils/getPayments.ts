import axios from 'axios'

export interface PaymentProps {
  value: string
  index: number
}

export interface PayWithOptions {
  value: string
  logo: string
}

export interface PaymentMethod {
  nameCode: string
  logo: string
  recurring: boolean
}

export interface PackageResponse {
  packages: Package[]
  currencies: Currency[]
  coupon: string | null
}

interface Package {
  _id: string
  title: string
  duration: number
  sale: number
  mostPopular: boolean
  upsell: Upsell
  currency: CurrencyPackage[]
  languages: Language[]
  discountUsers: DiscountUsers
  feature: Feature
  position: number
  recurring: boolean
  recurringSale: string | null
}

interface Upsell {
  giftCoupon: GiftCoupon
  duration: Duration
  duration2: Duration2
  tasks: Tasks
  tests: Tests
}

interface GiftCoupon {
  text: Record<string, string>
  amount: number
  active: boolean
}

interface Duration {
  text: Record<string, string>
  amount: number
  active: boolean
}

interface Duration2 {
  active: boolean
  amount: number
  text: Record<string, string>
}

interface Tasks {
  active: boolean
  amount: number
  text: Record<string, string>
}

interface Tests {
  active: boolean
  amount: number
  text: Record<string, string>
}

interface CurrencyPackage {
  priority: number
  _id: Currency
  price: string
  upsellDurationAdditionalPrice: number
  upsellGiftAdditionalPrice: number
  main: boolean
  upsell: Record<string, number>
  recurringPrice: number
}

interface Currency {
  _id: string
  name: string
  identifier: string
  symbol: string
}

interface Language {
  languageId: string
  _id: string
}

interface DiscountUsers {
  active: boolean
  percent: number
}

interface Feature {
  allTask: boolean
  certificate: boolean
  grammarAndStatistics: boolean
  tasks: number
  tests: number
  voiceRecognition: boolean
}

export interface PaymentOptionProps {
  currentPackage?: any
  monthlyPayment?: number
  selectedCurrency: number
  payWithOptions: PaymentMethod[] | undefined
}

export interface PaymentButtonProps {
  selectedOption: string
  payWithOption: string
  duration?: number | null
  payAtOnceText?: string
}

export const getPayWithList = async (): Promise<PaymentMethod[]> => {
  return await axios
    .get(`${process.env.defaultURL}/public/paymentMethods/list`)
    .then(response => response.data.data)
    .catch(error => {
      console.log(error)
      return { status: 500, data: [] }
    })
}

let authToken = ''
if (typeof window !== 'undefined') {
  authToken = localStorage.getItem('authToken') || ''
}
const authConfig = {
  headers: {
    Authorization: authToken,
  },
}

// returns countDown

export const getUserProfileCreationDate = async () => {
  try {
    const response = await axios.get(
      `${process.env.defaultURL}/user/profile`,
      authConfig,
    )
    return response.data.data.info.createDate
  } catch (error) {
    console.error(error)
    throw error
  }
}

// those two are for post and get
export const getCheckedPackageId = async (
  Id: string,
  coupon: string,
): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.defaultURL}/public/package/check`,
      {
        packageId: Id,
        // promoCode: "7AFE7E",
        promoCode: coupon,
        selectedCurrency: 'GEL',
      },
      authConfig,
    )
    return response.data.data
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const getPackageDataById = async (
  id: string | number,
): Promise<PackageResponse | undefined> => {
  try {
    const res = await axios.get(`
    ${process.env.defaultURL}/public/getorder/${id}`)
    return res.data.data
  } catch (error) {
    console.error(error)
  }
}
