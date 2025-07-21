import { ButtonHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode } from "react";
import useRipple from "use-ripple-hook";

type ButtonRippleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: "lightGreen" | "lightGray" | "lightPurple" | "lightYellow" | "lightRed" | "lightBlue" | string;
    duration?: number;
    cancelAutomatically?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: CSSProperties;
    stopPropagation?: boolean;
}

const ButtonRipple = ({
    color = "",
    duration = 500,
    cancelAutomatically = false,
    disabled = false,
    children = null,
    onClick = () => { },
    className = "",
    style = {},
    stopPropagation = false,
    ...rest
}: ButtonRippleProps) => {

    // Color
    const btnColors: Record<string, string> = {
        lightGreen: "#00FF00",
        lightGray: "#BEBEBE",
        lightPurple: "#9B30FF",
        lightYellow: "#FFFF00",
        lightRed: "#FF0000",
        lightBlue: "#0000FF",
    };

    const btnColor = btnColors[color] || color;

    const [ripple, event] = useRipple({
        duration,
        color: btnColor || "#00000030",
        cancelAutomatically,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
        disabled,
    });

    return (
        <button
            {...rest}
            className={className}
            style={style}
            disabled={disabled}
            ref={ripple}
            onMouseDown={event}
            onClick={(e) => {
                if (stopPropagation) e.stopPropagation();
                onClick?.(e);
            }}
        >
            {children}
        </button>
    );
};

export default ButtonRipple;
