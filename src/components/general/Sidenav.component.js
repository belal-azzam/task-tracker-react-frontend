
import React from 'react';
import {connect} from 'react-redux';
import {logout} from "../../state/users/actions";
import {withRouter} from "react-router-dom";
import {Link} from 'react-router-dom';

class Sidenav extends React.Component {
    logout(e)
    {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    render()
    {
        let menuItems ;
        if(this.props.auth.isAuthenticated)
        {
            menuItems = (<li className="nav-item">
                <a onClick={(e) => this.logout(e)} className="nav-link" href="#">Logout</a>
            </li>);
        }else{
            menuItems = (<React.Fragment>
                <li className="nav-item" >
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item" >
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                </React.Fragment>
        );
        }
        return (
            <div id="sidenav">
                <ul className="nav flex-column">
                    {menuItems}


                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: {
            isAuthenticated: state.users.isAuthenticated
        }
    }
}
export default withRouter(connect( mapStateToProps, {logout})(Sidenav));