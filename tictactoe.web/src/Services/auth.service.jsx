import axios from "axios";

const API_URL = process.env.SERVER_API_URL

class AuthService {
    login(username, password) {
        console.log(username, password)
        return axios
            .post( `${process.env.SERVER_API_URL}/api/Auth/BearerToken`, {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, password) {
        console.log(username, password)
        return axios.post(API_URL + "/api/Auth/registration", {
            username,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();