import React from "react";
import { Select } from "@/components";

interface LimitProps {
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    onChange?: (value: number) => void;
}

const Limit: React.FC<LimitProps> = ({ limit, setLimit, onChange }) => {
    const options = [
        { value: 10, label: "10" },
        { value: 25, label: "25" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
    ];

    return (
        <div className="w-20">
            <Select
                color="lightGray"
                options={options}
                value={options.find((item) => item.value === limit) || null}
                onChange={(selectedOption) => {
                    if (selectedOption) {
                        const { value } = selectedOption;
                        setLimit(value);
                        if (onChange) {
                            onChange(value);
                        }
                    }
                }}
            />
        </div>
    );
};

export default Limit;
