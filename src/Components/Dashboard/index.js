import React from 'react';
import './_styles.scss';
import data from './data.json';
import { Link } from "react-router-dom";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            
            <div className="dashboard">
                {data.dashboardItems.map((item, i) => (
                    <Link className="card" key={i} to={item.path}>
                        <div className="card-body">
                            <i className={item.icon}></i>
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}

export default Dashboard;