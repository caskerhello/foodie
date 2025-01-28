// userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import {Cookies} from 'react-cookie'
const cookies = new Cookies()

const initialState={
    memberid:'',
    nickname:'',
    email:'',
    
    phone:'',
    provider:'',

    profileimg:'',
    profilemsg:'',    
    snsid:'',
    
    accessToken:'',
    refreshToken:'',

}


const getLoginUser=()=>{
    const memberinfo = cookies.get('user')
    if( memberinfo && memberinfo.email ){
        memberinfo.memberid = decodeURIComponent( memberinfo.memberid )
        memberinfo.nickname = decodeURIComponent( memberinfo.nickname )
        memberinfo.email = decodeURIComponent( memberinfo.email )

        
        memberinfo.phone = decodeURIComponent( memberinfo.phone )
        memberinfo.provider = decodeURIComponent( memberinfo.provider )
        memberinfo.profileimg = decodeURIComponent( memberinfo.profileimg )
        memberinfo.profilemsg = decodeURIComponent( memberinfo.profilemsg )
        
        memberinfo.snsid = decodeURIComponent( memberinfo.snsid )

        memberinfo.accessToken = decodeURIComponent( memberinfo.accessToken )
        memberinfo.refreshToken = decodeURIComponent( memberinfo.refreshToken )

    }
    return memberinfo
}

export const userSlice=createSlice(
    {
        name:'user',
        initialState : getLoginUser()  || initialState,
        reducers:{
            loginAction:(state, action)=>{
                state.memberid = action.payload.memberid;
                state.email = action.payload.email;
                state.nickname = action.payload.nickname;
                state.phone = action.payload.phone;
                state.profilemsg = action.payload.profilemsg;
                state.profileimg = action.payload.profileimg;
                state.provider = action.payload.provider;
                state.snsid = action.payload.snsid;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            },
            logoutAction:(state)=>{
                state.memberid = '';
                state.email = '';
                state.nickname = '';
                state.phone = '';
                state.profilemsg = '';
                state.profileimg = '';
                state.provider = '';
                state.snsid = '';
                state.accessToken = '';
                state.refreshToken = '';


            
            },
            
        }
    }
)
export const { loginAction, logoutAction} = userSlice.actions
export default userSlice.reducer
