import React, { createContext, useState } from 'react';

export const CitiesServicesContext = createContext(null)

export function CitiesServicesProvider({ children }: any) {
    const [cities, setCities] = useState([])
    const [additionalServices, setAdditionalServices] = useState([])

    const value: any = {
        cities,
        setCities,
        additionalServices,
        setAdditionalServices
    }

    return (
        <CitiesServicesContext.Provider value={value}>{children}</CitiesServicesContext.Provider>
    );
}
