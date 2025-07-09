import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* Left Side */}
                <div>
                    <div className="logo flex items-center cursor-pointer">
                        <img className="w-12" src={assets.logo1} alt="MediSync Logo" />
                        <div className="flex">
                            <span className="text-[#1D8BCC] text-2xl font-bold">Medi</span>
                            <span className="text-[#45C8BA] text-2xl font-bold">Sync</span>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-6 w-full sm:max-w-lg md:max-2/3">
                    MediSync is an integrated healthcare platform designed to streamline doctor booking and connect patients with various medical services through a user-friendly web and app interface. It allows users to book appointments with doctors across multiple specialties, such as cardiology, pediatrics, or orthopedics, by selecting from categorized lists tailored to their needs.
                    </p>
                </div>

                {/* Center */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li className="hover:text-[#1D8BCC] transition-colors cursor-pointer">Home</li>
                        <li className="hover:text-[#1D8BCC] transition-colors cursor-pointer">About us</li>
                        <li className="hover:text-[#1D8BCC] transition-colors cursor-pointer">Contact us</li>
                        <li className="hover:text-[#1D8BCC] transition-colors cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Side */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li className="hover:text-[#1D8BCC] transition-colors cursor-pointer">+1-212-456-7890</li>
                        <li className="hover:text-[#1D8BCC] transition-colors cursor-pointer">medisync@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* Copyright Section */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    Copyright © 2025 MediSync - All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;