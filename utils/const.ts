import { SideMenuKeys } from '../components/header/SideMenu'

export const FOLLOW_NETWORKS = {
  facebook: 'https://www.facebook.com/lingwingcom',
  instagram: 'https://www.instagram.com/lingwingcom/',
  linkedin: 'https://www.linkedin.com/company/lingwing',
  youtube: 'https://www.youtube.com/channel/UCQTfPDnmBcLbZueYTM8pNZA',
  tiktok: 'https://www.tiktok.com/@lingwing.georgia',
}

export const FOOTER_LINKS = [
  'footerAboutUs',
  'footerCourses',
  'footerPackages',
  'footerBlog',
  'footerApps',
  'footerPrivacy',
  'footerFAQ',
  'footerContact',
]

export const SIDE_MENU_LINKS = {
  English: 'en',
  Spanish: 'es',
  Georgian: 'ka',
  Russian: 'ru',
  French: 'fre',
  German: 'deu',
  Italian: 'ita',
  footerFAQ: 'https://lingwing.com/en/faq/general/',
  menuContactUs: 'https://lingwing.com/en/contact',
  menuStudents: 'https://lingwing.com/en/student',
  menuPrices: 'https://lingwing.com/en/packages',
  menuBuyAGift: 'https://lingwing.com/en/packages/giftTaskReview',
  menuPricesCoupon: 'https://lingwing.com/en/packages',
  menuWhyWithUs: 'https://lingwing.com/en/about-us',
  menuCertificate: 'https://lingwing.com/en/about-us?page=certificate',
  menuPartners: 'https://lingwing.com/en/about-us?page=menuPartners',
  menuBlog: 'https://blog.lingwing.com',
  menuJobs: 'https://lingwing.com/en/about-us?page=cv',
  menuLicenseAgreement: 'https://lingwing.com/en/licensing-agreement?page=cv',
  menuPrivacyPolicy: 'https://lingwing.com/en/privacy?page=cv',
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
  'menuWhyWithUs',
  'menuCertificate',
  'menuPartners',
  'menuBlog',
  'menuJobs',
  'menuLicenseAgreement',
  'menuPrivacyPolicy',
]

export const LOGIN_NETWORKS = ['facebook', 'google', 'twitter'] as const
