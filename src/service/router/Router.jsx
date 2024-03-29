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
import TechnicalSpecialist from "../../scene/main/TechnicalTasks";
import TechnicalMain from "../../scene/main/TechnicalMain";
import Orders from "../../scene/main/TechnicalOrders";
import OrderBoard from "../../scene/main/OrderBoard";
import TechnicalIncidents from "../../scene/main/TechnicalIncidents";
import Messages from "../../scene/main/Messages";
import Dialogs from "../../scene/main/Dialogs";
import SkillModel from "../../scene/main/SkillModel";

function Router() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/profile/myFriends" element={<Friends/>}/>
                <Route path="/profile/allPerson" element={<People/>}/>
                <Route path="/profile/moving/task" element={<Tasks/>}/>
                <Route path="/profile/incidents" element={<OrderBoard/>}/>
                <Route path="/work/incidents/addIncidents" element={<TechnicalIncidents/>}/>
                <Route path="/work/tasks" element={<TechnicalSpecialist/>}/>
                <Route path="/work" element={<TechnicalMain/>}/>
                <Route path="/work/incidents" element={<Orders/>}/>
                <Route path="/profile/questionnaire" element={<Questionnaire/>}/>
                <Route path="/profile/requests" element={<Requests/>}/>
                <Route path="/profile/skillModel" element={<SkillModel/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/dialogs" element={<Dialogs/>}/>
                <Route path="/profile/messages" element={<Messages/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;