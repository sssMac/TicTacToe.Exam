import React, {Component, useState} from "react";
import Button from "@mui/material/Button";
import {withRouter} from "../../Common/with-router";
import userService from "../../Services/user.service";
import Snackbar from '@mui/material/Snackbar';

class Join extends Component {



    constructor(props) {
        super(props);
    }

    async handleJoin(){



        console.log(this.props.room.id)
        console.log(this.props.room)
        var rating = 0
        var fetchRating = await userService.getRating(localStorage.getItem('username')).then(function (result){
            rating = result.data;
        });
        console.log(parseInt(this.props.room.minRating))
        console.log(parseInt(rating))
        if (rating  > parseInt(this.props.room.minRating)){
            this.props.router.navigate("/game/"+ String(this.props.room.id) + "/"+ String(this.props.room.hostName));
        }
        else{
            alert("Your rating is small")
        }
    }

    render() {
        return(
            <Button variant="contained" onClick={e => this.handleJoin()}>Join</Button>
        )

    }
}
export default withRouter(Join);