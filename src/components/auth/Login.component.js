
import React from 'react';
import {connect} from 'react-redux';
import UserIcon from '../../resources/images/login-user.svg';
import {login} from "../../state/users/actions";
import '../../resources/css/login.css';
class Login extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.setStateUserData  = this.setStateUserData.bind(this);
    }

    setStateUserData(e)
    {

        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    login(e)
    {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    componentWillMount()
    {
        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push("/"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            // this.setState({
            //     errors: nextProps.errors
            // });
        }
    }

    render()
    {
        return (
                <div className="login-form-container">
                    <form onChange={(e) => this.setStateUserData(e)} onSubmit={(e) => this.login(e)}>

                    <div className="row mx-auto w-25  justify-content-center align-self-center">
                            <img className="w-50" src={UserIcon}/>
                        {this.props.error ? (<div className="text-danger">Incorrect email/password</div>) :''}

                            <div className=" form-group form-inline">
                                <label className="mr-2"  htmlFor="email">Email</label>
                                <input required value={this.state.email} type="email" id="email" name="email" className="form-control"/>
                            </div>
                            <div className=" form-group  form-inline">
                                <label  className="mr-2" htmlFor="password">Name</label>
                                <input required value={this.state.password} type="password" id="password" name='password' className="form-control"/>
                            </div>
                        <div className="w-100 text-right">
                        <button type="submit" className="btn btn-primary">Login </button>
                        </div>
                    </div>
                    </form>

                </div>

        )
    }
}

const mapStateToProps = (state) =>{
    return {
        isAuthenticated: state.users.isAuthenticated,
        error: state.users.loginError,
    }
}

export default connect(mapStateToProps, {login})(Login);