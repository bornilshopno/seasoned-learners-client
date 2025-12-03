import { Button } from '@/components/ui/button';
import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className=''>
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;