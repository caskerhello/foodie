// jwtUtil.js
import axios from "axios";
import { setCookie , getCookie } from "./cookieUtil";
const jaxios = axios.create();

// axios를 이용해서 요청(request)전에 실행될 함수(요청전 설정)
const beforeReq = async (config)=>{
    let currentUser = getCookie('user');
    const Header = { headers:{'Authorization' : `Bearer ${currentUser.accessToken}` } }
    const res = await axios.get(`/api/member/refresh/${currentUser.refreshToken}`, Header )
    
    currentUser.accessToken = res.data.accessToken;
    currentUser.refreshToken = res.data.refreshToken;

    setCookie('user', JSON.stringify(currentUser))
    
    const { accessToken } = currentUser;
    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
}

const beforeRes=(res)=>{
    return res;
}

const requestFail=(err)=>{ }
const responseFail=(err)=>{ }

jaxios.interceptors.request.use( beforeReq, requestFail );
jaxios.interceptors.response.use( beforeRes, responseFail)

export default jaxios;