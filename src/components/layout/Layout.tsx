import { Footer, Header, Sidebar } from "@/components";
import { showToast } from "@/utils/showToast";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
    const [sideOpen, setSideOpen] = useState<boolean>(true);
    const location = useLocation();

    const toastShown = useRef(false);

    useEffect(() => {
        if (location.state?.loginSuccess && !toastShown.current) {
            showToast("Login successful. Welcome back!", "success", 3000);
            toastShown.current = true;
        }
    }, [location.state]);

    useEffect(() => {
        setSideOpen(window.innerWidth >= 767);
    }, []);

    return (
        <Fragment>
            <div className="flex">
                <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
                <div className="w-full h-screen flex flex-col relative">
                    <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
                    <div className="bg-white h-full overflow-y-auto px-4 pb-4 text-black scroll-hidden">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;
