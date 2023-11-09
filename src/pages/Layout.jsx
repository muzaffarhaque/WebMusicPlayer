import React from 'react';
import { Image } from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import settingImage from '../assets/images/setting.svg';
export default function Layout() {
    return (
        <div className='layout-main-wrapper d-flex vh-100'>
            <ul className="side-nave-bar m-0 p-0">
                <li className='fs-36 primary fw-bold'>Logo</li>
                <li className='active fs-14 fw-normal blue-189'> <Image src={settingImage} className='' alt='icon'/> Setting</li>
            </ul>
            <div className="layout-right-main-wrapper">
                <Outlet/>
            </div>
        </div>
    )
}
