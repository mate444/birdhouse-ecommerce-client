import countries from "i18n-iso-countries";
// import language countries
import engCountries from "i18n-iso-countries/langs/en.json";

countries.registerLocale(engCountries);

export function getCountries () {
  const countryNames = countries.getNames("en", { select: "official" });
  return Object.keys(countryNames).map((c) => {
    return { code: c, name: countryNames[c] };
  });
}
