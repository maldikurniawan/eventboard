import type { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    icon?: ReactNode;
    title?: string;
}

const Container = ({ children, icon, title }: ContainerProps) => {
    return (
        <div className="w-full max-[500px]:p-0 p-[77px] rounded-[32px] container-style">
            <div className="flex items-center gap-2 mb-4 font-medium text-black">
                {icon && <div className="w-[40px]">{icon}</div>}
                {title && <div className="text-md">{title}</div>}
            </div>
            <div className="text-black">{children}</div>
        </div>
    );
};

export default Container;
