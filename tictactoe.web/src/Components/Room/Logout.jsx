import React, {Component} from "react";
import Button from "@mui/material/Button";
import {withRouter} from "../../Common/with-router";
import AuthService from "../../Services/auth.service";

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout(){
        AuthService.logout();
        this.props.router.navigate('/login');
        window.location.reload();
    }

    render() {
        return(
            <Button  variant="outlined" onClick={e => this.handleLogout()}>Logout</Button>
        )

    }
}
export default withRouter(Logout);