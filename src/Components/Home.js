import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import GeneralInformation from './GeneralInformation/GeneralInformation';
import AllPeople from './AllPeople/AllPeople';
import NavBar from './NavBar/NavBar';
import NavBarWithBack from './NavBar/NavBarWithBack';

export default function Home() {

    const [personId, setPersonId] = useState('')

    function getPersonInformation(data){
        setPersonId(data)
    }

    function returnNavBar(){
        let pathname = window.location.pathname
        if(pathname==="/"){
            return <NavBar/>
        } else {
            return <NavBarWithBack/>
        }
    }
    return (
        <div style={{ width: '100%' }}>
            <Router>
                {returnNavBar()}
                <Switch>
                    <Route path="/information" render={() => { return <GeneralInformation personId={personId} /> }} />
                    <Route path="/" render={() => { return <AllPeople getPersonInformation={getPersonInformation} /> }} />
                    <Route render={() => { return <Redirect to="/" /> }} />
                </Switch>
            </Router>
        </div>
    )
}
