import React from 'react';
import { Image } from 'react-bootstrap';
import {Outlet, useNavigate} from 'react-router-dom';
import settingImage from '../assets/images/setting.svg';
import logout from '../assets/images/logout.svg';
export default function Layout() {
    // const navigae = useNavigate();
    function rediractTo(){
        localStorage.removeItem('music-token');
        location.reload();
    }
    return (
        <div className='layout-main-wrapper align-items-lg-start position-relative d-flex h-100 min-vh-100'>
            <ul className="side-nave-bar m-0 p-0">
                <li className='fs-36 primary fw-bold'>Logo</li>
                <li className='active fs-14 fw-normal blue-189'> <Image src={settingImage} className='' alt='icon'/> Setting</li>
              <li onClick={rediractTo}><Image src={logout} alt='icon'/> Log Out</li>
            </ul>
            <div className="layout-right-main-wrapper">
                <Outlet/>
            </div>
        </div>
    )
}
