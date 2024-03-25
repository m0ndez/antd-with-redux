import { useLocale } from "../../../../hooks";
import { UserData } from "../../../../types/user";
import nationality from "../../../../mocks/nationality.json";

export const defaultValues: UserData = {
  key: "",
  namePrefix: "",
  firstName: "",
  lastName: "",
  dob: "",
  nationality: "",
  citizenId: "",
  sex: "",
  phoneNumber: "",
  countryCode: "",
  expectedSalary: "",
};

export const prefixNameOptions = (t: ReturnType<typeof useLocale>["t"]) => [
  {
    value: "mr",
    label: t("form.namePrefix.options.mr"),
  },
  {
    value: "mrs",
    label: t("form.namePrefix.options.mrs"),
  },
  {
    value: "miss",
    label: t("form.namePrefix.options.miss"),
  },
];

export const sexOptions = (t: ReturnType<typeof useLocale>["t"]) => [
  {
    value: "male",
    label: t("form.sex.options.male"),
  },
  {
    value: "female",
    label: t("form.sex.options.female"),
  },
  {
    value: "other",
    label: t("form.sex.options.other"),
  },
];

export const nationalityOptions = nationality.map((item) => ({
  value: item.code,
  label: item.name,
}));

export const phoneLocaleOptions = nationality.map((item) => ({
  value: item.dial_code,
  label: `${item.emoji}${item.dial_code}`,
  key: item.code,
}));
