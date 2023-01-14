import React, {Component} from "react";
import Button from "@mui/material/Button";
import {withRouter} from "../../Common/with-router";

class Join extends Component {
    constructor(props) {
        super(props);
    }

    handleJoin(){
        console.log(this.props.room.id)
        console.log(this.props.room)
        this.props.router.navigate("/game/"+ String(this.props.room.id) + "/"+ String(this.props.room.hostName));
    }

    render() {
        return(
            <Button variant="contained" onClick={e => this.handleJoin()}>Join</Button>
        )

    }
}
export default withRouter(Join);