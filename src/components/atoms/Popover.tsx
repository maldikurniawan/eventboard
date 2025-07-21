import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
} from "@floating-ui/react";
import {
    Popover as HeadlessPopover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface PopoverProps {
    button: ReactNode;
    placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
    spacing?: number;
    fill?: boolean;
    rounded?:
    | "none"
    | "sm"
    | "rounded"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "full";
    isFlip?: boolean;
    isShift?: boolean;
    position?: "relative" | "fixed" | "absolute" | "sticky";
    children: ReactNode;
    full?: boolean;
}

const CustomPopover: React.FC<PopoverProps> = ({
    button,
    placement = "bottom",
    spacing = 5,
    fill = false,
    rounded = "none",
    isFlip = true,
    isShift = true,
    position = "relative",
    children,
    full = false,
}) => {
    const panelRounded =
        {
            none: "rounded-none",
            sm: "rounded-sm",
            rounded: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            "3xl": "rounded-3xl",
            full: "rounded-full",
        }[rounded] || "rounded";

    const { refs, floatingStyles } = useFloating({
        placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(spacing),
            isFlip ? flip() : undefined,
            isShift ? shift({ padding: 10 }) : undefined,
        ].filter(Boolean),
    });

    return (
        <HeadlessPopover className={`relative ${full ? "w-full" : "w-fit"}`}>
            <PopoverButton ref={refs.setReference} as="div">
                {button}
            </PopoverButton>

            <Transition
                as="div"
                className={`${position} z-10`}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <PopoverPanel
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, position: 'absolute' }}
                    className={`relative bg-[#333333] rounded-xl ${fill ? "w-full" : ""
                        } ${panelRounded} shadow-lg overflow-hidden`}
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </HeadlessPopover>
    );
};

export default CustomPopover;
