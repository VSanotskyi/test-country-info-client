import {useQuery} from '@tanstack/react-query';

import {api} from "../../api/country.ts";
import s from './Countries.module.css'
import {useState} from "react";
import CountryInfo from "../CountryInfo/CountryInfo.tsx";

const Countries = () => {
    const [selectedCountry, setSelectedCountry] = useState('')

    const getCountries = async () => {
        return await api.getAllCountries()
    }

    const handleSelectedCountry = (country: string) => {
        setSelectedCountry(country)
    }

    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['countries'],
        queryFn: () => getCountries(),
    })

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    if (isError) {
        return (
            <p>Error: {error.message}</p>
        )
    }

    return (
        <div className={s.container}>
            <ul className={s.list}>
                {data?.map((country) => (
                    <li key={country.countryCode}>
                        <button
                            className={s.btn}
                            onClick={() => handleSelectedCountry(country.countryCode)}
                        >
                            {country.name}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedCountry.length > 0 && (
                <CountryInfo country={selectedCountry}/>
            )}
        </div>
    );
};

export default Countries;