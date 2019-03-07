import { countries, currencies, findBy, stems } from "../src";

test("#stems", () => {
  const nonAlternateStems = Array.from(Array(88).keys()).map(String);
  const alternateStems = ["510", "530", "550", "560", "570", "580", "590"];

  const expectedStems = [...nonAlternateStems, ...alternateStems];

  expect(stems).toEqual(expectedStems);
});

test("#countries", () => {
  const expectedCountries = [
    "HK",
    "PT",
    "HN",
    "PY",
    "HR",
    "HU",
    "QA",
    "ID",
    "IE",
    "IL",
    "AE",
    "IN",
    "ZA",
    "IS",
    "AL",
    "IT",
    "AM",
    "AR",
    "AT",
    "AU",
    "RO",
    "RU",
    "BE",
    "BG",
    "JP",
    "BH",
    "BO",
    "SA",
    "BR",
    "SE",
    "SG",
    "SI",
    "BY",
    "SK",
    "CA",
    "SV",
    "CH",
    "KR",
    "CL",
    "CN",
    "CO",
    "CR",
    "KZ",
    "TH",
    "CY",
    "CZ",
    "TR",
    "DE",
    "TW",
    "TZ",
    "DK",
    "LT",
    "LU",
    "LV",
    "DO",
    "UA",
    "EC",
    "US",
    "EE",
    "EG",
    "MT",
    "MX",
    "MY",
    "ES",
    "VN",
    "NG",
    "NI",
    "NL",
    "NO",
    "FI",
    "NZ",
    "FR",
    "GB",
    "GR",
    "GT",
    "PA",
    "PE",
    "PH",
    "PK",
    "PL"
  ];

  expect(countries).toEqual(expectedCountries);
});

test("#currencies", () => {
  const expectedCurrencies = [
    "HKD",
    "EUR",
    "USD",
    "HRK",
    "HUF",
    "QAR",
    "IDR",
    "ILS",
    "AED",
    "INR",
    "ZAR",
    "AUD",
    "RON",
    "RUB",
    "BGN",
    "JPY",
    "SAR",
    "BRL",
    "SEK",
    "SGD",
    "CAD",
    "CHF",
    "KRW",
    "CLP",
    "CNY",
    "COP",
    "KZT",
    "THB",
    "CZK",
    "TRY",
    "TWD",
    "TZS",
    "DKK",
    "EGP",
    "MXN",
    "MYR",
    "VND",
    "NGN",
    "NOK",
    "NZD",
    "GBP",
    "PEN",
    "PHP",
    "PKR",
    "PLN"
  ];

  expect(currencies).toEqual(expectedCurrencies);
});

test("#findBy", () => {
  const tierUS0 = findBy({
    tier: "0",
    country: "US"
  });

  expect(tierUS0.tierStem).toEqual("0");
  expect(tierUS0.countryCode).toEqual("US");
  expect(tierUS0.currencyCode).toEqual("USD");
  expect(tierUS0.retailPrice).toEqual(0);
  expect(tierUS0.wholesalePrice).toEqual(0);

  const tierUS1 = findBy({
    tier: "1",
    country: "US"
  });

  expect(tierUS1.tierStem).toEqual("1");
  expect(tierUS1.countryCode).toEqual("US");
  expect(tierUS1.currencyCode).toEqual("USD");
  expect(tierUS1.retailPrice).toEqual(0.99);
  expect(tierUS1.wholesalePrice).toEqual(0.7);

  const tierTW1 = findBy({
    tier: "1",
    country: "TW"
  });

  expect(tierTW1.tierStem).toEqual("1");
  expect(tierTW1.countryCode).toEqual("TW");
  expect(tierTW1.currencyCode).toEqual("TWD");
  expect(tierTW1.retailPrice).toEqual(30);
  expect(tierTW1.wholesalePrice).toEqual(20);

  const tierMY1 = findBy({
    tier: "1",
    country: "MY"
  });

  expect(tierMY1.tierStem).toEqual("1");
  expect(tierMY1.countryCode).toEqual("MY");
  expect(tierMY1.currencyCode).toEqual("MYR");
  expect(tierMY1.retailPrice).toEqual(3.9);
  expect(tierMY1.wholesalePrice).toEqual(2.73);
});
