import { SideMenuKeys } from '../components/header/SideMenu'

export const FOLLOW_NETWORKS = {
  facebook: 'https://www.facebook.com/lingwingcom',
  instagram: 'https://www.instagram.com/lingwingcom/',
  linkedin: 'https://www.linkedin.com/company/lingwing',
  youtube: 'https://www.youtube.com/channel/UCQTfPDnmBcLbZueYTM8pNZA',
  tiktok: 'https://www.tiktok.com/@lingwing.georgia',
}

export const FOOTER_LINKS = [
  'APP_FOOTER_ABOUT_US',
  'APP_FOOTER_COURSES',
  'APP_FOOTER_PACKEGES',
  'APP_FOOTER_BLOG',
  'APP_FOOTER_APP',
  'APP_FOOTER_PRIVACY',
  'APP_FOOTER_FAQ',
  'APP_FOOTER_CONTACT',
]

export const SIDE_MENU_LINKS = {
  English: 'https://lingwing.com/en/wizard/eng',
  Spanish: 'https://lingwing.com/en/wizard/es',
  Georgian: 'https://lingwing.com/en/wizard/ka',
  Russian: 'https://lingwing.com/en/wizard/ru',
  Turkish: 'https://lingwing.com/en/wizard/tr',
  Bengali: 'https://lingwing.com/en/wizard/bn',
  APP_FOOTER_FAQ: 'https://lingwing.com/en/faq/general/',
  'APP_menu-contact': 'https://lingwing.com/en/contact',
  'APP_menu-student': 'https://lingwing.com/en/student',
  'APP_menu-packages': 'https://lingwing.com/en/packages',
  'APP_menu-gift-review': 'https://lingwing.com/en/packages/giftTaskReview',
  'APP_menu-packages-coupon': 'https://lingwing.com/en/packages',
  APP_ABOUT_US: 'https://lingwing.com/en/about-us',
  APP_ABOUT_CERTIFICATE: 'https://lingwing.com/en/about-us?page=certificate',
  APP_ABOUT_US_PARTNERS: 'https://lingwing.com/en/about-us?page=partners',
  'APP_menu-blog': 'https://blog.lingwing.com',
  APP_ABOUT_US_JOB: 'https://lingwing.com/en/about-us?page=cv',
  APP_PRIVACY_POLICY2: 'https://lingwing.com/en/licensing-agreement?page=cv',
  APP_PRIVACY_POLICY: 'https://lingwing.com/en/privacy?page=cv',
} as const

export const COURSES_KEYS: SideMenuKeys[] = [
  'English',
  'Spanish',
  'Georgian',
  'Russian',
  'Turkish',
  'Bengali',
]
export const HELP_KEYS: SideMenuKeys[] = ['APP_FOOTER_FAQ', 'APP_menu-contact']

export const PREMIUM_KEYS: SideMenuKeys[] = [
  'APP_menu-student',
  'APP_menu-packages',
  'APP_menu-gift-review',
  'APP_menu-packages-coupon',
]
export const ABOUT_COMPANY_KEYS: SideMenuKeys[] = [
  'APP_ABOUT_US',
  'APP_ABOUT_CERTIFICATE',
  'APP_ABOUT_US_PARTNERS',
  'APP_menu-blog',
  'APP_ABOUT_US_JOB',
  'APP_PRIVACY_POLICY2',
  'APP_PRIVACY_POLICY',
]

export const LOGIN_NETWORKS = ['facebook', 'google', 'twitter'] as const
