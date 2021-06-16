import React from 'react';
import {Menu} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
    return (
        <div>
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item key="subscription">
                    <a href="/subscription">Subscription</a>
                </Menu.Item>
                <Menu.Item key="videoUpload">
                    <a href="/video/upload">
                        <UploadOutlined></UploadOutlined>
                    </a>
                </Menu.Item>
             {/*   <SubMenu title="menu1" key="app">
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting1">Option1</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>*/}
            </Menu>
        </div>
    );
}

export default LeftMenu;