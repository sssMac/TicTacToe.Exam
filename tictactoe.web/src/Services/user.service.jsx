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
}

export default new UserService();