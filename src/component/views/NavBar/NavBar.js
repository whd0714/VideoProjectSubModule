import React, { useState } from 'react';

import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import './NavBar.css';
import { PlaySquareFilled, MenuOutlined, HomeFilled, VideoCameraFilled, HistoryOutlined } from '@ant-design/icons';
import {Input, Layout, Menu} from 'antd';
import Sider from "antd/lib/layout/Sider";

const { Search } = Input;


function NavBar(props) {

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const onSearch = () => {

    }

    return (
       <div>
           <div style={{display:'flex', alignItems:'center'}}>
               <div className="left_menu_container" style={{padding:'31px 20px', backgroundColor:'white'}}>
                   <MenuOutlined onClick={handleCollapsed} />
               </div>

               <div className="menu_container" style={{width:'100%', zIndex:5, display:'flex',
                   alignItems:'center', justifyContent:'space-between'}}>
                   {/*<div className="logo">
                <a href="/">Logo</a>
            </div>*/}


                   <div className="menu-logo" >
                       <a href="/" style={{display:'flex', alignItems:'center'}}>
                           <PlaySquareFilled style={{fontSize:'30px', color:'red'}} />
                           <span>
                        MyTube
                    </span>
                       </a>
                   </div>

                   <div>
                       <Search placeholder="검색" allowClear onSearch={onSearch} style={{ width: '640px' }} />
                   </div>

                   <div className="menu-right">
                       <RightMenu mode="horizontal"/>
                   </div>
                   {/*  <div className="menu-box">
                <div className="menu-left">
                    <LeftMenu mode="horizontal"/>
                </div>


            </div>*/}


               </div>
           </div>

       </div>


    );
}

export default NavBar;