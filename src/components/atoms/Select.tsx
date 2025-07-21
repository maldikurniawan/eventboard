import type { FocusEvent } from "react";
import { useState } from "react";
import { TbChevronDown, TbX } from "react-icons/tb";
import ReactSelect, { components } from "react-select";
import ReactSelectCreatable from "react-select/creatable";

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    id?: string;
    name?: string;
    label?: string;
    options?: Option[];
    value?: any;
    variant?: "basic" | "outline" | string;
    size?: "sm" | "md" | "lg" | "xl" | string;
    width?: "full" | "half" | "third" | "quarter" | "auto" | string;
    menuplacement?: "auto" | "top" | "bottom";
    color?: "lightGreen" | "lightGray" | "lightPurple" | "lightYellow" | "lightRed" | "lightBlue" | string;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | string;
    density?: "tight" | "normal" | "loose" | string;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    creatable?: boolean;
    clearable?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    multi?: boolean;
    placeholder?: string;
    error?: React.ReactNode;
    note?: React.ReactNode;
    onChange?: React.Dispatch<React.SetStateAction<any>>;
    onBlur?: (e: FocusEvent<HTMLElement>) => void;
    required?: boolean;
    menuposition?: "absolute" | "fixed";
}

const Select: React.FC<SelectProps> = ({
    id,
    name,
    label,
    options = [],
    value,
    variant = "basic",
    size = "md",
    width = "full",
    menuplacement = "auto",
    color = "lightGreen",
    rounded = "none",
    density = "normal",
    prepend,
    append,
    creatable = false,
    clearable = false,
    searchable = false,
    disabled = false,
    multi = false,
    placeholder,
    error,
    note,
    onChange,
    onBlur,
    required = false,
    menuposition = "fixed",
}) => {
    const variants = ["outline"];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isHover, setIsHover] = useState<boolean>(false);

    // Width
    const selectWidth =
        {
            full: "100%",
            half: "50%",
            third: "33.33%",
            quarter: "25%",
            auto: "auto",
        }[width] || `${width}px`;

    // Color
    const selectColor =
        {
            lightGreen: "#00FF00",
            lightGray: "#BEBEBE",
            lightPurple: "#9B30FF",
            lightYellow: "#FFFF00",
            lightRed: "#FF0000",
            lightBlue: "#0000FF",
        }[color] || color;

    // Size
    const selectSize =
        {
            sm: 12,
            md: 14,
            lg: 16,
            xl: 18,
        }[size] || 14;

    // Rounded
    const selectRounded =
        {
            none: 0,
            sm: 2,
            base: 4,
            md: 6,
            lg: 8,
            xl: 12,
            "2xl": 16,
            "3xl": 20,
            "4xl": 24,
        }[rounded] || rounded;

    // Density
    const selectDensity =
        {
            tight: 8,
            normal: 10,
            loose: 12,
        }[density] || 10;

    // Container Style Variant
    let containerStyle = {};
    if (variant === "outline") {
        containerStyle = {
            borderColor: error
                ? "#ef4444"
                : disabled
                    ? "#4D535580"
                    : isFocus
                        ? selectColor
                        : isHover
                            ? "#6F6F6F"
                            : "#4D5355",
            borderWidth: 1,
            borderStyle: "solid",
            outline: error
                ? `2px solid #ef4444`
                : isFocus
                    ? `2px solid ${selectColor}`
                    : "none",
            outlineOffset: -2,
            borderRadius: selectRounded,
        };
    } else {
        containerStyle = {
            borderColor: error
                ? "#ef4444"
                : disabled
                    ? "#4D535580"
                    : isFocus
                        ? selectColor
                        : isHover
                            ? "#6F6F6F"
                            : "#4D5355",
            borderWidth: 1,
            borderStyle: "solid",
            outline: "none",
            borderRadius: selectRounded,
        };
    }

    // Label Style Variant
    let labelStyle = {};
    if (variant === "outline") {
        labelStyle = {
            fontSize:
                isFocus || value?.length > 0 || value ? selectSize - 2 : selectSize,
            left: 14,
            top: isFocus || value?.length > 0 || value ? 0 : "50%",
            transform: "translateY(-50%)",
            color: isFocus || value?.length > 0 || value ? selectColor : "",
        };
    }

    const DropdownIndicator = (props: any) => {
        return (
            <components.DropdownIndicator {...props}>
                <TbChevronDown size={selectSize + 2} />
            </components.DropdownIndicator>
        );
    };

    const ClearIndicator = (props: any) => {
        return (
            <components.ClearIndicator {...props}>
                <TbX size={selectSize + 2} className="cursor-pointer" />
            </components.ClearIndicator>
        );
    };

    const MultiValueRemove = (props: any) => {
        return (
            <components.MultiValueRemove {...props}>
                <TbX size={selectSize} className="cursor-pointer" />
            </components.MultiValueRemove>
        );
    };

    return (
        <div style={{ width: selectWidth }}>
            {/* Label Basic */}
            {!variants.includes(variant) && (
                <label
                    htmlFor={id}
                    style={{
                        fontSize: selectSize,
                    }}
                    className={`mb-1 ${required && "required"}`}
                >
                    {label}
                </label>
            )}

            <div className="flex">
                {prepend && (
                    <div
                        style={{
                            fontSize: selectSize,
                        }}
                        className="flex items-center pr-2"
                    >
                        {prepend}
                    </div>
                )}

                <div
                    style={{
                        ...containerStyle,
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className={`relative flex flex-1 ${isFocus ? "shadow" : ""}`}
                >
                    {variants.includes(variant) && label && (
                        <span
                            style={{ ...labelStyle }}
                            className={`absolute pointer-events-none transition-[top,font,padding,margin] leading-none whitespace-nowrap ${(isFocus && variant === "outline") ||
                                (variant === "outline" && value)
                                ? "bg-black backdrop-blur px-1 -ml-1"
                                : ""
                                }`}
                        >
                            {label}
                        </span>
                    )}

                    {creatable ? (
                        <ReactSelectCreatable
                            id={id}
                            name={name}
                            options={options}
                            menuPlacement={menuplacement}
                            isClearable={clearable}
                            isSearchable={searchable}
                            isDisabled={disabled}
                            isMulti={multi}
                            onChange={onChange}
                            value={value}
                            placeholder={placeholder}
                            onFocus={() => {
                                setIsFocus(true);
                                setIsOpen(true);
                            }}
                            onBlur={(e) => {
                                setIsFocus(false);
                                setIsOpen(false);
                                onBlur && onBlur(e);
                            }}
                            unstyled
                            className="leading-none"
                            components={{
                                IndicatorSeparator: () => null,
                                DropdownIndicator,
                                ClearIndicator,
                                MultiValueRemove,
                            }}
                            blurInputOnSelect
                            styles={{
                                container: (base) => ({
                                    ...base,
                                    fontSize: selectSize,
                                    outline: "none",
                                    width: "100%",
                                }),
                                control: (base) => ({
                                    ...base,
                                    padding: `${selectDensity}px 14px`,
                                    minHeight: 0,
                                }),
                                indicatorsContainer: (base) => ({
                                    ...base,
                                    gap: "14px",
                                    display: "flex",
                                    alignItems: "baseline",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#000000",
                                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
                                    borderRadius: selectRounded,
                                    top: "calc(100% + 6px)",
                                    border: "1px solid #333",
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    color: state.isSelected
                                        ? "#000000"
                                        : "#FFFFFF75",
                                    backgroundColor: state.isSelected
                                        ? selectColor
                                        : "transparent",
                                    padding: `${selectDensity}px 14px`,
                                    fontSize: selectSize,
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: state.isSelected
                                            ? selectColor
                                            : "#FFFFFF10",
                                    },
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    color: "#FFFFFF",
                                    backgroundColor: "#1A1A1A",
                                    padding: "6px",
                                    fontSize: selectSize - 2,
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: selectRounded,
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    gap: "6px",
                                }),
                            }}
                            classNames={{
                                menuList: () => "custom-scroll py-1",
                                placeholder: () =>
                                    `leading-none pl-0 transition-all ${isOpen && "pl-1"} ${variants.includes(variant) && !isFocus
                                        ? "opacity-0"
                                        : "opacity-50"
                                    }`,
                                noOptionsMessage: () => "leading-none p-2.5",
                            }}
                            menuPosition={menuposition}
                        />
                    ) : (
                        <ReactSelect
                            id={id}
                            name={name}
                            options={options}
                            menuPlacement={menuplacement}
                            isClearable={clearable}
                            isSearchable={searchable}
                            isDisabled={disabled}
                            isMulti={multi}
                            onChange={onChange}
                            value={value}
                            placeholder={placeholder}
                            onFocus={() => {
                                setIsFocus(true);
                                setIsOpen(true);
                            }}
                            onBlur={(e) => {
                                setIsFocus(false);
                                setIsOpen(false);
                                onBlur && onBlur(e);
                            }}
                            unstyled
                            className="leading-none"
                            components={{
                                IndicatorSeparator: () => null,
                                DropdownIndicator,
                                ClearIndicator,
                                MultiValueRemove,
                            }}
                            blurInputOnSelect
                            styles={{
                                container: (base) => ({
                                    ...base,
                                    fontSize: selectSize,
                                    outline: "none",
                                    width: "100%",
                                }),
                                control: (base) => ({
                                    ...base,
                                    padding: `${selectDensity}px 14px`,
                                    minHeight: 0,
                                }),
                                indicatorsContainer: (base) => ({
                                    ...base,
                                    gap: "14px",
                                    display: "flex",
                                    alignItems: "baseline",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#000000",
                                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
                                    borderRadius: selectRounded,
                                    border: "1px solid #333",
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    color: state.isSelected
                                        ? "#000000"
                                        : "#FFFFFF75",
                                    backgroundColor: state.isSelected
                                        ? selectColor
                                        : "transparent",
                                    padding: `${selectDensity}px 14px`,
                                    fontSize: selectSize,
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: state.isSelected
                                            ? selectColor
                                            : "#FFFFFF10",
                                    },
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    color: "#FFFFFF",
                                    backgroundColor: "#1A1A1A",
                                    padding: "6px",
                                    fontSize: selectSize - 2,
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: selectRounded,
                                }),
                                valueContainer: (base) => ({
                                    ...base,
                                    gap: "6px",
                                }),
                            }}
                            classNames={{
                                menuList: () => "custom-scroll py-1",
                                placeholder: () =>
                                    `leading-none pl-0 transition-all ${isOpen && "pl-1"} ${variants.includes(variant) && !isFocus
                                        ? "opacity-0"
                                        : "opacity-50"
                                    }`,
                                noOptionsMessage: () => "leading-none p-2.5",
                            }}
                            menuPosition={menuposition}
                        />
                    )}
                </div>

                {append && (
                    <div
                        style={{
                            fontSize: selectSize,
                        }}
                        className="flex items-center pl-2"
                    >
                        {append}
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <div
                    style={{
                        fontSize: selectSize - 3,
                    }}
                    className="leading-none tracking-wide mt-1 text-red-500"
                >
                    {error}
                </div>
            )}

            {/* Note */}
            {note && (
                <div
                    style={{
                        fontSize: selectSize - 3,
                    }}
                    className="leading-none tracking-wide mt-1"
                >
                    {note}
                </div>
            )}
        </div>
    );
};

export default Select;
