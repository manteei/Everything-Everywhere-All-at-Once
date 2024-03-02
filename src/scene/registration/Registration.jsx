import React, {useEffect, useState} from 'react';
import Layout from "../../layout/Layout";
import {CircularProgress, IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import TextInput from "../../stories/TextInput";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../stories/CustomButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {connect} from "react-redux";
import {offRedirect, registration} from "../../service/reducer/actions";
import {checkRegistration} from "../../service/functions/validation";
import CatLayout from "../../layout/CatLayout";

const useStyles = makeStyles({
    mainBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 60px)"
    },
    formBox: {
        background: "white",
        marginBottom: 100,
        width: "450px",
        "@media screen and (max-width:720px)": {
            width:"275px",
            marginBottom: 50,
        },
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "5px 5px 20px gray",
    }
})

function Registration(props) {
    const [name, setName] = useState("")
    const [surname, setSurName] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [role, setRole] = useState('');
    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
    };
    const [secretCode, setSecretCode] = useState('');
    const classes = useStyles()
    const navigate = useNavigate();

    function handleRegistration() {
        props.registration({
            name: name,
            surname: surname    ,
            login: login,
            password: password,
            role: role,
            code: secretCode
        })
    }


    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/profile")
        }
    }, [])

    useEffect(() => {
        if (props.isRedirect) {
            navigate("/login")
            props.offRedirect()
        }
    }, [props.isRedirect])

    return (
        <Layout>
            <div className={classes.mainBox}>
                <CatLayout>
                    <div className={classes.formBox}>
                        <IconButton onClick={() => navigate(-1)}><ArrowBackIosIcon sx={{color: "pink"}}/></IconButton>
                        <Typography align={"center"}
                                    style={{fontWeight: "bold", fontSize: 22, marginTop: 16}}>Регистрация</Typography>

                        <div style={{height: 80}}>
                            <TextInput min={3} max={20}
                                       help={"Имя должно быть от 3 до 20 символов латинскими буквами"} p={16}
                                       value={name} setValue={setName} type={"text"} label={"Имя"}/>
                        </div>

                        <div style={{height: 80}}>
                            <TextInput min={3} max={20}
                                       help={"Фамилия должна быть от 3 до 20 символов латинскими буквами"} p={16}
                                       value={surname} setValue={setSurName} type={"text"} label={"Фамилия"}/>
                        </div>

                        <div style={{height: 80}}>
                            <TextInput min={6} max={20}
                                       help={"Логин должен быть от 6 до 20 символов латинскими буквами"} p={16}
                                       value={login} setValue={setLogin} type={"text"} label={"Логин"}/>
                        </div>
                        <div style={{height: 80}}>
                            <TextInput password min={6} max={20}
                                       help={"Пароль должен быть от 6 до 20 символов латинскими буквами"} p={16}
                                       value={password} setValue={setPassword} type={"password"} label={"Пароль"}/>
                        </div>
                        <div style={{height: 80}}>
                            <TextInput password p={16}
                                       value={repeatPassword} setValue={setRepeatPassword} type={"password"}
                                       label={"Подтверждение пароля"}/>
                        </div>

                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="Герой"
                                    name="role"
                                    value="Герой"
                                    checked={role === "Герой"}
                                    onChange={() => handleRoleChange("Герой")}
                                />
                                <label htmlFor="Герой">Герой</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="Координатор"
                                    name="role"
                                    value="Координатор"
                                    checked={role === "Координатор"}
                                    onChange={() => handleRoleChange("Координатор")}
                                />
                                <label htmlFor="Координатор">Координатор</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="Технический_специалист"
                                    name="role"
                                    value="Технический_специалист"
                                    checked={role === "Технический_специалист"}
                                    onChange={() => handleRoleChange("Технический_специалист")}
                                />
                                <label htmlFor="Технический_специалист">Технический специалист</label>
                            </div>
                        </div>
                        {role === "Технический_специалист" && (
                            <div style={{height: 80}}>
                                <TextInput
                                    p={16}
                                    value={secretCode} setValue={setSecretCode} type={"text"}
                                    label={"Секретный код"}
                                />
                            </div>
                        )}


                        <div style={{display: "flex", justifyContent: "flex-end", marginTop: 32}}>
                            <CustomButton w={200} disabled={checkRegistration(login, password, repeatPassword, role, secretCode)}
                                          action={handleRegistration} p={8} title={props.fetchingReg ?
                                <CircularProgress style={{color: "pink", width: 20, height: 20}}/> :
                                "Зарегестрироваться"
                            }/>
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
    registration,
    offRedirect
})(Registration);