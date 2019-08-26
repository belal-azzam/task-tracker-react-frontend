
import React from 'react';
import {connect} from 'react-redux';
import UserIcon from '../../resources/images/login-user.svg';
import {register} from "../../state/users/actions";
import '../../resources/css/register.css';
class Register extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            photo: null,
            errors: false
        }
        this.setStateUserData  = this.setStateUserData.bind(this);
    }

    setStateUserData(e)
    {
        let value = e.target.value;
        if(e.target.files)
        {
            value = e.target.files[0];
        }
        this.setState({
            ...this.state,
            [e.target.id]: value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.history.push("/"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    register(e)
    {
        e.preventDefault();
        if(this.state.password != this.state.confirmPassword)
        {
            this.setState({
                ...this.state,
                errors:{
                    ...this.state.errors,
                    confirmPassword: 'Password dosen\'t match'
                }
            })
        }else{
            this.props.register(this.state);
        }
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
            this.setState({
                ...this.state,
                errors: nextProps.errors
            });
        }
    }

    render()
    {
        return (
            <div className="register-form-container">
                <h1>Register</h1>
                <hr/>

                    <form  onChange={(e) => this.setStateUserData(e)} onSubmit={(e) => this.register(e)}>

                        <div className={"row form-group " + (this.state.errors.username ? 'text-danger' : '')}>
                            <div className="col-sm-2">
                                <label  className="col-form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-sm-6">
                                <input required value={this.state.username} type="text" id="username" name='username' className={"form-control "+ (this.state.errors.username ? 'is-invalid': "")}/>
                                {this.state.errors.username ? (<div className="invalid-feedback">{this.state.errors.username}</div> ) : ''}
                            </div>
                        </div>
                        <div className={"row form-group " + (this.state.errors.email ? 'text-danger' : '')}>
                            <div className="col-sm-2">
                                <label className="col-form-label"  htmlFor="email">Email</label>
                            </div>
                            <div className="col-sm-6">
                                <input required value={this.state.email} type="email" id="email" name="email" className={"form-control "+ (this.state.errors.email ? 'is-invalid': "")} />
                                {this.state.errors.email ? (<div className="invalid-feedback">{this.state.errors.email}</div> ) : ''}

                            </div>
                        </div>
                        <div className={"row form-group " + (this.state.errors.password ? 'text-danger' : '')}>
                            <div className="col-sm-2">
                                <label   className="col-form-label" htmlFor="password">Password</label>
                            </div>
                            <div className="col-sm-6">
                                <input required value={this.state.password} type="password" id="password" name='password' className={"form-control "+ (this.state.errors.password ? 'is-invalid': "")}/>
                                {this.state.errors.password ? (<div className="invalid-feedback">{this.state.errors.password}</div> ) : ''}
                            </div>

                        </div>
                        <div className={"row form-group " + (this.state.errors.confirmPassword ? 'text-danger' : '')}>
                            <div className="col-sm-2">
                                <label  className="col-form-label" htmlFor="password">Confirm Password</label>
                            </div>
                            <div className="col-sm-6">
                                <input required value={this.state.confirmPassword} type="password" id="confirmPassword" name='confirmPassword' className={"form-control "+ (this.state.errors.confirmPassword ? 'is-invalid': "")}/>
                                {this.state.errors.confirmPassword ? (<div className="invalid-feedback">{this.state.errors.confirmPassword}</div> ) : ''}
                            </div>

                        </div>

                        <div className={"row form-group " + (this.state.errors.photo ? 'text-danger' : '')}>
                            <div className="col-sm-2">
                                <label  className="col-form-label" htmlFor="photo">Photo</label>
                            </div>
                            <div className="col-sm-6">
                                <input  type="file" id="photo" name='photo' className={"form-control "+ (this.state.errors.photo ? 'is-invalid': "")}/>
                                {this.state.errors.photo ? (<div className="invalid-feedback">{this.state.errors.photo}</div> ) : ''}
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-md-9 col-md-1">
                                <button type="submit" className="btn btn-primary">Register</button>
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
        errors: state.users.registerErrors
    }
}

export default connect(mapStateToProps, {register})(Register);