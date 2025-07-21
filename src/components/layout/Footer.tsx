import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex gap-1 items-center p-6 text-xs text-[#0F0] bg-black">
            Copyright <FaRegCopyright /> {currentYear}
            <span>Anonymous.</span>
            All rights reserved.
        </div>
    )
}

export default Footer