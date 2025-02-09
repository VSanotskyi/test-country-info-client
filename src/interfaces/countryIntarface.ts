export interface ICountry {
    name: string
    countryCode: string
}

export interface ICountryInfo {
    commonName: string
    countryCode: string
    officialName: string
    region: string
    borders: {
        commonName: string
        countryCode: string
        officialName: string
        region: string
    }[]
}

export interface IPopulate {
    code: string
    country: string
    iso3: string
    populationCounts: {
        value: number
        year: number
    }[]
}

export interface IFlag {
    flag: string
    iso2: string
    iso3: string
    name: string
}