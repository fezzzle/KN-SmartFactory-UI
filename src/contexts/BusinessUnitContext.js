import React from 'react'

const BusinessUnitContext = React.createContext()

export const BusinessUnitProvider = BusinessUnitContext.Provider
export const BusinessUnitConsumer = BusinessUnitContext.Consumer

export default BusinessUnitContext