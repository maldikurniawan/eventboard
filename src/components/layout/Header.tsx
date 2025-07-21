import { Avatar, Badge, ButtonRipple, List, Popover } from "@/components";
import React, { Fragment } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    sideOpen: boolean;
    setSideOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
    sideOpen,
    setSideOpen,
}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("naruto");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (
        <Fragment>
            <div className="p-4 bg-[#1A1A1A] z-10">
                <div className="w-full flex bg-[#333333] rounded-xl py-2 backdrop-blur-xl justify-between items-center px-3 relative">
                    <div className="flex gap-2 items-center">
                        <div
                            onClick={() => setSideOpen(!sideOpen)}
                            className="p-2 rounded-xl border-[#BEBEBE] border hover:bg-[#BEBEBE] hover:text-black text-[#BEBEBE] text-xl cursor-pointer transition-all"
                        >
                            <HiMenuAlt2 />
                        </div>
                    </div>
                    <Popover
                        placement="bottom-end"
                        spacing={20}
                        rounded="none"
                        button={
                            <ButtonRipple className="rounded-full">
                                <Badge size="sm" placement="right-end" color="lightGreen">
                                    <Avatar color="lightGray">AD</Avatar>
                                </Badge>
                            </ButtonRipple>
                        }
                    >
                        <div className="text-sm w-full md:min-w-[260px] text-[#BEBEBE]">
                            <div className="p-4 border-b border-[#BEBEBE]">
                                <div className="flex gap-2 items-center">
                                    <div className="w-fit">
                                        <Avatar color="lightGray">AD</Avatar>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold whitespace-nowrap">
                                            Admin
                                        </div>
                                        <div className="text-xs">Admin</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 font-medium">
                                <List
                                    rounded="xl"
                                    onClick={handleLogout}
                                    color="lightRed"
                                    prefix={<TbLogout />}
                                    density="loose"
                                >
                                    Logout
                                </List>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </Fragment>
    );
};

export default Header;