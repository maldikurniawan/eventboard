import { useGetData } from "@/actions";
import { API_URL_event } from "@/constants";
import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { FaUserCheck } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const DashboardPage = () => {
    const getAllEvent = useGetData(API_URL_event, ["all-event"], true);
    const getAllAttendance = useGetData(`${API_URL_event}attendance/all/`, ["all-attendance"], true);

    const getLastSixMonths = () => {
        const now = new Date();
        const labels: string[] = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i);
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            labels.push(`${month} ${year}`);
        }

        return labels;
    };

    const chartData = useMemo(() => {
        const labels = getLastSixMonths();
        const counts = new Array(labels.length).fill(0);

        getAllAttendance.data?.results?.forEach((item: any) => {
            const createdAt = new Date(item.created_at);
            const month = createdAt.toLocaleString("default", { month: "long" });
            const year = createdAt.getFullYear();
            const label = `${month} ${year}`;

            const index = labels.indexOf(label);
            if (index !== -1) {
                counts[index]++;
            }
        });

        return {
            options: {
                chart: {
                    id: "attendance-monthly-bar",
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: labels,
                    labels: {
                        style: { colors: "#FFFFFF" },
                    },
                },
                yaxis: {
                    labels: {
                        style: { colors: "#FFFFFF" },
                    },
                },
                title: {
                    text: "Statistik Kunjungan",
                    align: "center" as "center" | "left" | "right",
                    style: {
                        color: "#FFFFFF",
                    },
                },
                tooltip: {
                    theme: "dark",
                },
                grid: {
                    borderColor: "#444",
                },
                colors: ["#16A34A"],
            },
            series: [
                {
                    name: "Total Attendance",
                    data: counts,
                },
            ],
        };
    }, [getAllAttendance.data]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between gap-4">
                <div className="bg-[#333333] p-4 rounded-xl w-full flex items-center gap-2">
                    <div className="bg-blue-600 text-white rounded-full p-2">
                        <MdEvent size={24} />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold leading-5">
                            Total Event
                        </div>
                        <div className="font-semibold">
                            {getAllEvent?.data?.count || 0}
                        </div>
                    </div>
                </div>
                <div className="bg-[#333333] p-4 rounded-xl w-full flex items-center gap-2">
                    <div className="bg-green-600 text-white rounded-full p-2">
                        <FaUserCheck size={24} />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold leading-5">
                            Total Attendance
                        </div>
                        <div className="font-semibold">
                            {getAllAttendance?.data?.count || 0}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#333333] rounded-xl p-4 my-4">
                <div className="w-full mx-auto relative">
                    {chartData && (
                        <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            height={350}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
