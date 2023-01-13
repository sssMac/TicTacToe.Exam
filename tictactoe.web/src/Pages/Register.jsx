import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "../Styles/Auth.css"
import Alert from '@mui/material/Alert';

import AuthService from "../Services/auth.service";
import "../Styles/Register.css";
import { withRouter } from '../Common/with-router';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};




class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            errorconfirm: "",
            accesconfirm: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordConfirm(e) {
        this.setState({
            passwordConfirm: e.target.value
        });
    }

    handleLogin(){
        this.props.router.navigate("/login");
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.state.password === this.state.passwordConfirm){
            if (this.checkBtn.context._errors.length === 0) {
                this.state.errorconfirm = ""
                AuthService.register(
                    this.state.username,
                    this.state.password
                ).then(
                    response => {
                        this.state.accesconfirm = "Registration is successed"
                        window.location.reload();
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            successful: false,
                            message: resMessage
                        });
                    }
                );
            }
        }
        else {
            this.state.errorconfirm = "passwords should be equal"
        }

    }

    render() {
        return (
            <div className="col-md-12 authform">
                <div >

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password Confirm</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.passwordConfirm}
                                        onChange={this.onChangePasswordConfirm}
                                        validations={[required]}
                                    />
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorconfirm}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>

                            </div>

                        )}

                        <div variant="filled" severity="success" className="success" role="alert" >{this.state.accesconfirm}</div>

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />


                    </Form>
                </div>
                <button className="btn btn-primary btn-block" onClick={e => this.handleLogin()  }>
                    <span>Already have an account?</span>
                </button>
            </div>
        );
    }
}
export default withRouter(Register);