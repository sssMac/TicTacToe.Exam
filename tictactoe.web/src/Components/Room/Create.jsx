import React, {Component} from "react";
import Button from "@mui/material/Button";
import {withRouter} from "../../Common/with-router";

class Create extends Component {
    constructor(props) {
        super(props);
    }

    handleCreate(){
        this.props.router.navigate("/roomcreate");
    }

    render() {
        return(
            <Button  variant="contained" onClick={e => this.handleCreate()}>Create</Button>
        )

    }
}
export default withRouter(Create);