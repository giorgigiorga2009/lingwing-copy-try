export const SWITCHED_LANGUAGES = [
  {
    long: "English",
    short: "eng",
  },
  {
    long: "Russian",
    short: "rus",
  },
  {
    long: "Georgian",
    short: "geo",
  },
  {
    long: "Turkish",
    short: "tur",
  },
  {
    long: "Bengali",
    short: "ben",
  },
  {
    long: "Spanish",
    short: "esp",
  },
] as Language[];

export type ShortLanguage = "eng" | "esp" | "geo" | "rus" | "tur" | "ben" | "ita";

export type LongLanguage =
  | "English"
  | "Spanish"
  | "Georgian"
  | "Russian"
  | "Turkish"
  | "Bengali"
  | 'Italian'

export type Language = {
  long: LongLanguage;
  short: ShortLanguage;
};

export const LEARNED_LANGUAGES = [
  { long: "Italian", 
  short: "ita",
  },
...SWITCHED_LANGUAGES,
] as Language[]