import React, { Fragment, useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const EXCHANGE_RATES = gql`
    query PersonalInformation($id: ID) {
        person(id:$id) {
            eyeColor
            hairColor
            skinColor
            birthYear
            vehicleConnection{
                vehicles{
                    name
                }
            }
        }
    }
`;

export default function GeneralInformation({ personId }) {

    const id = personId

    const { loading, error, data } = useQuery(EXCHANGE_RATES, {
        variables: { id }
    });

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        if (data) {
            let newData = data.person.vehicleConnection.vehicles
            setVehicles(newData)
        }
    })


    if (loading) return <div className="loading-container">
        <p><strong><i className="fas fa-spinner fa-spin"></i> Loading</strong></p>
    </div>
    if (error) return <div className="error-container">
        <p><strong>Failed to Load Data</strong></p>
    </div>
    return (
        <>
            <div className="general-information">
                <div>
                    <strong>General Information</strong>
                </div>
                <div className="description-data row">
                    <div className="col-9" style={{ margin: '0px', padding: '0px' }}>
                        <strong>Eye Color</strong>
                    </div>
                    <div className="col-3" style={{ textAlign: 'right', color: 'black' }}>
                        <strong>{data.person.eyeColor}</strong>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="description-data row">
                    <div className="col-9" style={{ margin: '0px', padding: '0px' }}>
                        <strong>Hair Color</strong>
                    </div>
                    <div className="col-3" style={{ textAlign: 'right', color: 'black' }}>
                        <strong>{data.person.hairColor}</strong>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="description-data row">
                    <div className="col-9" style={{ margin: '0px', padding: '0px' }}>
                        <strong>Skin Color</strong>
                    </div>
                    <div className="col-3" style={{ textAlign: 'right', color: 'black' }}>
                        <strong>{data.person.skinColor}</strong>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="description-data row">
                    <div className="col-9" style={{ margin: '0px', padding: '0px' }}>
                        <strong>Birth Year</strong>
                    </div>
                    <div className="col-3" style={{ textAlign: 'right', color: 'black' }}>
                        <strong>{data.person.birthYear}</strong>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="vehicle-information">
                    <strong>Vehicles</strong>
                </div>
                {
                    vehicles.length === 0 ? null : <>
                        {
                            vehicles.map((data, key) => (
                                <Fragment key={key}>
                                    <div className="description-data">
                                        <strong>{data.name}</strong>
                                    </div>
                                    <div className="separator"></div>
                                </Fragment>
                            ))
                        }
                    </>
                }
            </div>
        </>
    )
}
