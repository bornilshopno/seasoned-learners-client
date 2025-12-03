import React from 'react';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router';

const Dashboard = () => {
    return (
        <div className='flex'>
            <div className="menu min-h-screen bg-primary text-white" >
                <SideMenu />
            </div>
            <div className="outlet flex-1 min-h-screen" >
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;