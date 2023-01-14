import React, {Component} from "react";
import Button from "@mui/material/Button";
import {withRouter} from "../../Common/with-router";

class Join extends Component {
    constructor(props) {
        super(props);
    }

    handleJoin(){
        console.log(this.props.id)
        this.props.router.navigate("/game/"+String(this.props.id));
    }

    render() {
        return(
            <Button variant="contained" onClick={e => this.handleJoin()}>Join</Button>
        )

    }
}
export default withRouter(Join);