import React, {useState} from 'react';

import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import './NavBar.css';

function NavBar(props) {

    return (
        <div className="menu_container" style={{width:'100%', zIndex:5}}>
            {/*<div className="logo">
                <a href="/">Logo</a>
            </div>*/}
            <div className="menu-logo">
                <a href="/">LOGO</a>
            </div>
            <div className="menu-box">
                <div className="menu-left">
                    <LeftMenu mode="horizontal"/>
                </div>

                <div className="menu-right">
                    <RightMenu mode="horizontal"/>
                </div>
            </div>


        </div>
    );
}

export default NavBar;