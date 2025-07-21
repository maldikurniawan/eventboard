import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import type { ReactNode } from "react";

interface BadgeProps {
    placement?: "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end";
    color?: "lightGreen" | "lightGray" | "lightPurple" | "lightYellow" | "lightRed" | "lightBlue" | string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    rounded?: "none" | "sm" | "rounded" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    value?: string | number | ReactNode;
    spacing?: number;
    skidding?: number;
    hidden?: boolean;
    className?: string;
    children?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
    placement = "right-start",
    color = "lightGreen",
    size = "md",
    rounded = "full",
    value = "",
    spacing = -12,
    skidding = 0,
    hidden = false,
    className = "",
    children = null,
}) => {

    const { refs, floatingStyles } = useFloating({
        placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset({
                mainAxis: spacing,
                crossAxis: skidding,
            }),
        ],
    });

    // Color Mapping
    const badgeColors: Record<string, string> = {
        lightGreen: "#00FF00",
        lightGray: "#BEBEBE",
        lightPurple: "#9B30FF",
        lightYellow: "#FFFF00",
        lightRed: "#FF0000",
        lightBlue: "#0000FF",
    };

    const badgeColor = badgeColors[color] || color;

    // Size Mapping
    const badgeSize = {
        xs: "min-w-[4px] h-1 p-[3px] text-[6px]",
        sm: "min-w-[8px] h-2 p-[4px] text-[7px]",
        md: "min-w-[12px] h-3 p-[5px] text-[8px]",
        lg: "min-w-[16px] h-4 p-[5px] text-[9px]",
        xl: "min-w-[20px] h-5 p-[5px] text-[10px]",
        "2xl": "min-w-[24px] h-6 p-[5px] text-[11px]",
        "3xl": "min-w-[28px] h-7 p-[5px] text-[12px]",
    }[size] || "min-w-[12px] h-3 p-[5px] text-[8px]";

    // Rounded Mapping
    const badgeRounded = {
        none: "rounded-none",
        sm: "rounded-sm",
        rounded: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
    }[rounded] || "rounded-full";

    const style = {
        backgroundColor: badgeColor,
        color: "black",
    };

    return (
        <div className="relative">
            <div ref={refs.setReference}>
                {children}
            </div>

            <div
                ref={refs.setFloating}
                style={{ ...floatingStyles, ...style }}
                className={`absolute z-0 border flex items-center justify-center border-white rounded-full ${hidden ? "hidden" : ""
                    } ${badgeRounded} ${badgeSize} ${className}`}
            >
                {value}
            </div>
        </div>
    );
};

export default Badge;
