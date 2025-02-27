import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'SESSIONauth';


class AuthenticationService{

    executeJWTAuthenticationService(Users){
        return axios.post(`${API_URL}/appUsers/signin`, Users );
    }

    authHeader(){
        const JwtToken = sessionStorage.getItem('SESSIONauth');
        if(JwtToken)
            return {Authorization: this.createJWTAuthToken(JwtToken)};
        else
            return {};
    }

    getUserRoles(){
        
    }

    createJWTAuthToken(token){
        return 'Bearer ' + token;
    }

    registerSuccessfulLogin(token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, token)
        this.setupAxiosInterceptors(this.createJWTAuthToken(token))
        return true;
    }
    
    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) 
            return false;
        return true;
    }
    
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }
    
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.Authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService();