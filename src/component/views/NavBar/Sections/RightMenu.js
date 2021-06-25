import React from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import { Menu, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { UploadOutlined } from "@ant-design/icons";

function RightMenu(props) {
    const user = useSelector(state => state.user)


    const logoutHandler = () => {
        axios.get('/api/logout')
            .then(response=>{
                if(response.data.success) {
                    props.history.push('/login');
                    localStorage.removeItem("userId")
                } else {
                    alert('로그아웃 실패')
                }
            })
    }

    if(user.auth){
        if(!user.auth.data.success) {
            return (
                <Menu mode={props.mode} style={{border:'none'}}>
                    <Menu.Item key="login">
                        <a href="/login">Signin</a>
                    </Menu.Item>
                    <Menu.Item key="app">
                        <a href="/register">Signup</a>
                    </Menu.Item>
                </Menu>
            )
        } else {

            return (
                <Menu mode={props.mode} style={{width:'150px',border:'none'}}>
                    <Menu.Item key="videoUpload">
                        <a href="/video/upload">
                            <UploadOutlined></UploadOutlined>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="mail">
                        <a onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </Menu>
                /*<Menu mode={props.mode}>
                    <Menu.Item key="logout">
                        <a onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </Menu>*/
            )
        }

    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="login">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);