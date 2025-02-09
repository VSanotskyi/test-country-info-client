import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import {LineChart} from "@mui/x-charts";

import {api} from "../../api/country.ts";
import s from './CountryInfo.module.css'

interface IProps {
    country: string
}

const CountryInfo: React.FC<IProps> = ({country}) => {
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['countriesInfo', country],
        queryFn: () => api.getCountryInfo(country),
        enabled: !!country,
    })

    const {
        data: countryFlag,
        isError: isCountryFlagError,
        isLoading: isCountryFlagLoading,
    } = useQuery({
        queryKey: ['countryFlag', country, data?.countryCode],
        queryFn: () => api.getCountryFlag(data?.countryCode || ''),
        enabled: !!data?.countryCode,
    })

    const {
        data: population,
        error: errorPopulation,
        isLoading: IsLoadingPopulation,
        isError: isPopulationError,
    } = useQuery({
        queryKey: ['population', country],
        queryFn: () => api.getCountryPopulation(data?.commonName!),
        enabled: !!data?.commonName,
    })

    return (
        <div className={s.containerInfo}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error?.message.toString()}</p>}
            {
                !isCountryFlagError && !isCountryFlagLoading && countryFlag?.flag && (
                    <img src={countryFlag?.flag} width={'200px'} height={'100px'}/>
                )
            }
            <p>Country name: {data?.commonName}</p>
            <p>Country code: {data?.countryCode}</p>
            <p>Official name: {data?.officialName}</p>
            <p>Region: {data?.region}</p>
            <div className={s.bordersContainer}>
                <p>Borders: </p>
                {data?.borders && data.borders.length > 0 && (
                    <ul>
                        {data?.borders.map(el => (
                            <li key={el.countryCode} className={s.bordersContainerItem}>
                                <p>{el.commonName}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {isPopulationError && <p>Error: {errorPopulation.message}</p>}
            {IsLoadingPopulation && (<p>Wait, loading population</p>)}
            {population?.populationCounts
                && population?.populationCounts.length > 0
                && !IsLoadingPopulation
                && !isPopulationError
                && (
                    <LineChart
                        xAxis={[{
                            data: population?.populationCounts.map(item => item.year),
                            label: 'Year',
                            tickMinStep: 5,
                            tickMaxStep: 10
                        }]}
                        series={[
                            {
                                data: population?.populationCounts.map(item => item.value),
                                label: 'Population',
                                color: '#1976d2',
                                showMark: true,
                            }
                        ]}
                        grid={{
                            vertical: true,
                            horizontal: true
                        }}
                        width={800}
                        height={300}
                        margin={{left: 70, right: 50, top: 30, bottom: 50}}
                        tooltip={{
                            trigger: 'item'
                        }}
                        sx={{
                            [`& .MuiLineElement-root`]: {
                                strokeWidth: 2,
                            },
                            [`& .MuiMarkElement-root`]: {
                                fill: '#1976d2',
                                strokeWidth: 2,
                            }
                        }}
                    />
                )}
        </div>
    );
};

export default CountryInfo;