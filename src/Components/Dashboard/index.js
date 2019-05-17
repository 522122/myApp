import React from 'react';
import './_styles.scss';
import data from './data.json';
import Login from '../Login';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.appState.loggedIn) {
            return <Login appFunctions={this.props.appFunctions} />
        }

        return (
            
            <div className="dashboard">
                {data.dashboardItems.map((item, i) => (
                    <div className="card" key={i}>
                        <a className="card-body">
                            <i className={item.icon}></i>
                            <h3>{item.title}</h3>
                        </a>
                    </div>
                ))}
            </div>
        )
    }
}

export default Dashboard;