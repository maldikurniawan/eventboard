import React, { Fragment, useRef } from "react";
import Menu from "./Menu";

interface SidebarProps {
    sideOpen: boolean;
    setSideOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sideOpen, setSideOpen }) => {
    const scrollbarContainer = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Fragment>
            <div className="bg-black">
                <div
                    onClick={() => setSideOpen(!sideOpen)}
                    className={`z-50 fixed w-screen h-screen md:hidden ${sideOpen ? "block" : "hidden"}`}
                ></div>

                <div
                    ref={ref}
                    className={`z-50 fixed md:relative h-screen flex flex-col bg-black border-r border-r-[#0F0] backdrop-blur-xl text-white transition-all duration-300 ease-in-out ${sideOpen
                        ? "w-[16rem] translate-x-0"
                        : "w-0 translate-x-[-100%]"}`
                    }
                >
                    <div className={`w-[90%] items-center cursor-pointer gap-1 mx-auto flex border-b-2 leading-[60px] text-left border-[#0F0] ${sideOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out`}>
                        {/* <img
                            src="/images/anonymous.png"
                            alt="Anonymous"
                            className="w-10 h-10"
                        /> */}
                        <span>
                            Anonymous
                        </span>
                    </div>

                    <div
                        ref={scrollbarContainer}
                        className="relative flex-1 overflow-auto scroll-hidden"
                    >
                        <Menu sideOpen={sideOpen} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Sidebar;
