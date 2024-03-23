import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as nameSpaceEn from "./en";
import * as nameSpaceTh from "./th";

const loadedNameSpaces = {
  ...nameSpaceEn,
};

export type NameSpace = keyof typeof loadedNameSpaces;
export const nameSpaceNames = Object.keys(loadedNameSpaces) as NameSpace[];

export const nameSpaces: Record<NameSpace, NameSpace> = nameSpaceNames.reduce(
  (record, ns) => Object.assign(record, { [ns]: ns }),
  {} as Record<NameSpace, NameSpace>
);

type SupportedLocale = "en" | "th";

export const defaultLanguage: SupportedLocale = "th";

export const defaultNS: NameSpace = "common";

export const resources = {
  en: {
    ...nameSpaceEn,
  },
  th: {
    ...nameSpaceTh,
  },
} as const;

export function initI18n(locale?: SupportedLocale) {
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: defaultLanguage,
    ns: nameSpaceNames,
    defaultNS,
    resources,
    // optional : used to avoid character codes in texts -> user values have to be escaped manually to mitigate XSS attacks
    interpolation: { escapeValue: false },
  });
}
