import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Drawer, Menu} from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import './NavBar.css';

function NavBar(props) {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (
        <div style={{width:'100%', position:'fixed'}}>
            {/*<div className="logo">
                <a href="/">Logo</a>
            </div>*/}
            <div className="menu-left">
                <LeftMenu mode="horizontal"/>
            </div>

            <div className="menu-right">
                <RightMenu mode="horizontal"/>
            </div>


        </div>
    );
}

export default NavBar;