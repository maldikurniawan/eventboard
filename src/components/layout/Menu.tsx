import { menu } from "@/constants/menu";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { SiHackaday } from "react-icons/si";
import { TbChevronRight } from "react-icons/tb";
import { NavLink, useLocation } from "react-router-dom";

interface MenuProps {
    sideOpen: boolean;
}

type NavState = Record<string, boolean>;

const Menu: React.FC<MenuProps> = ({ sideOpen }) => {
    const [initNav, setInitNav] = useState<NavState>({});
    const [nav, setNav] = useState<NavState>({});
    const { pathname } = useLocation();
    const { width } = useWindowSize();

    const closeAllNav = () => {
        setNav(initNav);
    };

    const navOpen = (data: string) => {
        setNav((prev) => ({ ...prev, [data]: !prev[data] }));
    };

    const navClose = (data: any) => {
        if (data) {
            setNav((prev) => ({ ...prev, [data]: true }));
        } else {
            setNav(initNav);
        }
    };

    useEffect(() => {
        if (width && width < 1024) {
            closeAllNav();
        }
    }, [width]);

    useEffect(() => {
        const initialNavState = menu
            .filter((item) => item.sub && item.sub.length > 0)
            .reduce<Record<string, boolean>>((acc, item) => {
                if (typeof item.name === "string") {
                    acc[item.name] = false;
                }
                return acc;
            }, {});

        setNav(initialNavState);
        setInitNav(initialNavState);
    }, []);

    useEffect(() => {
        if (!sideOpen) {
            setNav(initNav);
        }
    }, [sideOpen, initNav]);

    return (
        <div className="my-3">
            {menu.map((item, itemIdx) => {
                if (item.label) {
                    return (
                        <div
                            key={itemIdx}
                            className={`px-3 mt-6 mb-3 m-3 text-xs text-white whitespace-nowrap h-3 transition-opacity duration-300 ${sideOpen ? "opacity-100" : "opacity-0"}`}
                        >
                            {item.label}
                        </div>
                    );
                }

                if (!item.sub || item.sub.length === 0) {
                    return (
                        <NavLink onClick={navClose} key={itemIdx} to={item.path || "#"}>
                            {({ isActive }) => (
                                <div className="mb-1 px-3 w-full text-sm">
                                    <div
                                        className={`flex items-center text-white justify-between rounded-xl w-full h-10 px-[18px] py-2 overflow-hidden transition-opacity duration-300 ${sideOpen ? "opacity-100" : "opacity-0"} ${isActive
                                            ? "bg-[#1A1A1A] text-white"
                                            : "hover:bg-[#1A1A1A] hover:text-white"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-xl w-5">
                                                {item.icon}
                                            </span>
                                            <span>
                                                {item.title}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </NavLink>
                    );
                }

                if (item.sub && item.sub.length > 0) {
                    return (
                        <Disclosure key={itemIdx}>
                            <DisclosureButton
                                onClick={() => navOpen(typeof item.name === "string" ? item.name : "")}
                                className="w-full px-3 mb-1 text-sm"
                            >
                                <div
                                    className={`flex items-center text-white justify-between rounded-xl w-full h-10 px-[18px] py-2 overflow-hidden transition-opacity duration-300 ${sideOpen ? "opacity-100" : "opacity-0"} ${nav[typeof item.name === "string" ? item.name : ""]
                                        ? "bg-[#1A1A1A] text-white"
                                        : "hover:bg-[#1A1A1A] hover:text-white"
                                        } ${pathname.split("/")[2] === item.name
                                            ? "bg-[#1A1A1A] text-white"
                                            : ""
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-xl w-5">{item.icon}</span>
                                        <span className="tracking-wide">
                                            {item.title}
                                        </span>
                                    </span>

                                    <div
                                        className={`flex items-center gap-2 transition-all duration-300  ${nav[typeof item.name === "string" ? item.name : ""] ? "rotate-90" : ""}`}
                                    >
                                        <TbChevronRight />
                                    </div>
                                </div>
                            </DisclosureButton>
                            <Transition
                                as="div"
                                enter="transition-all duration-300 ease-in-out"
                                enterFrom="max-h-0 opacity-0"
                                enterTo="max-h-[180vh] opacity-100"
                                leave="transition-all duration-300 ease-in-out"
                                leaveFrom="max-h-[180vh] opacity-100"
                                leaveTo="max-h-0 opacity-0"
                            >
                                <DisclosurePanel className="overflow-hidden pb-2">
                                    {item.sub.map((subItem, subItemIdx) => (
                                        <div key={subItemIdx} className="mb-1 px-3 w-full text-sm">
                                            <NavLink
                                                onClick={() => {
                                                    localStorage.removeItem("editUserData");
                                                    navClose(item.name);
                                                }}
                                                to={subItem.path || "#"}
                                            >
                                                {({ isActive }) => (
                                                    <div
                                                        className={`flex items-center text-white justify-between rounded-xl w-full h-10 px-[18px] py-2 overflow-hidden transition-opacity duration-300 ${sideOpen ? "opacity-100" : "opacity-0"} ${isActive
                                                            ? "bg-[#1A1A1A] text-white"
                                                            : "hover:bg-[#1A1A1A] hover:text-white"
                                                            }`}
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            <span className="text-[10px] w-[18px] ml-2">
                                                                <SiHackaday />
                                                            </span>
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </span>
                                                    </div>
                                                )}
                                            </NavLink>
                                        </div>
                                    ))}
                                </DisclosurePanel>
                            </Transition>
                        </Disclosure>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default Menu;
