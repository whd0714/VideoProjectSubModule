import React from 'react';
import {Menu} from 'antd';
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
    return (
        <div>
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/">Home</a>
                </Menu.Item>
                <SubMenu title="menu1" key="app">
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting1">Option1</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default LeftMenu;