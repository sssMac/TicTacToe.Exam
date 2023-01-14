import axios from "axios";

const API_URL = "https://localhost:7016"

class AuthService {

    login(username, password) {
        console.log(process.env.SERVER_API_URL)
        console.log(username, password)
        const formData = new FormData();
        formData.append("userName", username);
        formData.append("password", password);
        return axios
            .post( API_URL + '/api/Auth/BearerToken', formData)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
    }

    register(username, password) {
        console.log(username, password)
        const formData = new FormData();
        formData.append("userName", username);
        formData.append("password", password);
        console.log(formData)
        return axios.post(API_URL + "/api/Auth/registration", formData)
            .then((res => {
                console.log(res)
            }));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();