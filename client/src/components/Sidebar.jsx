import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiList } from 'react-icons/fi';
import { MdOutlinePersonOutline, MdPayment } from 'react-icons/md';

import { logo } from '../assets';

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(0);
    const handleLinkClick = (index) => {
        setActiveLink(index);
    };

    const SIDEBAR_LINKS = [
        { id: 1, path: "/Beranda", name: "Beranda", icon: FiHome },
        { id: 2, path: "/Kehadiran", name: "Kehadiran", icon: FiCheckCircle },
        { id: 3, path: "/ManajemenTugas", name: "Manajemen Tugas", icon: FiList },
        { id: 4, path: "/Penggajian", name: "Penggajian", icon: MdPayment },
        { id: 5, path: "/Profile", name: "Profile", icon: MdOutlinePersonOutline },
    ];

    return (
        <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>
            <div>
                <img src={logo} alt="logo" className='w-28 hidden md:flex ml-5' />
            </div>
            <ul className='mt-6 space-y-6'>
                {SIDEBAR_LINKS.map((link, index) => (
                    <li 
                        key={index} 
                        className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-100 text-indigo-500" : ""}`}
                    >
                        <Link to={link.path} className='flex justify-center md:justify-start md:space-x-4' onClick={() => handleLinkClick(index)}>
                            <span>{link.icon()}</span>
                            <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
