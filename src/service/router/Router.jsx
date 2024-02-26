import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Registration from "../../scene/registration/Registration";
import Authorization from "../../scene/athorization/Authorization";
import Profile from "../../scene/main/Profile";
import Friends from "../../scene/main/Friends";
import People from "../../scene/main/People";
import Requests from "../../scene/main/Request";
import Tasks from "../../scene/main/Tasks";
import Questionnaire from "../../scene/main/Questionnaire";
function Router() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/profile/myFriends" element={<Friends/>}/>
                <Route path="/profile/allPerson" element={<People/>}/>
                <Route path="/profile/moving/task" element={<Tasks/>}/>
                <Route path="/profile/questionnaire" element={<Questionnaire/>}/>
                <Route path="/profile/requests" element={<Requests/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;