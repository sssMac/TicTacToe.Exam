import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://localhost:7016"

class UserService {
    getRooms() {
        return axios.get(API_URL + '/api/Game/rooms');
    }

    createRoom(minRating,hostName) {
        console.log(minRating,hostName)
        const formData = new FormData();
        minRating = parseInt(minRating)
        formData.append("minRating", minRating);
        formData.append("hostName", hostName);
        return axios.post("https://localhost:7016/api/Game/createroom",formData);
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    postMessage(userName,text,host){
        const formData = new FormData();
        formData.append("from", userName);
        formData.append("message", text);
        formData.append("host", host);
        return axios.post(API_URL + `/api/Game/postmessage`, formData);
    }

    setWinner(userName, groupName, roomId){
        const formData = new FormData();
        formData.append("userName", userName);
        formData.append("groupName", groupName);
        formData.append("roomId", roomId);
        return axios.post(API_URL + `/api/Game/setwinner`, formData);
    }

    getRating(userName) {
        return axios.get(API_URL + '/api/Game/rating' , {params: {userName : userName}});
    }

}

export default new UserService();