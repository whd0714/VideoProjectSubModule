import React,{ useState } from 'react';
import { useDispatch } from "react-redux";
import { Input, Form, Typography, Button, message} from "antd";
import {userRegister} from "../../../_actions/user_action";

const { Title } = Typography;

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.currentTarget.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(password != confirmPassword) {
            alert('비밀번호가 일치하지않습니다.')
        }

        let body = {
            name:name,
            email:email,
            password:password
        }

        dispatch(userRegister(body))
            .then(response=>{
                if(response.payload.success) {
                    message.success('회원가입완료');
                    setTimeout(()=>{
                        props.history.push('/')
                    },2500)
                } else {
                    alert('회원가입 실패')
                }
            })
    }


    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            <div style={{maxWidth:'700px', margin:'3rem auto'}}>
                <Title>Register</Title>
            </div>
            <Form onSubmit={onSubmitHandler} style={{display:'flex', flexDirection:'column'}}>
                <label>Name</label>
                <Input value={name} onChange={onNameHandler}></Input>
                <br/>

                <label>Email</label>
                <Input value={email} onChange={onEmailHandler}></Input>
                <br/>

                <label>Password</label>
                <Input type="password" value={password} onChange={onPasswordHandler}></Input>
                <br/>

                <label>ConfirmPassword</label>
                <Input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}></Input>
                <br/>
                <br/>
                <Button onClick={onSubmitHandler}>Register</Button>
            </Form>
        </div>
    );
}

export default RegisterPage;