import {instance} from "./api.ts";
import {urls} from "../constants/urls.ts";
import {ICountry, ICountryInfo, IFlag, IPopulate} from "../interfaces/countryIntarface.ts";

const getAllCountries = async (): Promise<ICountry[]> => {
    const response = await instance.get(urls.countries)
    return response.data
}

const getCountryInfo = async (country: string): Promise<ICountryInfo> => {
    const response = await instance.get(urls.countryInfo(country))
    return response.data
}

const getCountryPopulation = async (country: string): Promise<IPopulate> => {
    const response = await instance.get(urls.countryPopulation(country))
    return response.data
}

const getCountryFlag = async (iso2: string): Promise<IFlag> => {
    const response = await instance.post(urls.countryFlag, {iso2})
    return response.data
}

export const api = {
    getAllCountries,
    getCountryInfo,
    getCountryPopulation,
    getCountryFlag,
}