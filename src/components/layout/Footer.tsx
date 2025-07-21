import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex gap-1 items-center p-6 text-xs text-white bg-[#1A1A1A]">
            Copyright <FaRegCopyright /> {currentYear}
            <span>EventBoard.</span>
            All rights reserved.
        </div>
    )
}

export default Footer