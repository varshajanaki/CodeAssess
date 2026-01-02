import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/userSlice';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const currentUser = localStorage.getItem('userType');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const toggleButton = document.getElementById('navbar-toggle');
        const navbarMenu = document.getElementById('navbar-default');

        const handleToggle = () => {
            navbarMenu.classList.toggle('hidden');
        };

        toggleButton.addEventListener('click', handleToggle);

        return () => {
            toggleButton.removeEventListener('click', handleToggle);
        };
    }, []);

    const handleLogout = () => {
        dispatch(signOut());
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    return (
        <nav className="bg-black border-borderColor">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link className="flex items-center space-x-3 rtl:space-x-reverse" to="/">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-primaryText">CodeAssess</span>
                </Link>
                <Button asChild>
                    <button id="navbar-toggle" data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primaryText rounded-lg md:hidden hover:bg-borderColor focus:outline-none focus:ring-2 focus:ring-borderColor" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </Button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-borderColor rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {currentUser ? (
                            <li>
                                <span className="block py-2 px-3 text-primaryText">
                                    {currentUser === 'teacher' ? 'Logged in as Teacher' : 'Logged in as Student'}
                                </span>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Button onClick={() => navigate('/studentlogin')} className="block py-2 px-4 w-32 bg-white text-buttonText rounded-full hover:bg-borderColor md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0">
                                        Student Login
                                    </Button>
                                </li>
                                <li>
                                    <Button onClick={() => navigate('/adminlogin')} className="block py-2 px-4 w-32 bg-white text-buttonText rounded-full hover:bg-borderColor md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0">
                                        Admin Login
                                    </Button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                {currentUser && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="ml-3 py-2 px-4 w-32 bg-white text-black rounded-full border border-gray-400 hover:bg-black hover:text-white">
                                Menu
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black text-primaryText mt-2 rounded-lg shadow-lg w-32">
                            <DropdownMenuItem onClick={handleLogout} className="hover:bg-buttonBg hover:text-buttonText rounded-b-lg">
                                <span className="block py-2 px-4">Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
