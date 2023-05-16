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
  English: 'eng',
  Spanish: 'esp',
  Georgian: 'geo',
  Russian: 'rus',
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

export const ABOUT_COMPANY_LINKS = {
  whyWithUs: 'why-with-us',
  certificate: 'certificate',
  partners: 'partners',
  jobs: 'jobs',
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

export const KEYBOARD_OVERRIDE = [
  {
    languageNameCode: 'geo',
    array: [
      {
        originalCode: 32,
        alterCode: 32,
        symbol: ' ',
      },
      {
        originalCode: 33,
        alterCode: 33,
        symbol: '!',
      },
      {
        originalCode: 34,
        alterCode: 34,
        symbol: '"',
      },
      {
        originalCode: 44,
        alterCode: 44,
        symbol: ',',
      },
      {
        originalCode: 46,
        alterCode: 46,
        symbol: '.',
      },
      {
        originalCode: 34,
        alterCode: 34,
        symbol: '"',
      },
      {
        originalCode: 58,
        alterCode: 58,
        symbol: ':',
      },
      {
        originalCode: 63,
        alterCode: 63,
        symbol: '?',
      },
      {
        originalCode: 4304,
        alterCode: 97,
        hint: 'a',
        symbol: 'ა',
      },
      {
        originalCode: 4305,
        alterCode: 98,
        hint: 'b',
        symbol: 'ბ',
      },
      {
        originalCode: 4306,
        alterCode: 103,
        hint: 'g',
        symbol: 'გ',
      },
      {
        originalCode: 4307,
        alterCode: 100,
        hint: 'd',
        symbol: 'დ',
      },
      {
        originalCode: 4308,
        alterCode: 101,
        hint: 'e',
        symbol: 'ე',
      },
      {
        originalCode: 4309,
        alterCode: 118,
        hint: 'v',
        symbol: 'ვ',
      },
      {
        originalCode: 4310,
        alterCode: 122,
        hint: 'z',
        symbol: 'ზ',
      },
      {
        originalCode: 4311,
        alterCode: 84,
        symbol: 'თ',
        excusable: 't',
        hint: 'Shift + T',
      },
      {
        originalCode: 4312,
        alterCode: 105,
        hint: 'i',
        symbol: 'ი',
      },
      {
        originalCode: 4313,
        alterCode: 107,
        hint: 'k',
        symbol: 'კ',
      },
      {
        originalCode: 4314,
        alterCode: 108,
        hint: 'l',
        symbol: 'ლ',
      },
      {
        originalCode: 4315,
        alterCode: 109,
        hint: 'm',
        symbol: 'მ',
      },
      {
        originalCode: 4316,
        alterCode: 110,
        hint: 'n',
        symbol: 'ნ',
      },
      {
        originalCode: 4317,
        alterCode: 111,
        hint: 'o',
        symbol: 'ო',
      },
      {
        originalCode: 4318,
        alterCode: 112,
        hint: 'p',
        symbol: 'პ',
      },
      {
        originalCode: 4319,
        alterCode: 74,
        symbol: 'ჟ',
        excusable: 'j',
        hint: 'Shift + J',
      },
      {
        originalCode: 4320,
        alterCode: 114,
        hint: 'r',
        symbol: 'რ',
      },
      {
        originalCode: 4321,
        alterCode: 115,
        hint: 's',
        symbol: 'ს',
      },
      {
        originalCode: 4322,
        alterCode: 116,
        hint: 't',
        symbol: 'ტ',
      },
      {
        originalCode: 4323,
        alterCode: 117,
        hint: 'u',
        symbol: 'უ',
      },
      {
        originalCode: 4324,
        alterCode: 102,
        hint: 'f',
        symbol: 'ფ',
      },
      {
        originalCode: 4325,
        alterCode: 113,
        hint: 'q',
        symbol: 'ქ',
      },
      {
        originalCode: 4326,
        alterCode: 82,
        symbol: 'ღ',
        excusable: 'r',
        hint: 'Shift + R',
      },
      {
        originalCode: 4327,
        alterCode: 121,
        hint: 'y',
        symbol: 'ყ',
      },
      {
        originalCode: 4328,
        alterCode: 83,
        symbol: 'შ',
        excusable: 's',
        hint: 'Shift + S',
      },
      {
        originalCode: 4329,
        alterCode: 67,
        symbol: 'ჩ',
        excusable: 'c',
        hint: 'Shift + C',
      },
      {
        originalCode: 4330,
        alterCode: 99,
        hint: 'c',
        symbol: 'ც',
      },
      {
        originalCode: 4331,
        alterCode: 90,
        symbol: 'ძ',
        excusable: 'z',
        hint: 'Shift + Z',
      },
      {
        originalCode: 4332,
        alterCode: 119,
        hint: 'w',
        symbol: 'წ',
      },
      {
        originalCode: 4333,
        alterCode: 87,
        symbol: 'ჭ',
        excusable: 'w',
        hint: 'Shift + W',
      },
      {
        originalCode: 4334,
        alterCode: 120,
        hint: 'x',
        symbol: 'ხ',
      },
      {
        originalCode: 4335,
        alterCode: 106,
        hint: 'j',
        symbol: 'ჯ',
      },
      {
        originalCode: 4336,
        alterCode: 104,
        hint: 'h',
        symbol: 'ჰ',
      },
    ],
  },
  {
    languageNameCode: 'rus',
    array: [
      {
        originalCode: 1105,
        alterCode: 96,
        symbol: 'ё',
      },
      {
        originalCode: 1025,
        alterCode: 126,
        symbol: 'Ё',
        hint: 'Shift + `',
      },
      {
        originalCode: 33,
        alterCode: 33,
        symbol: '!',
        hint: 'Shift + 1',
      },
      {
        originalCode: 34,
        alterCode: 64,
        symbol: '"',
        hint: 'Shift + 2',
      },
      {
        originalCode: 8470,
        alterCode: 35,
        symbol: '№',
        hint: 'Shift + 3',
      },
      {
        originalCode: 59,
        alterCode: 36,
        symbol: ';',
        hint: 'Shift + 4',
      },
      {
        originalCode: 37,
        alterCode: 37,
        symbol: '%',
        hint: 'Shift + 5',
      },
      {
        originalCode: 58,
        alterCode: 94,
        symbol: ':',
        hint: 'Shift + 6',
      },
      {
        originalCode: 63,
        alterCode: 38,
        symbol: '?',
        hint: 'Shift + 7',
      },
      {
        originalCode: 42,
        alterCode: 42,
        symbol: '*',
        hint: 'Shift + 8',
      },
      {
        originalCode: 40,
        alterCode: 40,
        symbol: '(',
        hint: 'Shift + 9',
      },
      {
        originalCode: 41,
        alterCode: 41,
        symbol: ')',
        hint: 'Shift + 0',
      },
      {
        originalCode: 95,
        alterCode: 95,
        symbol: '_',
        hint: 'Shift + ---',
      },
      {
        originalCode: 43,
        alterCode: 43,
        symbol: '+',
        hint: 'Shift + =',
      },
      {
        originalCode: 1081,
        alterCode: 113,
        symbol: 'й',
      },
      {
        originalCode: 1094,
        alterCode: 119,
        symbol: 'ц',
      },
      {
        originalCode: 1091,
        alterCode: 101,
        symbol: 'у',
      },
      {
        originalCode: 1082,
        alterCode: 114,
        symbol: 'к',
      },
      {
        originalCode: 1077,
        alterCode: 116,
        symbol: 'е',
      },
      {
        originalCode: 1085,
        alterCode: 121,
        symbol: 'н',
      },
      {
        originalCode: 1075,
        alterCode: 117,
        symbol: 'г',
      },
      {
        originalCode: 1096,
        alterCode: 105,
        symbol: 'ш',
      },
      {
        originalCode: 1097,
        alterCode: 111,
        symbol: 'щ',
      },
      {
        originalCode: 1079,
        alterCode: 112,
        symbol: 'з',
      },
      {
        originalCode: 1093,
        alterCode: 91,
        symbol: 'х',
      },
      {
        originalCode: 1098,
        alterCode: 93,
        symbol: 'ъ',
      },
      {
        originalCode: 1049,
        alterCode: 81,
        symbol: 'Й',
        hint: 'Shift + Q',
      },
      {
        originalCode: 1062,
        alterCode: 87,
        symbol: 'Ц',
        hint: 'Shift + W',
      },
      {
        originalCode: 1059,
        alterCode: 69,
        symbol: 'У',
        hint: 'Shift + E',
      },
      {
        originalCode: 1050,
        alterCode: 82,
        symbol: 'К',
        hint: 'Shift + R',
      },
      {
        originalCode: 1045,
        alterCode: 84,
        symbol: 'Е',
        hint: 'Shift + T',
      },
      {
        originalCode: 1053,
        alterCode: 89,
        symbol: 'Н',
        hint: 'Shift + Y',
      },
      {
        originalCode: 1043,
        alterCode: 85,
        symbol: 'Г',
        hint: 'Shift + U',
      },
      {
        originalCode: 1064,
        alterCode: 73,
        symbol: 'Ш',
        hint: 'Shift + I',
      },
      {
        originalCode: 1065,
        alterCode: 79,
        symbol: 'Щ',
        hint: 'Shift + O',
      },
      {
        originalCode: 1047,
        alterCode: 80,
        symbol: 'З',
        hint: 'Shift + P',
      },
      {
        originalCode: 1061,
        alterCode: 123,
        symbol: 'Х',
        hint: 'Shift + [',
      },
      {
        originalCode: 1066,
        alterCode: 125,
        symbol: 'Ъ',
        hint: 'Shift + ]',
      },
      {
        originalCode: 1092,
        alterCode: 97,
        symbol: 'ф',
      },
      {
        originalCode: 1099,
        alterCode: 115,
        symbol: 'ы',
      },
      {
        originalCode: 1074,
        alterCode: 100,
        symbol: 'в',
      },
      {
        originalCode: 1072,
        alterCode: 102,
        symbol: 'а',
      },
      {
        originalCode: 1087,
        alterCode: 103,
        symbol: 'п',
      },
      {
        originalCode: 1088,
        alterCode: 104,
        symbol: 'р',
      },
      {
        originalCode: 1086,
        alterCode: 106,
        symbol: 'о',
      },
      {
        originalCode: 1083,
        alterCode: 107,
        symbol: 'л',
      },
      {
        originalCode: 1076,
        alterCode: 108,
        symbol: 'д',
      },
      {
        originalCode: 1078,
        alterCode: 59,
        symbol: 'ж',
      },
      {
        originalCode: 1101,
        alterCode: 39,
        symbol: 'э',
      },
      {
        originalCode: 1060,
        alterCode: 65,
        symbol: 'Ф',
        hint: 'Shift + A',
      },
      {
        originalCode: 1067,
        alterCode: 83,
        symbol: 'Ы',
        hint: 'Shift + S',
      },
      {
        originalCode: 1042,
        alterCode: 68,
        symbol: 'В',
        hint: 'Shift + D',
      },
      {
        originalCode: 1040,
        alterCode: 70,
        symbol: 'А',
        hint: 'Shift + F',
      },
      {
        originalCode: 1055,
        alterCode: 71,
        symbol: 'П',
        hint: 'Shift + G',
      },
      {
        originalCode: 1056,
        alterCode: 72,
        symbol: 'Р',
        hint: 'Shift + H',
      },
      {
        originalCode: 1054,
        alterCode: 74,
        symbol: 'О',
        hint: 'Shift + J',
      },
      {
        originalCode: 1051,
        alterCode: 75,
        symbol: 'Л',
        hint: 'Shift + K',
      },
      {
        originalCode: 1044,
        alterCode: 76,
        symbol: 'Д',
        hint: 'Shift + L',
      },
      {
        originalCode: 1046,
        alterCode: 58,
        symbol: 'Ж',
        hint: 'Shift + ;',
      },
      {
        originalCode: 1069,
        alterCode: 34,
        symbol: 'Э',
        hint: "Shift + '",
      },
      {
        originalCode: 1103,
        alterCode: 122,
        symbol: 'я',
      },
      {
        originalCode: 1095,
        alterCode: 120,
        symbol: 'ч',
      },
      {
        originalCode: 1089,
        alterCode: 99,
        symbol: 'с',
      },
      {
        originalCode: 1084,
        alterCode: 118,
        symbol: 'м',
      },
      {
        originalCode: 1080,
        alterCode: 98,
        symbol: 'и',
      },
      {
        originalCode: 1090,
        alterCode: 110,
        symbol: 'т',
      },
      {
        originalCode: 1100,
        alterCode: 109,
        symbol: 'ь',
      },
      {
        originalCode: 1073,
        alterCode: 44,
        symbol: 'б',
      },
      {
        originalCode: 1102,
        alterCode: 46,
        symbol: 'ю',
      },
      {
        originalCode: 46,
        alterCode: 47,
        symbol: '.',
      },
      {
        originalCode: 1071,
        alterCode: 90,
        symbol: 'Я',
        hint: 'Shift + Z',
      },
      {
        originalCode: 1063,
        alterCode: 88,
        symbol: 'Ч',
        hint: 'Shift + X',
      },
      {
        originalCode: 1057,
        alterCode: 67,
        symbol: 'С',
        hint: 'Shift + C',
      },
      {
        originalCode: 1052,
        alterCode: 86,
        symbol: 'М',
        hint: 'Shift + V',
      },
      {
        originalCode: 1048,
        alterCode: 66,
        symbol: 'И',
        hint: 'Shift + B',
      },
      {
        originalCode: 1058,
        alterCode: 78,
        symbol: 'Т',
        hint: 'Shift + N',
      },
      {
        originalCode: 1068,
        alterCode: 77,
        symbol: 'Ь',
        hint: 'Shift + M',
      },
      {
        originalCode: 1041,
        alterCode: 60,
        symbol: 'Б',
        hint: 'Shift + <',
      },
      {
        originalCode: 1070,
        alterCode: 62,
        symbol: 'Ю',
        hint: 'Shift + >',
      },
      {
        originalCode: 44,
        alterCode: 63,
        symbol: ',',
        hint: 'Shift + /',
      },
      {
        originalCode: 32,
        alterCode: 32,
        symbol: ' ',
      },
      {
        originalCode: 33,
        alterCode: 33,
        symbol: '!',
      },
      {
        originalCode: 34,
        alterCode: 34,
        symbol: '"',
      },
      {
        originalCode: 44,
        alterCode: 44,
        symbol: ',',
      },
      {
        originalCode: 46,
        alterCode: 46,
        symbol: '.',
      },
      {
        originalCode: 34,
        alterCode: 34,
        symbol: '"',
      },
      {
        originalCode: 58,
        alterCode: 58,
        symbol: ':',
      },
      {
        originalCode: 63,
        alterCode: 63,
        symbol: '?',
      },
    ],
  },
  {
    languageNameCode: 'abk',
    array: [
      {
        originalCode: 1105,
        alterCode: 96,
        symbol: 'ё',
      },
      {
        originalCode: 1025,
        alterCode: 126,
        symbol: 'Ё',
        hint: 'Shift + `',
      },
      {
        originalCode: 33,
        alterCode: 33,
        symbol: '!',
        hint: 'Shift + 1',
      },
      {
        originalCode: 34,
        alterCode: 64,
        symbol: '"',
        hint: 'Shift + 2',
      },
      {
        originalCode: 8470,
        alterCode: 35,
        symbol: '№',
        hint: 'Shift + 3',
      },
      {
        originalCode: 59,
        alterCode: 36,
        symbol: ';',
        hint: 'Shift + 4',
      },
      {
        originalCode: 37,
        alterCode: 37,
        symbol: '%',
        hint: 'Shift + 5',
      },
      {
        originalCode: 58,
        alterCode: 94,
        symbol: ':',
        hint: 'Shift + 6',
      },
      {
        originalCode: 63,
        alterCode: 38,
        symbol: '?',
        hint: 'Shift + 7',
      },
      {
        originalCode: 42,
        alterCode: 42,
        symbol: '*',
        hint: 'Shift + 8',
      },
      {
        originalCode: 40,
        alterCode: 40,
        symbol: '(',
        hint: 'Shift + 9',
      },
      {
        originalCode: 41,
        alterCode: 41,
        symbol: ')',
        hint: 'Shift + 0',
      },
      {
        originalCode: 95,
        alterCode: 95,
        symbol: '_',
        hint: 'Shift + ---',
      },
      {
        originalCode: 43,
        alterCode: 43,
        symbol: '+',
        hint: 'Shift + =',
      },
      {
        originalCode: 1081,
        alterCode: 113,
        symbol: 'й',
      },
      {
        originalCode: 1094,
        alterCode: 119,
        symbol: 'ц',
      },
      {
        originalCode: 1091,
        alterCode: 101,
        symbol: 'у',
      },
      {
        originalCode: 1082,
        alterCode: 114,
        symbol: 'к',
      },
      {
        originalCode: 1077,
        alterCode: 116,
        symbol: 'е',
      },
      {
        originalCode: 1085,
        alterCode: 121,
        symbol: 'н',
      },
      {
        originalCode: 1075,
        alterCode: 117,
        symbol: 'г',
      },
      {
        originalCode: 1096,
        alterCode: 105,
        symbol: 'ш',
      },
      {
        originalCode: 1097,
        alterCode: 111,
        symbol: 'щ',
      },
      {
        originalCode: 1079,
        alterCode: 112,
        symbol: 'з',
      },
      {
        originalCode: 1093,
        alterCode: 91,
        symbol: 'х',
      },
      {
        originalCode: 1098,
        alterCode: 93,
        symbol: 'ъ',
      },
      {
        originalCode: 1049,
        alterCode: 81,
        symbol: 'Й',
        hint: 'Shift + Q',
      },
      {
        originalCode: 1062,
        alterCode: 87,
        symbol: 'Ц',
        hint: 'Shift + W',
      },
      {
        originalCode: 1059,
        alterCode: 69,
        symbol: 'У',
        hint: 'Shift + E',
      },
      {
        originalCode: 1050,
        alterCode: 82,
        symbol: 'К',
        hint: 'Shift + R',
      },
      {
        originalCode: 1045,
        alterCode: 84,
        symbol: 'Е',
        hint: 'Shift + T',
      },
      {
        originalCode: 1053,
        alterCode: 89,
        symbol: 'Н',
        hint: 'Shift + Y',
      },
      {
        originalCode: 1043,
        alterCode: 85,
        symbol: 'Г',
        hint: 'Shift + U',
      },
      {
        originalCode: 1064,
        alterCode: 73,
        symbol: 'Ш',
        hint: 'Shift + I',
      },
      {
        originalCode: 1065,
        alterCode: 79,
        symbol: 'Щ',
        hint: 'Shift + O',
      },
      {
        originalCode: 1047,
        alterCode: 80,
        symbol: 'З',
        hint: 'Shift + P',
      },
      {
        originalCode: 1061,
        alterCode: 123,
        symbol: 'Х',
        hint: 'Shift + [',
      },
      {
        originalCode: 1066,
        alterCode: 125,
        symbol: 'Ъ',
        hint: 'Shift + ]',
      },
      {
        originalCode: 1092,
        alterCode: 97,
        symbol: 'ф',
      },
      {
        originalCode: 1099,
        alterCode: 115,
        symbol: 'ы',
      },
      {
        originalCode: 1074,
        alterCode: 100,
        symbol: 'в',
      },
      {
        originalCode: 1072,
        alterCode: 102,
        symbol: 'а',
      },
      {
        originalCode: 1087,
        alterCode: 103,
        symbol: 'п',
      },
      {
        originalCode: 1088,
        alterCode: 104,
        symbol: 'р',
      },
      {
        originalCode: 1086,
        alterCode: 106,
        symbol: 'о',
      },
      {
        originalCode: 1083,
        alterCode: 107,
        symbol: 'л',
      },
      {
        originalCode: 1076,
        alterCode: 108,
        symbol: 'д',
      },
      {
        originalCode: 1078,
        alterCode: 59,
        symbol: 'ж',
      },
      {
        originalCode: 1101,
        alterCode: 39,
        symbol: 'э',
      },
      {
        originalCode: 1060,
        alterCode: 65,
        symbol: 'Ф',
        hint: 'Shift + A',
      },
      {
        originalCode: 1067,
        alterCode: 83,
        symbol: 'Ы',
        hint: 'Shift + S',
      },
      {
        originalCode: 1042,
        alterCode: 68,
        symbol: 'В',
        hint: 'Shift + D',
      },
      {
        originalCode: 1040,
        alterCode: 70,
        symbol: 'А',
        hint: 'Shift + F',
      },
      {
        originalCode: 1055,
        alterCode: 71,
        symbol: 'П',
        hint: 'Shift + G',
      },
      {
        originalCode: 1056,
        alterCode: 72,
        symbol: 'Р',
        hint: 'Shift + H',
      },
      {
        originalCode: 1054,
        alterCode: 74,
        symbol: 'О',
        hint: 'Shift + J',
      },
      {
        originalCode: 1051,
        alterCode: 75,
        symbol: 'Л',
        hint: 'Shift + K',
      },
      {
        originalCode: 1044,
        alterCode: 76,
        symbol: 'Д',
        hint: 'Shift + L',
      },
      {
        originalCode: 1046,
        alterCode: 58,
        symbol: 'Ж',
        hint: 'Shift + ;',
      },
      {
        originalCode: 1069,
        alterCode: 34,
        symbol: 'Э',
        hint: "Shift + '",
      },
      {
        originalCode: 1103,
        alterCode: 122,
        symbol: 'я',
      },
      {
        originalCode: 1095,
        alterCode: 120,
        symbol: 'ч',
      },
      {
        originalCode: 1089,
        alterCode: 99,
        symbol: 'с',
      },
      {
        originalCode: 1084,
        alterCode: 118,
        symbol: 'м',
      },
      {
        originalCode: 1080,
        alterCode: 98,
        symbol: 'и',
      },
      {
        originalCode: 1090,
        alterCode: 110,
        symbol: 'т',
      },
      {
        originalCode: 1100,
        alterCode: 109,
        symbol: 'ь',
      },
      {
        originalCode: 1073,
        alterCode: 44,
        symbol: 'б',
      },
      {
        originalCode: 1102,
        alterCode: 46,
        symbol: 'ю',
      },
      {
        originalCode: 46,
        alterCode: 47,
        symbol: '.',
      },
      {
        originalCode: 1071,
        alterCode: 90,
        symbol: 'Я',
        hint: 'Shift + Z',
      },
      {
        originalCode: 1063,
        alterCode: 88,
        symbol: 'Ч',
        hint: 'Shift + X',
      },
      {
        originalCode: 1057,
        alterCode: 67,
        symbol: 'С',
        hint: 'Shift + C',
      },
      {
        originalCode: 1052,
        alterCode: 86,
        symbol: 'М',
        hint: 'Shift + V',
      },
      {
        originalCode: 1048,
        alterCode: 66,
        symbol: 'И',
        hint: 'Shift + B',
      },
      {
        originalCode: 1058,
        alterCode: 78,
        symbol: 'Т',
        hint: 'Shift + N',
      },
      {
        originalCode: 1068,
        alterCode: 77,
        symbol: 'Ь',
        hint: 'Shift + M',
      },
      {
        originalCode: 1041,
        alterCode: 60,
        symbol: 'Б',
        hint: 'Shift + <',
      },
      {
        originalCode: 1070,
        alterCode: 62,
        symbol: 'Ю',
        hint: 'Shift + >',
      },
      {
        originalCode: 44,
        alterCode: 63,
        symbol: ',',
        hint: 'Shift + /',
      },
    ],
  },
]
