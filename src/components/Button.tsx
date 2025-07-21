import type { ReactNode } from 'react';
import { useState } from "react";
import { ButtonRipple, Loading } from "@/components";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "solid" | "outline" | "text" | "tonal" | "flat";
    color?: "lightGreen" | "lightGray" | "lightPurple" | "lightYellow" | "lightRed" | "lightBlue" | string;
    textcolor?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | number | string;
    rounded?: "none" | "sm" | "rounded" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    block?: boolean;
    loading?: boolean;
    onClick?: () => void;
    loadingComponent?: ReactNode;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    stopPropagation?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    variant = "solid",
    color = "lightGreen",
    textcolor = "",
    size = "md",
    rounded = "none",
    block = false,
    loading = false,
    onClick = () => { },
    loadingComponent = null,
    disabled = false,
    className = "",
    children = null,
    stopPropagation = false,
}) => {
    const [isHover, setIsHover] = useState(false);

    // Color mapping
    const btnColors: Record<string, string> = {
        lightGreen: "#00FF00",
        lightGray: "#BEBEBE",
        lightPurple: "#9B30FF",
        lightYellow: "#FFFF00",
        lightRed: "#FF0000",
        lightBlue: "#0000FF",
    };

    const btnColor = btnColors[color] || color;

    // Size mapping
    const sizeClasses = {
        xs: "min-w-[60px] min-h-[24px] px-2 py-1 text-xs",
        sm: "min-w-[80px] min-h-[28px] px-2 py-1 text-sm",
        md: "min-w-[100px] min-h-[32px] px-4 py-2 text-sm",
        lg: "min-w-[120px] min-h-[40px] px-4 py-2 text-white",
        xl: "min-w-[140px] min-h-[44px] px-4 py-2 text-white",
    };

    const btnSize = typeof size === "string" ? sizeClasses[size as keyof typeof sizeClasses] : "min-w-[100px] min-h-[32px] px-4 py-2 text-sm";

    // Loading component
    const defaultLoadingComponent = (
        <Loading color="#fff" loading={true} size={typeof size === "string" ? { xs: 10, sm: 12, md: 14, lg: 16, xl: 18 }[size as keyof typeof sizeClasses] : 14} />
    );
    const btnLoading = loadingComponent || defaultLoadingComponent;

    // Rounded classes
    const roundedClasses = {
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

    const btnRounded = roundedClasses[rounded as keyof typeof roundedClasses] || "rounded-md";

    // Button styles lightGrayd on variant
    let btnStyle: React.CSSProperties = {};

    switch (variant) {
        case "outline":
            btnStyle = {
                backgroundColor: isHover ? `${btnColor}10` : "transparent",
                border: `1px solid ${btnColor}`,
                color: textcolor || btnColor,
            };
            break;
        case "text":
            btnStyle = {
                backgroundColor: isHover ? `${btnColor}30` : "transparent",
                color: textcolor || btnColor,
            };
            break;
        case "tonal":
            btnStyle = {
                backgroundColor: isHover ? `${btnColor}30` : `${btnColor}20`,
                color: textcolor || btnColor,
            };
            break;
        case "flat":
            btnStyle = {
                backgroundColor: btnColor,
                color: textcolor || "black",
                filter: disabled ? "brightness(1.2)" : "brightness(1)",
            };
            break;
        default:
            btnStyle = {
                backgroundColor: btnColor,
                color: textcolor || "black",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.15)",
            };
            break;
    }

    return (
        <ButtonRipple
            type={type}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            color={!variant || variant === "solid" || variant === "flat" ? "" : `${btnColor}60`}
            onClick={() => {
                onClick && onClick();
            }}
            stopPropagation={stopPropagation}
            duration={300}
            disabled={disabled || loading}
            style={btnStyle}
            className={`outline-none tracking-wide duration-150 active:scale-[.98] active:duration-300 ${btnRounded} ${btnSize} ${block ? "w-full" : ""} ${className}`}
        >
            {loading ? btnLoading : children}
        </ButtonRipple>
    );
};

export default Button;
