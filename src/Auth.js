import axios from 'axios';
import router from "@/router";

class Auth {
    constructor () {
        this.token = window.localStorage.getItem('token');
        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;

        if (this.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }else{
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNWIwMzg5NGQwNjA3NGJjMzVkZmM3YzliMzc2NTYxNjM5NWFiODkyYTQ0NGRiODA3MTFkZDhiODIzNjM5YTZlYzQzOTNjZjAyZjBmYzNhZDMiLCJpYXQiOjE2NjMzNDE3ODQuMzczMDU3LCJuYmYiOjE2NjMzNDE3ODQuMzczMDYzLCJleHAiOjE2OTQ4Nzc3ODQuMzEwNjgxLCJzdWIiOiI0NyIsInNjb3BlcyI6W119.Qn9IOu9FFoKeg6WQl_coTm9lxi3EV6s4L0gYix_Ug_4r4COr6iY4ALhNBByjO_-gz15cj0hqSuMQs3y7yxSn6ZThmQkO2buAIVX-na_1iarbvJ2lJrjFh6UvuDtPhRb1Bl5ViBKq3saFE9FsMT_8jSaUNJKaUAWa5RyZz3lT4KyPJl9aNY72cVnSVHR8NJaIWIMsANvzTsJj5fKQSnxhYC2vRk0SMvdX_DxX-WCUNodqEn8X2mQ2WA-iCuRU48M4t4LpswjvMogUCho-ydXMrbwKDu9xVr_IXqFBKC0wZw42PMx3-4OTHhv8gwslRgo1kgEGuNefVJcLZNkb_nC4FOLF4bLOHVX3oC_NVQ2RQ8yIUCfJ_oEqTLDLMKi3M0wKK26A8h8hD9dIuZnM2T3wIjTtJXfoNiow6rZ8kFiPetYA9PbsmS0hgRyFtDNP9-VIzG8slCHV03vSAqs49aFmvD4a57jru4LbPtbTrtRQfCyEYhr4dGB0G_DAhLkQa-qd2bgBR4RDpR8hzMUrMr8SuijKU3p-Tf8rPXxFO5u9wQFnRVFQX2IVKILun5aqJaN9TGs5b2c8nv5d44t-uGWepyBqBBCnffXh0GUYDh72QMgkBp1Qj5TjAY6KeP10OwwDPDbHMUvEYccAwj9-X7VGHrhiEwrr-WTAXwsDWfBAG6w"
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