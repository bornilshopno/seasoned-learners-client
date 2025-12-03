import React from 'react';
import dummy from "../../assets/Sl-Logo.png"
import useAuth from '@/hooks/useAuth';
import { navLinkClasses } from '../utilities/RepeatFunction';
import { DiamondPlus, Power } from 'lucide-react';
import { NavLink } from 'react-router';

const SideMenu = () => {
    const { user, userLogOut } = useAuth()

    const handleLogout = () => {

    }
    return (
        <div className=' flex flex-col justify-between lg:h-screen sticky top-0 2xl:col-span-4 bg-gray-950 '>

            {/* fixed logo area  */}
            <div className=' flex items-center gap-4 pb-2 border-b-2 border-gray-400 m-2 pl-2'>
                <div className=' rounded-md bg-primary'>
                    <img src={dummy} className='w-16 h-16 object-cover rounded-sm bg-white' />
                </div>
                <div>
                    <p className='font-bold text-base'>{user?.email}</p>
                    <p className='font-bold text-xs pb-1 '>
                        Admin
                    </p>
                    <div className='flex justify-start'>
                        <button type='button'
                            onClick={handleLogout}
                            className={`p-1 pr-2 flex items-center gap-1 bg-primary justify-start rounded-sm text-sm font-medium  transition-all duration-200 hover:bg-white hover:text-primary hover:cursor-pointer active:bg-white active:text-blue-700`}
                        >
                            <Power className="h-3 w-3" />
                            Sign Out
                        </button>


                    </div>
                </div>


            </div>




            {/* for redirecting purpose */}
       
                <div className="space-y-1 h-[calc(100dvh-200px)]">
                    <NavLink to="/dashboard/overview" end className={navLinkClasses}>
                        <DiamondPlus  className="text-xl" />
                        <span>Overview</span>
                    </NavLink>

                    <NavLink to="/dashboard/add-blog" end className={navLinkClasses}>
                        <DiamondPlus className="text-xl" />
                        <span>Add Blog</span>
                    </NavLink>   
                

                    <NavLink to="/dashboard/profile-setting" end className={navLinkClasses}>
                        <DiamondPlus  className="text-xl" />
                        <span>Profile & Setting</span>
                    </NavLink>

                    <NavLink to="/dashboard/activity-log" end className={navLinkClasses}>
                        <DiamondPlus  className="text-xl" />
                        <span>Activity Log</span>
                    </NavLink>
                </div>
        



            <div className='border  bg-white text-gray-800 m-2 rounded-md  '>

                <div className='flex items-end justify-center gap-2 pr-3'>
                    <img src={dummy} className=' w-14 h-14 rounded-xl object-cover' />
                    <p className='text-xl font-bold text-primary'>Seasoned Learners</p>

                </div>

            </div>



        </div>
    );
};

export default SideMenu;