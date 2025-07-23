import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import moment from "moment";
import React, { useRef, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import TextField from "./TextField";

interface DateTimePickerProps {
    label: string;
    placeholder: string;
    value: string | Date | null;
    setValue: (val: any) => void;
    error?: string;
    required?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    label,
    placeholder,
    value,
    setValue,
    error,
    required,
}) => {
    const [open, setOpen] = useState(false);

    const pickerRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(pickerRef as any, () => setOpen(false));

    const handleChange = (date: moment.Moment | string) => {
        if (moment.isMoment(date) && date.isValid()) {
            setValue(date.toISOString());
        } else {
            setValue(null);
        }
    };

    return (
        <div className="relative">
            <TextField
                label={label}
                value={value ? moment(value).format("DD/MM/YYYY HH:mm") : ""}
                onClick={() => setOpen(!open)}
                readOnly
                error={error}
                placeholder={placeholder}
                variant="outline"
                required={required}
            />

            {open && (
                <div ref={pickerRef} className="text-[#1A1A1A] mt-2">
                    <Datetime
                        value={moment(value)}
                        onChange={handleChange}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        input={false}
                    />
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;
