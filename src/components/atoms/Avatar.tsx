import type { ReactNode } from "react";

interface AvatarProps {
    variant?: "solid" | "tonal";
    color?: "lightGreen" | "lightGray" | "lightPurple" | "lightYellow" | "lightRed" | "lightBlue" | string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | number | string;
    rounded?: "none" | "sm" | "rounded" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
}

const Avatar = ({
    variant = "solid",
    color = "lightGreen",
    size = "md",
    rounded = "full",
    onClick = () => { },
    className = "",
    children = null,
}: AvatarProps) => {

    // Color mapping
    const avColors: Record<string, string> = {
        lightGreen: "#00FF00",
        lightGray: "#BEBEBE",
        lightPurple: "#9B30FF",
        lightYellow: "#FFFF00",
        lightRed: "#FF0000",
        lightBlue: "#0000FF",
    };

    const avColor = avColors[color] || color;

    // Size mapping
    const sizeMapping: Record<string, string> = {
        xs: "w-6 h-6 text-[10px]",
        sm: "w-8 h-8 text-[10px]",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-sm",
        xl: "w-14 h-14 text-sm",
    };

    const avSize = sizeMapping[size as keyof typeof sizeMapping] || "w-10 h-10 text-sm";
    const avFixed = typeof size === "number" || typeof size === "string" ? size : undefined;

    // Rounded mapping
    const roundedMapping: Record<string, string> = {
        none: "rounded-none",
        sm: "rounded-sm",
        rounded: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
    };

    const avRounded = roundedMapping[rounded] || "rounded-full";

    // Style configuration
    const avStyle = variant === "tonal"
        ? {
            backgroundColor: `${avColor}30`,
            color: avColor,
            width: avFixed ? `${avFixed}px` : undefined,
            height: avFixed ? `${avFixed}px` : undefined,
        }
        : {
            color: "black",
            backgroundColor: avColor,
            width: avFixed ? `${avFixed}px` : undefined,
            height: avFixed ? `${avFixed}px` : undefined,
        };

    return (
        <div
            style={avStyle}
            onClick={onClick}
            className={`flex items-center justify-center overflow-hidden ${avRounded} ${avSize} ${className}`}
        >
            {children}
        </div>
    );
};

export default Avatar;
