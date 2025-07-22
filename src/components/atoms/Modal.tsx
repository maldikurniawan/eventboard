import { Transition, TransitionChild } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { ButtonRipple } from "..";

interface ModalProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    width: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto" | string;
    height: "auto" | "full" | string;
    btnClose?: boolean;
    persistent?: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    show,
    setShow,
    width,
    height,
    btnClose = true,
    persistent = false,
    children,
}) => {
    const [animateWiggle, setAnimateWiggle] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const onBackDropClick = () => {
        if (!persistent) {
            setShow(false);
        } else {
            setAnimateWiggle(true);
        }
    };

    useEffect(() => {
        if (animateWiggle) {
            const content = contentRef.current;
            if (content) {
                content.classList.add("animate-wiggle");
                setTimeout(() => {
                    content.classList.remove("animate-wiggle");
                    setAnimateWiggle(false);
                }, 200);
            }
        }
    }, [animateWiggle]);

    const modalWidth =
        {
            xs: "320px",
            sm: "480px",
            md: "640px",
            lg: "800px",
            xl: "960px",
            full: "100%",
        }[width] || width;

    const modalHeight =
        {
            full: "100%",
        }[height] || height;

    return (
        <Transition
            as="div"
            show={show}
            className="fixed inset-0 z-50 p-5 flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Backdrop */}
            <TransitionChild
                as="div"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="w-full h-full absolute bg-black/75 -z-10 transition-opacity duration-300"
                onClick={onBackDropClick}
            />

            {/* Content */}
            <TransitionChild
                as="div"
                ref={contentRef}
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className="transition-[opacity,transform] duration-300 relative"
                style={{
                    maxWidth: modalWidth,
                    width: width === "auto" ? "auto" : "100%",
                    height: modalHeight,
                }}
            >
                {/* Button Close */}
                {btnClose && (
                    <div className="absolute -top-2 -right-2 hover:-top-1.5 transition-[top,right] duration-100">
                        <ButtonRipple
                            color="#FFFFFF30"
                            onClick={() => setShow(false)}
                            className={`bg-[#333333] border border-[#1A1A1A] w-8 h-8 text-white flex items-center justify-center`}
                        >
                            <FiX />
                        </ButtonRipple>
                    </div>
                )}
                <div
                    className={`max-h-[90vh] h-full w-full bg-[#333333] border border-[#1A1A1A] overflow-y-auto custom-scroll`}
                >
                    {children}
                </div>
            </TransitionChild>
        </Transition >
    );
};

export default Modal;
