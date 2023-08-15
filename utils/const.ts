import { SideMenuKeys } from '../components/header/SideMenu'
import { PaymentProps } from './getPayments'

export const FOLLOW_NETWORKS = {
  facebook: 'https://www.facebook.com/lingwingcom',
  instagram: 'https://www.instagram.com/lingwingcom/',
  linkedin: 'https://www.linkedin.com/company/lingwing',
  youtube: 'https://www.youtube.com/channel/UCQTfPDnmBcLbZueYTM8pNZA',
  tiktok: 'https://www.tiktok.com/@lingwing.georgia',
}

export const FOOTER_LINKS = {
  footerCourses: '/wizard',
  footerPackages: '/packages',
  footerAboutUs: '/about-company?page=about',
  footerBlog: 'https://blog.lingwing.com',
  footerApps: '',
  footerPrivacy: '/privacy',
  footerFAQ: '/faq/general/',
  footerContact: '/contact',
}

export const SIDE_MENU_LINKS = {
  English: ['/wizard', 'languageTo', 'eng'],
  Spanish: ['/wizard', 'languageTo', 'esp'],
  Georgian: ['/wizard', 'languageTo', 'geo'],
  Russian: ['/wizard', 'languageTo', 'rus'],
  French: ['/wizard', 'languageTo', 'fre'],
  German: ['/wizard', 'languageTo', 'deu'],
  Italian: ['/wizard', 'languageTo', 'ita'],
  footerFAQ: ['/faq/general/', '', ''],
  menuContactUs: ['/contact', '', ''],
  menuStudents: ['/student', '', ''],
  menuPrices: ['/packages', '', ''],
  menuBuyAGift: ['packages/giftTaskReview', '', ''],
  menuPricesCoupon: ['/packages', '', ''],
  About: ['/about-company', 'page', 'about'],
  Certificate: ['/about-company', 'page', 'certificate'],
  Partners: ['/about-company', 'page', 'partners'],
  menuBlog: ['https://blog.lingwing.com', '', ''],
  Jobs: ['/about-company', 'page', 'jobs'],
  menuLicenseAgreement: ['/licensing-agreement', '', ''],
  menuPrivacyPolicy: ['/privacy', '', ''],
} as const

export const COURSES_KEYS: SideMenuKeys[] = [
  'English',
  'Spanish',
  'Georgian',
  'Russian',
  'French',
  'German',
  'Italian',
]

export const HELP_KEYS: SideMenuKeys[] = ['footerFAQ', 'menuContactUs']

export const PREMIUM_KEYS: SideMenuKeys[] = [
  'menuStudents',
  'menuPrices',
  'menuBuyAGift',
  'menuPricesCoupon',
]
export const ABOUT_COMPANY_KEYS: SideMenuKeys[] = [
  'About',
  'Certificate',
  'Partners',
  'menuBlog',
  'Jobs',
  'menuLicenseAgreement',
  'menuPrivacyPolicy',
]

export const ABOUT_COMPANY_LINKS = {
  About: 'about',
  Certificate: 'certificate',
  Partners: 'partners',
  Jobs: 'jobs',
}

export const IMAGES_FOR_PARTNERS_PAGE = [
  '../themes/images/partners/beka.png',
  '../themes/images/partners/gau.png',
  '../themes/images/partners/liberty.png',
  '../themes/images/partners/magti.jpg',
  '../themes/images/partners/GITA.png',
  '../themes/images/partners/BankOfGergia.png',
  '../themes/images/partners/BTU-GEO.png',
  '../themes/images/partners/TSU.svg.png',
  '../themes/images/partners/terabank.png',
  '../themes/images/partners/TBC.svg.png',
  '../themes/images/partners/Sulkhan-saba.png',
]

export const LOGIN_NETWORKS = ['facebook', 'google', 'twitter'] as const

export const LOGOUT_SCREENSHOTS = [
  'scr-1.png',
  'scr-2.png',
  'scr-3.png',
  'scr-4.png',
  'scr-5.png',
  'scr-6.png',
  'video-im.png',
]

export const PACKAGES_IMAGES = [
  '/../themes/images/V2/Packages/free_package.png',
  '/../themes/images/V2/Packages/12-month.png',
  '/../themes/images/V2/Packages/6-month.png',
  '/../themes/images/V2/Packages/3-month.png',
]

export const paymentSelection: PaymentProps[] = [
  {
    value: 'Pay at once',
    index: 0,
  },
  {
    value: 'Monthly Payment',
    index: 1,
  },
]

export const LANGUAGES_MAP_OVERRIDE = {
  geo: 'geo',
  eng: 'eng',
  rus: 'rus',
  esp: 'eng',
  fre: 'eng',
  deu: 'eng',
  ita: 'eng',
} as const

interface keyboardOverride {
  geo: number
  eng: number
  rus: number
  hint: string
  symbol: string
  excusable?: string
}

export const KEYBOARD_OVERRIDE: keyboardOverride[] = [
  {
    geo: 4304,
    eng: 97,
    rus: 1072,
    hint: 'a',
    symbol: 'ა',
  },
  {
    geo: 4305,
    eng: 98,
    rus: 1073,
    hint: 'b',
    symbol: 'ბ',
  },
  {
    geo: 4306,
    eng: 103,
    rus: 1075,
    hint: 'g',
    symbol: 'გ',
  },
  {
    geo: 4307,
    eng: 100,
    rus: 1076,
    hint: 'd',
    symbol: 'დ',
  },
  {
    geo: 4308,
    eng: 101,
    rus: 1077,
    hint: 'e',
    symbol: 'ე',
  },
  {
    geo: 4309,
    eng: 118,
    rus: 1074,
    hint: 'v',
    symbol: 'ვ',
  },
  {
    geo: 4310,
    eng: 122,
    rus: 1079,
    hint: 'z',
    symbol: 'ზ',
  },
  {
    geo: 4311,
    eng: 84,
    rus: 1058,
    symbol: 'თ',
    excusable: 't',
    hint: 'Shift + T',
  },
  {
    geo: 4312,
    eng: 105,
    rus: 1080,
    hint: 'i',
    symbol: 'ი',
  },
  {
    geo: 4313,
    eng: 107,
    rus: 1082,
    hint: 'k',
    symbol: 'კ',
  },
  {
    geo: 4314,
    eng: 108,
    rus: 1083,
    hint: 'l',
    symbol: 'ლ',
  },
  {
    geo: 4315,
    eng: 109,
    rus: 1084,
    hint: 'm',
    symbol: 'მ',
  },
  {
    geo: 4316,
    eng: 110,
    rus: 1085,
    hint: 'n',
    symbol: 'ნ',
  },
  {
    geo: 4317,
    eng: 111,
    rus: 1086,
    hint: 'o',
    symbol: 'ო',
  },
  {
    geo: 4318,
    eng: 112,
    rus: 1087,
    hint: 'p',
    symbol: 'პ',
  },
  {
    geo: 4319,
    eng: 74,
    rus: 1049,
    symbol: 'ჟ',
    excusable: 'j',
    hint: 'Shift + J',
  },
  {
    geo: 4320,
    eng: 114,
    rus: 1088,
    hint: 'r',
    symbol: 'რ',
  },
  {
    geo: 4321,
    eng: 115,
    rus: 1089,
    hint: 's',
    symbol: 'ს',
  },
  {
    geo: 4322,
    eng: 116,
    rus: 1090,
    hint: 't',
    symbol: 'ტ',
  },
  {
    geo: 4323,
    eng: 117,
    rus: 1091,
    hint: 'u',
    symbol: 'უ',
  },
  {
    geo: 4324,
    eng: 102,
    rus: 1092,
    hint: 'f',
    symbol: 'ფ',
  },
  {
    geo: 4325,
    eng: 113,
    rus: 1103,
    hint: 'q',
    symbol: 'ქ',
  },
  {
    geo: 4326,
    eng: 82,
    rus: 1056,
    symbol: 'ღ',
    excusable: 'r',
    hint: 'Shift + R',
  },
  {
    geo: 4327,
    eng: 121,
    rus: 1067,
    hint: 'y',
    symbol: 'ყ',
  },
  {
    geo: 4328,
    eng: 83,
    rus: 1057,
    symbol: 'შ',
    excusable: 's',
    hint: 'Shift + S',
  },
  {
    geo: 4329,
    eng: 67,
    rus: 1062,
    symbol: 'ჩ',
    excusable: 'c',
    hint: 'Shift + C',
  },
  {
    geo: 4330,
    eng: 99,
    rus: 1094,
    hint: 'c',
    symbol: 'ც',
  },
  {
    geo: 4331,
    eng: 90,
    rus: 1047,
    symbol: 'ძ',
    excusable: 'z',
    hint: 'Shift + Z',
  },
  {
    geo: 4332,
    eng: 119,
    rus: 1096,
    hint: 'w',
    symbol: 'წ',
  },
  {
    geo: 4333,
    eng: 87,
    rus: 1064,
    symbol: 'ჭ',
    excusable: 'w',
    hint: 'Shift + W',
  },
  {
    geo: 4334,
    eng: 120,
    rus: 1093,
    hint: 'x',
    symbol: 'ხ',
  },
  {
    geo: 4335,
    eng: 106,
    rus: 1049,
    hint: 'j',
    symbol: 'ჯ',
  },
  {
    geo: 4336,
    eng: 104,
    rus: 1095,
    hint: 'h',
    symbol: 'ჰ',
  },
]
