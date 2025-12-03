import React from 'react';
import bg from "../../assets/bg-p.jpg"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
const Banner = () => {
    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: "center",
        }} className='h-100 bg-fixed'>

            {/* Dark Overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-black/50 h-80" /> */}

            <div className="relative z-10 flex h-full items-center justify-center text-center px-4 ">
                <div className="max-w-4xl space-y-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                        Let's Build Something Amazing
                    </h1>
                   <Button>
                     <Link to={"/resources"}>Expore Free Resources</Link > 
                   </Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;