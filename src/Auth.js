import axios from 'axios';
import router from "@/router";

class Auth {
    constructor () {
        this.token = window.localStorage.getItem('token');
        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;

        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }
    login (token, user) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        this.token = token;
        this.user = user;
    }
    updateUser(user){
         window.localStorage.setItem('user', JSON.stringify(user));
         this.user = user;
    }
    check () {
        return !! this.token;
    }
    logout () {
        console.log("LOGOUT")
        window.localStorage.clear();
        router.push({ name: "LoginScreen" });
        //window.localStorage.removeItem('token');
        //window.localStorage.removeItem('user');
        //this.user = null;
        
    }
}
export default new Auth();