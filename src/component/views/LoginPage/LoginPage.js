import React, { useState } from 'react';
import { Typography, Input, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../_actions/user_action";
import {withRouter} from 'react-router-dom';
const { Title } = Typography;

function LoginPage(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const body = {
            email:email,
            password:password
        }

        dispatch(userLogin(body))
            .then(response=> {
                if(response.payload.success) {
                    window.localStorage.setItem('userId', response.payload.memberId)
                    props.history.push('/');
                }else {
                    alert('로그인 실패');
                }
            })
    }

    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',
            alignItems:'center', width:'100%', height:'100vh'}}>
            <div style={{maxWidth:'700px', margin:'3rem auto'}}>
                <Title level={1}>Login</Title>
            </div>
            <Form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <Input value={email} onChange={onEmailHandler}></Input>
                <br/>

                <label>Password</label>
                <Input type="password" value={password} onChange={onPasswordHandler}></Input>
                <br/>
                <br/>

                <Button onClick={onSubmitHandler}>Login</Button>
            </Form>
        </div>
    );
}

export default withRouter(LoginPage);