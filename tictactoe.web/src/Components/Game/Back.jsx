import React, {Component} from "react";
import Button from "@mui/material/Button";
import {withRouter} from "../../Common/with-router";

class Back extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout(){
        this.props.router.navigate('/rooms');
        window.location.reload();
    }

    render() {
        return(
            <Button  variant="outlined" onClick={e => this.handleLogout()}>Back to Rooms</Button>
        )

    }
}
export default withRouter(Back);