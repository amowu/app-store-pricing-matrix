/**
 * @typedef {Object} PricingInfo
 * @property {string} countryCode - The country code, e.g. `"US"`.
 * @property {string} currencyCode - The currency code, e.g. `"USD"`.
 * @property {string} currencySymbol - The currency symbol, e.g. `"$"`.
 * @property {string} fRetailPrice - The retail price with currency symbol, e.g. `"$0.99"`.
 * @property {string} fWholesalePrice - The wholesale price with currency symbol, e.g. `"$0.70"`.
 * @property {number} retailPrice - The wholesale price, e.g. `0.99`.
 * @property {number} wholesalePrice - The wholesale price, e.g. `0.70`.
 */

/**
 * @typedef {Object} Tier
 * @property {PricingInfo[]} pricingInfo
 * @property {string} tierName - The name of tier, e.g. `"Tier 1"`.
 * @property {string} tierStem - The stem of tier, e.g. `"1"`.
 */

/**
 * @typedef {Object} FlattenedTier
 * @property {string} countryCode - The country code, e.g. `"US"`.
 * @property {string} currencyCode - The currency code, e.g. `"USD"`.
 * @property {string} currencySymbol - The currency symbol, e.g. `"$"`.
 * @property {string} fRetailPrice - The retail price with currency symbol, e.g. `"$0.99"`.
 * @property {string} fWholesalePrice - The wholesale price with currency symbol, e.g. `"$0.70"`.
 * @property {number} retailPrice - The wholesale price, e.g. `0.99`.
 * @property {string} tierName - The name of tier, e.g. `"Tier 1"`.
 * @property {string} tierStem - The stem of tier, e.g. `"1"`.
 * @property {number} wholesalePrice - The wholesale price, e.g. `0.70`.
 */

import _, { find, get } from "lodash";

import jsonData from "../lib/input/pricing_matrix.json";

/** Class representing a App Store Pricing Matrix. */
class AppStorePricingMatrix {
  /**
   * Get all items of tier.
   * @static
   * @returns {Tier[]} An array
   * @example
   * // returns
   * // [
   * //   {
   * //     "tierStem": "0",
   * //     "tierName": "Free",
   * //     "pricingInfo": [
   * //       {
   * //         "countryCode": "TW",
   * //         "currencyCode": "TWD",
   * //         "wholesalePrice": 0,
   * //         "retailPrice": 0,
   * //         "currencySymbol": "N",
   * //         "fRetailPrice": "NT$ 0",
   * //         "fWholesalePrice": "NT$ 0"
   * //       },
   * //       {
   * //         "countryCode": "US",
   * //         "currencyCode": "USD",
   * //         "wholesalePrice": 0.00,
   * //         "retailPrice": 0.00,
   * //         "currencySymbol": "$",
   * //         "fRetailPrice": "$0.00",
   * //         "fWholesalePrice": "$0.00"
   * //       },
   * //       {
   * //         "countryCode": "MY",
   * //         "currencyCode": "MYR",
   * //         "wholesalePrice": 0.00,
   * //         "retailPrice": 0.00,
   * //         "currencySymbol": "R",
   * //         "fRetailPrice": "RM0.00",
   * //         "fWholesalePrice": "RM0.00",
   * //       },
   * //       ...
   * //     ]
   * //   },
   * //   {
   * //     "tierStem": "1",
   * //     "tierName": "Tier 1",
   * //     "pricingInfo": [
   * //       {
   * //         "countryCode": "TW",
   * //         "currencyCode": "TWD",
   * //         "wholesalePrice": 20,
   * //         "retailPrice": 30,
   * //         "currencySymbol": "N",
   * //         "fRetailPrice": "NT$ 30",
   * //         "fWholesalePrice": "NT$ 20"
   * //       },
   * //       {
   * //         "countryCode": "US",
   * //         "currencyCode": "USD",
   * //         "wholesalePrice": 0.70,
   * //         "retailPrice": 0.99,
   * //         "currencySymbol": "$",
   * //         "fRetailPrice": "$0.99",
   * //         "fWholesalePrice": "$0.70"
   * //       },
   * //       {
   * //         "countryCode": "MY",
   * //         "currencyCode": "MYR",
   * //         "wholesalePrice": 2.73,
   * //         "retailPrice": 3.90,
   * //         "currencySymbol": "R",
   * //         "fRetailPrice": "RM3.90",
   * //         "fWholesalePrice": "RM2.73",
   * //       },
   * //       ...
   * //     ]
   * //   },
   * //   ...
   * //   {
   * //     "tierStem": "590",
   * //     "tierName": "Alternate Tier 5",
   * //     "pricingInfo": [
   * //       {
   * //         "countryCode": "TW",
   * //         "currencyCode": "TWD",
   * //         "wholesalePrice": 100,
   * //         "retailPrice": 150,
   * //         "currencySymbol": "N",
   * //         "fRetailPrice": "NT$ 150",
   * //         "fWholesalePrice": "NT$ 100"
   * //       },
   * //       {
   * //         "countryCode": "US",
   * //         "currencyCode": "USD",
   * //         "wholesalePrice": 3.50,
   * //         "retailPrice": 4.99,
   * //         "currencySymbol": "$",
   * //         "fRetailPrice": "$4.99",
   * //         "fWholesalePrice": "$3.50"
   * //       },
   * //       {
   * //         "countryCode": "MY",
   * //         "currencyCode": "MYR",
   * //         "wholesalePrice": 13.93,
   * //         "retailPrice": 19.90,
   * //         "currencySymbol": "R",
   * //         "fRetailPrice": "RM19.90",
   * //         "fWholesalePrice": "RM13.93",
   * //       },
   * //       ...
   * //     ]
   * //   }
   * // ]
   * AppStorePricingMatrix.tiers;
   */
  static get tiers() {
    const pricingTiers = get(jsonData, ["data", "pricingTiers"], []);

    return pricingTiers;
  }

  /**
   * Get all stems of tier.
   * @static
   * @returns {string[]} An array of tier stems.
   * @example
   * // returns ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "510", "530", "550", "560", "570", "580", "590"]
   * AppStorePricingMatrix.stems;
   */
  static stems = this.tiers.map(({ tierStem }) => tierStem);

  /**
   * Get all country code of tier.
   * @static
   * @returns {string[]} An array of country code.
   * @example
   * // returns ["HK", "PT", "HN", "PY", "HR", "HU", "QA", "ID", "IE", "IL", "AE", "IN", "ZA", "IS", "AL", "IT", "AM", "AR", "AT", "AU", "RO", "RU", "BE", "BG", "JP", "BH", "BO", "SA", "BR", "SE", "SG", "SI", "BY", "SK", "CA", "SV", "CH", "KR", "CL", "CN", "CO", "CR", "KZ", "TH", "CY", "CZ", "TR", "DE", "TW", "TZ", "DK", "LT", "LU", "LV", "DO", "UA", "EC", "US", "EE", "EG", "MT", "MX", "MY", "ES", "VN", "NG", "NI", "NL", "NO", "FI", "NZ", "FR", "GB", "GR", "GT", "PA", "PE", "PH", "PK", "PL"]
   * AppStorePricingMatrix.countries
   */
  static countries = _.chain(
    this.tiers.map(({ pricingInfo }) =>
      pricingInfo.map(({ countryCode }) => countryCode)
    )
  )
    .flatten()
    .uniq()
    .value();

  /**
   * Get all currency code of tier.
   * @static
   * @returns {string[]} An array of currency code.
   * @example
   * // returns ["HKD", "EUR", "USD", "HRK", "HUF", "QAR", "IDR", "ILS", "AED", "INR", "ZAR", "AUD", "RON", "RUB", "BGN", "JPY", "SAR", "BRL", "SEK", "SGD", "CAD", "CHF", "KRW", "CLP", "CNY", "COP", "KZT", "THB", "CZK", "TRY", "TWD", "TZS", "DKK", "EGP", "MXN", "MYR", "VND", "NGN", "NOK", "NZD", "GBP", "PEN", "PHP", "PKR", "PLN"]
   * AppStorePricingMatrix.currencies
   */
  static currencies = _.chain(
    this.tiers.map(({ pricingInfo }) =>
      pricingInfo.map(({ currencyCode }) => currencyCode)
    )
  )
    .flatten()
    .uniq()
    .value();

  /**
   * Find pricing information by country code and tier stem.
   * @static
   * @param {Object} pricing
   * @param {string} pricing.country - The country code, e.g. `"TW"`, `"US"`, `"MY"`.
   * @param {string} pricing.tier - The stem of tier.
   * @returns {FlattenedTier} The pricing information.
   * @example <caption>"Tier 1" for USA</caption>
   * // returns
   * // {
   * //   countryCode: "US",
   * //   currencyCode: "USD",
   * //   currencySymbol: "$",
   * //   fRetailPrice: "$0.99",
   * //   fWholesalePrice: "$0.7",
   * //   retailPrice: 0.99,
   * //   tierStem: "1",
   * //   wholesalePrice: 0.7
   * //  }
   * AppStorePricingMatrix.findBy({ country: "US", tier: "1" });
   * @example <caption>"Tier 1" for Taiwan</caption>
   * // returns
   * // {
   * //   countryCode: "TW",
   * //   currencyCode: "TWD",
   * //   currencySymbol: "N",
   * //   fRetailPrice: "NT$ 30",
   * //   fWholesalePrice: "NT$ 20",
   * //   retailPrice: 30,
   * //   tierStem: "1",
   * //   wholesalePrice: 20
   * //  }
   * AppStorePricingMatrix.findBy({ country: "TW", tier: "1" });
   * @example <caption>"Tier 1" for Malaysia</caption>
   * // returns
   * // {
   * //   countryCode: "MY",
   * //   currencyCode: "MYR",
   * //   currencySymbol: "R",
   * //   fRetailPrice: "RM3.90",
   * //   fWholesalePrice: "RM2.73",
   * //   retailPrice: 3.90,
   * //   tierStem: "1",
   * //   wholesalePrice: 2.73
   * //  }
   * AppStorePricingMatrix.findBy({ country: "MY", tier: "1" });
   */
  static findBy({ country, tier }) {
    const { tierStem, tierName, pricingInfo } = find(this.tiers, {
      tierStem: tier
    });

    const pricingInfoFindByCountry = find(pricingInfo, {
      countryCode: country
    });

    return {
      tierStem,
      tierName,
      ...pricingInfoFindByCountry
    };
  }
}

export default AppStorePricingMatrix;
