import './App.css';
import {  Routes, Route, ScrollRestoration } from "react-router-dom";
import ScrollToTop from './Component/ScrollToTop';

import Login from './Component/Login';
import Main from './Component/Main';
import Join from './Component/member/Join';
import WritePost from './Component/post/WritePost';
import PostOne from './Component/post/PostOne';
import MyPage from './Component/member/MyPage';
import EditProfile from './Component/member/EditProfile';
import GetPlace from './Component/place/GetPlace';
import GetCategoryPlace from './Component/place/GetCategoryPlace';
// import Kakaosaveinfo from './Component/member/Kakaosaveinfo';
// import MemberPage from './Component/member/MemberPage';

// import Postone from './Component/post/Postone';

function App() {
  return (
    <div className="App" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            
            
            <Routes>
            
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
               
                <Route path="/writePost" element={<WritePost />} />

                <Route path="/myPage" element={<MyPage />} />

                <Route path="/join" element={<Join />}></Route>

                <Route path="/editProfile" element={<EditProfile />} />

                <Route path="/postOne/:postid" element={<PostOne />} />

                <Route path="/getPlace/:searchPlace" element={<GetPlace />} />

                <Route path="/getCategoryPlace/:category" element={<GetCategoryPlace />} />

                
                
                {/* <Route path="/join" element={<Join />} />
                <Route path="/main" element={<Main />} />
                <Route path="/writePost" element={<WritePost />} />
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/postone/:postid" element={<Postone />} />
                <Route path="/kakaosaveinfo" element={<Kakaosaveinfo />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/memberPage/:membernick" element={<MemberPage />} /> */}
        
            </Routes>
           
            
        </div>
  );
}

export default App;
