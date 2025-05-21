import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { containerClass } from "../utils/classes";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="bg-gray-900 text-white">
            <div className={containerClass + " flex justify-between items-center py-4 px-2"}>

                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:underline">Delivery Management system</Link>
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline">Dashboard</Link>
                    <Link to="/open-request" className="hover:underline">Open a Delivery Request</Link>
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col justify-center items-center space-y-6 text-xl">
                    <button
                        className="absolute top-4 right-4 p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close Menu"
                    >
                        <X className="w-7 h-7" />
                    </button>
                    <>
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">Dashboard</Link>
                        <Link to="/open-request" onClick={() => setIsOpen(false)} className="hover:underline">Open a Delivery Request</Link>
                    </>
                </div>
            )}
        </header>
    );
}
