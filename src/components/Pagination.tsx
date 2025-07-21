import { DOTS, usePagination } from "@/hooks/usePagination";
import { TbChevronLeft, TbChevronRight, TbDots } from "react-icons/tb";

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    activeColor?: "lightGreen" | "lightGray" | "lightPurple" | "lightYellow" | "lightRed" | "lightBlue" | string;
    rounded?: "none" | "sm" | "rounded" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | string;
    variant?: "solid" | "flat" | string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | number | string;
}

const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    activeColor = "lightGray",
    rounded = "none",
    variant = "flat",
    size = "sm",
}) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    }) ?? [];

    const onNext = () => onPageChange(currentPage + 1);
    const onPrevious = () => onPageChange(currentPage - 1);

    const colorPaginations: Record<string, string> = {
        lightGreen: "#00FF00",
        lightGray: "#BEBEBE",
        lightPurple: "#9B30FF",
        lightYellow: "#FFFF00",
        lightRed: "#FF0000",
        lightBlue: "#0000FF",
    };

    const colorPagination = colorPaginations[activeColor] || activeColor;

    const sizePagination = {
        xs: 25,
        sm: 30,
        md: 35,
        lg: 40,
        xl: 45,
    }[size] || size;

    const lastPage = paginationRange[paginationRange.length - 1] as number;

    const pageRounded =
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
        }[rounded] || "rounded-none";

    // Define shadow styles based on variant
    const getShadowStyle = variant === "solid" ? "border border-[#333333]" : "";

    const disabledColor = "#FFFFFF50";

    return (
        <div className="flex gap-2">
            {totalCount > 0 && (
                <>
                    {/* Left Navigation */}
                    <button
                        className={`${getShadowStyle} flex justify-center items-center ${pageRounded} ${currentPage === 1 ? 'bg-[#1A1A1A90] cursor-not-allowed' : 'bg-[#1A1A1A]'} text-white`}
                        style={{
                            width: sizePagination,
                            height: sizePagination,
                        }}
                        onClick={onPrevious}
                        disabled={currentPage === 1}
                    >
                        <TbChevronLeft
                            style={{
                                color: currentPage === 1 ? disabledColor : "inherit",
                            }}
                        />
                    </button>

                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <button
                                    key={index}
                                    style={{
                                        width: sizePagination,
                                        height: sizePagination,
                                        backgroundColor: "#1a1a1a90",
                                        color: "white",
                                    }}
                                    disabled
                                    className={`${getShadowStyle} cursor-not-allowed flex justify-center items-center ${pageRounded}`}
                                >
                                    <TbDots
                                        style={{
                                            color: disabledColor,
                                        }}
                                    />
                                </button>
                            );
                        }

                        return (
                            <button
                                key={index}
                                style={{
                                    width: sizePagination,
                                    height: sizePagination,
                                    backgroundColor:
                                        pageNumber === currentPage
                                            ? colorPagination
                                            : "#1a1a1a",
                                    color:
                                        pageNumber === currentPage
                                            ? "black"
                                            : "white",
                                }}
                                className={`${getShadowStyle} flex justify-center items-center ${pageRounded}`}
                                onClick={() => onPageChange(pageNumber as number)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {/* Right Navigation */}
                    <button
                        className={`${getShadowStyle} flex justify-center items-center ${pageRounded} ${currentPage === lastPage ? 'bg-[#1A1A1A90] cursor-not-allowed' : 'bg-[#1A1A1A]'} text-white`}
                        style={{
                            width: sizePagination,
                            height: sizePagination,
                        }}
                        onClick={onNext}
                        disabled={currentPage === lastPage}
                    >
                        <TbChevronRight
                            style={{
                                color: currentPage === lastPage ? disabledColor : "inherit",
                            }}
                        />
                    </button>
                </>
            )}
        </div>
    );
};

export default Pagination;
