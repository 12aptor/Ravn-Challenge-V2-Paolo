import React from 'react'
import { useHistory } from 'react-router-dom';

export default function NavBarWithBack() {

    const history = useHistory()

    return (
        <div className="navigation-bar">
            <span
                style={{ position: 'fixed', left: '16px', fontSize: '1.2em' }}
                onClick={() => {
                    history.push('/')
                }}>
                <i className="fas fa-arrow-left"></i>
            </span>
            <span>People of Star Wars</span>
        </div>
    )
}