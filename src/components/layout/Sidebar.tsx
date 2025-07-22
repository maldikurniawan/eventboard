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
            <div className="bg-[#1A1A1A]">
                <div
                    onClick={() => setSideOpen(!sideOpen)}
                    className={`z-50 fixed w-screen h-screen md:hidden ${sideOpen ? "block" : "hidden"}`}
                ></div>

                <div
                    ref={ref}
                    className={`z-50 fixed md:relative my-4 flex flex-col bg-[#333333] rounded-xl h-[calc(100vh-2rem)] border-r-2 border-[#1A1A1A] backdrop-blur-xl text-white transition-all duration-300 ease-in-out ${sideOpen
                        ? "w-[16rem] ml-4 translate-x-0"
                        : "w-0 translate-x-[-100%]"}`
                    }
                >
                    <div className={`w-[90%] items-center cursor-pointer gap-1 mx-auto flex border-b-2 leading-[54px] text-left border-[#BEBEBE] ${sideOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out`}>
                        <div className="text-xl font-black bg-[#1A1A1A] rounded-full px-2">
                            E
                        </div>
                        <span>
                            EventBoard
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
