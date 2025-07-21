import { DashboardPage } from "@/pages";
import type { JSX } from "react";
import { MdEvent } from "react-icons/md";
import {
    PiHouseLine
} from "react-icons/pi";

// Adjust the SubMenu interface to not have a nested sub property
interface SubMenu {
    path: string;
    element: JSX.Element;
    icon?: JSX.Element | null;
    name?: string | JSX.Element | null;
    title?: string;
    sub?: [];
    menuLink?: string;
}

// MenuItem interface with sub as an array of SubMenu
interface MenuItem {
    path?: string;
    element?: JSX.Element | null;
    icon?: JSX.Element;
    name?: string | JSX.Element | undefined;
    title?: string;
    sub?: SubMenu[];
    label?: string;
    menuLink?: string;
    iconActive?: string;
}

export const menu: MenuItem[] = [
    {
        icon: <PiHouseLine />,
        path: "/",
        name: "chart",
        title: "Dashboard",
        element: <DashboardPage />,
        sub: [],
    },
    {
        icon: <MdEvent />,
        path: "/event",
        name: "event",
        title: "Event",
        element: <div>Event Page</div>,
        sub: [],
    },
];
