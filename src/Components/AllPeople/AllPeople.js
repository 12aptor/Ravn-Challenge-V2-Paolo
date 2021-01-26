import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const ALL_STARSHIPS = gql`
    {
        allPeople{
            people{
                name
                id
                homeworld{
                    name
                }
                species{
                    name
                }
            }
        }
    }
`

export default function AllPeople(props) {

    const history = useHistory()
    const { loading, error, data } = useQuery(ALL_STARSHIPS)
    const [updatedData, setUpdatedData] = useState([])

    useEffect(() => {
        if (data) {
            let newData = data.allPeople.people
            setUpdatedData(newData)
        }
    })

    function setPersonalID(id) {
        props.getPersonInformation(id)
        history.push('/information')
    }

    if (loading) return <div className="loading-container">
        <p><strong><i className="fas fa-spinner fa-spin"></i> Loading</strong></p>
    </div>
    if (error) return <div className="error-container">
        <p><strong>Failed to Load Data</strong></p>
    </div>
    return (
        <>
            <div className="all-people-container">
                {updatedData.map((data, key) => {
                    if (data.species) {
                        return <div className="person-date" key={key} onClick={() => setPersonalID(data.id)}>
                            <div className="row" style={{ marginTop: '16px' }}>
                                <div className="col-10 my-auto" >
                                    <p style={{ fontSize: '14pt', width: '85%' }}>
                                        <strong>{data.name}</strong>
                                        <br />
                                        <small style={{ color: 'rgba(0,0,0,0.5)' }}>
                                            {data.species.name} from {data.homeworld.name}
                                        </small>
                                    </p>
                                </div>
                                <div className="col-2 my-auto">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <div className="separator"></div>
                        </div>
                    }
                    else {
                        return <div className="person-date" key={key} onClick={() => setPersonalID(data.id)}>
                            <div className="row" style={{ marginTop: '16px' }}>
                                <div className="col-10 my-auto" >
                                    <p style={{ fontSize: '14pt', width: '85%' }}>
                                        <strong>{data.name}</strong>
                                        <br />
                                        <small style={{ color: 'rgba(0,0,0,0.5)' }}>
                                            Human from {data.homeworld.name}
                                        </small>
                                    </p>
                                </div>
                                <div className="col-2 my-auto">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <div className="separator"></div>
                        </div>
                    }
                })}
            </div>
        </>
    )
}
