import './App.css';
import {  Routes, Route, ScrollRestoration } from "react-router-dom";

import Login from './Component/Login';
import Main from './Component/Main';
import FindPassword from './Component/member/FindPassword';
import SetNewPassword from './Component/member/SetNewPassword';
import Join from './Component/member/Join';
import MyPage from './Component/member/MyPage';
import EditProfile from './Component/member/EditProfile';
// import Kakaosaveinfo from './Component/member/Kakaosaveinfo';

import WritePost from './Component/post/WritePost';
import PostOne from './Component/post/PostOne';
import GetPlaceByName from './Component/place/GetPlaceByName';
import GetPlaceByCategory from './Component/place/GetPlaceByCategory';
import MeetingList from './Component/meeting/MeetingList';

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/findPassword" element={<FindPassword />} />
                <Route path="/setNewPassword" element={<SetNewPassword />} />
                <Route path="/join" element={<Join />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/editProfile" element={<EditProfile />} />
              
                <Route path="/writePost" element={<WritePost />} />
                <Route path="/postOne/:postid" element={<PostOne />} />
                <Route path="/getPlaceByName/:searchPlace" element={<GetPlaceByName />} />
                <Route path="/getPlaceByCategory/:category" element={<GetPlaceByCategory />} />
                <Route path="/meeting" element={<MeetingList />} />
            </Routes>
        </div>
  );
}

export default App;
