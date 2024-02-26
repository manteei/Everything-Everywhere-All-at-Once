import React, {useEffect, useState} from 'react';
import Layout from "../../layout/Layout";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import TextInput from "../../stories/TextInput";
import CustomButton from "../../stories/CustomButton";
import {useNavigate} from "react-router-dom";
import {checkAuthorization} from "../../service/functions/validation";
import {connect} from "react-redux";
import {login, offRedirect} from "../../service/reducer/actions";
import CatLayout from "../../layout/CatLayout";

const useStyles = makeStyles({
    mainBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 60px)",
    },
    formBox: {
        background: "white",
        marginBottom: 100,
        paddingTop: "48px",
        width: "450px",
        "@media screen and (max-width:720px)": {
            width:"275px",
        },
        padding: "20px",
        border: "2px solid pink",
        borderRadius: "20px",
        boxShadow: "5px 5px 20px gray",
    }
});

function Authorization(props) {
    const classes = useStyles()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin() {
        props.login({
            login: login,
            password: password
        })
    }

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/profile")
        }
    }, [])

    useEffect(() => {
        if (props.isRedirect) {
            navigate("/profile")
            localStorage.setItem("user", login)
            props.offRedirect()
        }
    }, [props.isRedirect])

    return (
        <Layout>
            <div className={classes.mainBox}>
                <CatLayout>
                    <div className={classes.formBox}>
                        <Typography align={"center"}
                                    style={{fontSize: 22, marginTop: 16, fontWeight: "bold"}}>Авторизация</Typography>
                        <div style={{height: 80}}>
                            <TextInput min={6} max={20}
                                       help={"Логин должен быть от 6 до 20 символов латинскими буквами"}
                                       p={16} value={login} setValue={setLogin} type={"text"} label={"Логин"}/>
                        </div>
                        <div style={{height: 80}}>
                            <TextInput password min={6} max={20}
                                       help={"Пароль должен быть от 6 до 20 символов латинскими буквами"}
                                       p={16} value={password} setValue={setPassword} type={"password"}
                                       label={"Пароль"}/>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-end", marginTop: 32}}>
                            <CustomButton disabled={checkAuthorization(login, password)}
                                          action={handleLogin} p={8} title={"Войти"}/>
                            <CustomButton action={() => navigate("/registration")} p={8} title={"Регистрация"}/>
                        </div>
                    </div>
                </CatLayout>
            </div>
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    ...state.app
})

export default connect(mapStateToProps, {
    login,
    offRedirect
})(Authorization);