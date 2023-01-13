import React from 'react';
import RoomsTable from "../Components/Room/RoomsTable";
import AuthService from "../Services/auth.service";

const Rooms = () => {
    console.log(AuthService.getCurrentUser());
    return (
        <RoomsTable/>
    );
};

export default Rooms;