import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
}

const Card = ({ children }: CardProps) => {
    return <div className="bg-white w-full rounded-xl overflow-hidden shadow-xl">{children}</div>;
};

export default Card;
