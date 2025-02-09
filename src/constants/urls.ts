const baseURL = 'http://localhost:8080/api'

const urls = {
    countries: '/countries',
    countryInfo: (country: string) => `/country-info?country=${country}`,
    countryPopulation: (country: string) => `/country-population?country=${country}`,
    countryFlag: '/country-flag',
}

export {
    baseURL,
    urls,
}