import type { CSSProperties, ReactNode } from 'react';
import React, { useRef, useState } from "react";

type TableSize = "xs" | "sm" | "md" | "lg" | "xl";
type TableDensity = "tight" | "normal" | "loose";

interface TablesProps {
    size?: TableSize;
    density?: TableDensity;
    tablefix?: boolean;
    height?: string | number;
    children: ReactNode;
}

const Tables = ({ size = "md", density = "normal", tablefix = false, height, children }: TablesProps) => {
    // Size
    const tableSize =
        {
            xs: 10,
            sm: 12,
            md: 14,
            lg: 16,
            xl: 18,
        }[size] || 14;

    // Density
    const tableDensity =
        {
            tight: "[&>thead>tr>th]:py-1 [&>tbody>tr>td]:py-1",
            normal: "[&>thead>tr>th]:py-2 [&>tbody>tr>td]:py-2",
            loose: "[&>thead>tr>th]:py-3 [&>tbody>tr>td]:py-3",
        }[density] || "[&>thead>tr>th]:py-2 [&>tbody>tr>td]:py-2";

    return (
        <div
            style={{ height }}
            className="w-full overflow-auto custom-scroll"
        >
            <table
                style={{ fontSize: `${tableSize}px` }}
                className={`w-full border-separate border-spacing-0 ${tableDensity} ${tablefix ? "table-fixed" : "table-auto"}`}
            >
                {children}
            </table>
        </div>
    );
};

interface TableHeadProps {
    children: ReactNode;
    style?: CSSProperties;
    sticky?: boolean;
}

const TableHead = ({ children, style, sticky = false }: TableHeadProps) => {
    return (
        <thead
            style={style}
            className={`${sticky ? "sticky top-0 text-white bg-[#1A1A1A] backdrop-blur-xl shadow-sm" : ""}`}
        >
            {children}
        </thead>
    );
};

interface TableBodyProps {
    children: ReactNode;
    style?: CSSProperties;
}

const TableBody = ({ children, style }: TableBodyProps) => {
    return (
        <tbody style={style}>
            {children}
        </tbody>
    );
};

interface TableRowProps {
    children: ReactNode;
    style?: CSSProperties;
    expandable?: ReactNode;
}

const TableRow = ({ children, style, expandable }: TableRowProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <tr
                style={style}
                onClick={() => expandable && setIsExpanded(!isExpanded)}
                className={`${expandable ? "cursor-pointer" : ""}`}
            >
                {children}
            </tr>

            {expandable && (
                <tr>
                    <td
                        style={{ padding: "0px" }}
                        colSpan={React.Children.count(children)}
                    >
                        <div
                            ref={ref}
                            style={{ height: isExpanded ? `${ref.current?.scrollHeight}px` : "0px" }}
                            className={`overflow-hidden transition-[height] duration-300 ease-in-out ${isExpanded ? "border-b border-black" : ""}`}
                        >
                            {expandable}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

interface TableHeaderProps {
    children: ReactNode;
    style?: CSSProperties;
    center?: boolean;
}

const TableHeader = ({ children, style, center = false }: TableHeaderProps) => {
    return (
        <th
            style={style}
            className={`border-b border-black text-white font-normal bg-[#1A1A1A] uppercase tracking-wide px-2 sticky ${center ? "text-center" : "text-left"}`}
        >
            {children}
        </th>
    );
};

interface TableDataProps {
    children: ReactNode;
    style?: CSSProperties;
    center?: boolean;
    colspan?: number;
}

const TableData = ({ children, style, center = false, colspan }: TableDataProps) => {
    return (
        <td
            style={style}
            colSpan={colspan}
            className={`border-b border-black px-2 ${center ? "text-center" : "text-left"}`}
        >
            {children}
        </td>
    );
};

Tables.Head = TableHead;
Tables.Body = TableBody;
Tables.Row = TableRow;
Tables.Header = TableHeader;
Tables.Data = TableData;

export default Tables;
