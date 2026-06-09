import React from 'react';
import Banner from './Banner';
import FreeResources from './FreeResources';
import HeroSection from './HeroSection';

const Home = () => {
    return (
        <div>
            <HeroSection />
            {/* <Banner/> */}
            <FreeResources />

        </div>
    );
};

export default Home;