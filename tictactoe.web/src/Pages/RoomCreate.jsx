import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "../Styles/Auth.css"
import Alert from '@mui/material/Alert';

import UserService from "../Services/user.service";
import "../Styles/Register.css";
import { withRouter } from '../Common/with-router';

import { isInt } from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const number = value => {
    if (!isInt(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a number
            </div>
        );
    }
};



class RoomCreate extends Component {
    constructor(props) {
        super(props);
        this.onChangeMinRating = this.onChangeMinRating.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

        this.state = {
            minRating : ""
        };
    }

    onChangeMinRating(e) {
        this.setState({
            minRating: e.target.value
        });
    }




    handleCreate(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.state.errorconfirm = ""
            UserService.createRoom(
                this.state.minRating,
                localStorage.getItem('username')
            ).then(
                response => {
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

    render() {
        return (
            <div className="col-md-12 authform">
                <div >

                    <Form
                        onSubmit={this.handleCreate}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">MinRating</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="minRating"
                                        value={this.state.minRating}
                                        onChange={this.onChangeMinRating}
                                        validations={[required,number]}
                                    />
                                </div>


                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Create</button>
                                </div>

                            </div>

                        )}

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
            </div>
        );
    }
}
export default withRouter(RoomCreate);