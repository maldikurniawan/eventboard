import { useGetData } from "@/actions";
import {
    Button,
    Limit,
    Pagination,
    TextField
} from "@/components";
import { API_URL_event } from "@/constants";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDebounceValue } from 'usehooks-ts';

interface EventInterface {
    id: string;
    nama: string;
    slug: string;
    deskripsi: string;
    waktu_mulai: string;
    waktu_selesai: string;
    status: string;
}


const AttendancePage = () => {
    const [queryParams, setQueryParams] = useState({
        limit: 10,
        offset: 0,
        search: "",
        sortColumn: "",
        sortOrder: "",
    });

    const getEvent = useGetData(
        API_URL_event,
        ["event", queryParams],
        true,
        {
            limit: queryParams.limit.toString(),
            offset: queryParams.offset.toString(),
            ordering:
                queryParams.sortOrder === "desc"
                    ? `-${queryParams.sortColumn}`
                    : queryParams.sortColumn,
            search: queryParams.search,
        }
    );

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [debounceSearch] = useDebounceValue(searchTerm, 500)
    const [attendanceCounts, setAttendanceCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const eventList = getEvent?.data?.results;
        if (!eventList || eventList.length === 0) return;

        const fetchAttendanceSequentially = async () => {
            for (const event of eventList) {
                try {
                    const res = await fetch(`${API_URL_event}${event.slug}/attendance/`);
                    const data = await res.json();
                    const count = data?.count ?? 0;

                    // Gunakan updater function agar tidak overwrite state sebelumnya
                    setAttendanceCounts((prev) => ({
                        ...prev,
                        [event.slug]: count,
                    }));
                } catch (error) {
                    console.error(`Gagal fetch attendance untuk ${event.slug}`, error);
                }
            }
        };

        fetchAttendanceSequentially();
    }, [getEvent?.data?.results]);


    useEffect(() => {
        setQueryParams((prev) => ({ ...prev, search: debounceSearch, offset: 0 }));
    }, [debounceSearch])

    const handlePageClick = (page: number) => {
        setQueryParams((prev) => ({
            ...prev,
            offset: (page - 1) * prev.limit,
        }));
    };

    const handleSelect = (newLimit: any) => {
        setQueryParams((prev) => ({
            ...prev,
            limit: newLimit,
            offset: 0,
        }));
    };

    const totalEntries = getEvent?.data?.count || 0;
    const currentPage = Math.floor(queryParams.offset / queryParams.limit) + 1;

    // console.log(attendanceCounts)

    return (
        <div className="p-4 bg-[#333333] rounded-xl">
            {/* Control Top */}
            <div className="flex items-center mb-4">
                <div className="text-xl font-bold text-center">
                    Attendance List
                </div>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                <div className="w-full sm:w-60">
                    <TextField
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button
                    color="#BEBEBE"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => getEvent.refetch()}
                >
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getEvent?.data?.results?.length > 0 ? (
                    getEvent.data.results.map((item: EventInterface, itemIdx: number) => (
                        <motion.div
                            key={itemIdx}
                            className="bg-[#1A1A1A] rounded-xl p-4 cursor-pointer flex justify-between items-center"
                            whileHover={{ y: -10 }}
                            onClick={() => navigate('/attendance/list', {
                                state: item
                            })}
                        >
                            <div>
                                <h2 className="text-lg font-semibold capitalize">{item.nama}</h2>
                                <span
                                    className={`inline-block px-2 py-1 capitalize text-xs rounded-full font-medium mb-2 ${item.status === "berlangsung"
                                        ? "bg-green-600 text-white"
                                        : item.status === "belum dimulai"
                                            ? "bg-yellow-600 text-white"
                                            : "bg-red-600 text-white"
                                        }`}
                                >
                                    {item.status}
                                </span>
                                <p className="text-sm mb-2 line-clamp-2 first-letter:capitalize">{item.deskripsi}</p>
                                <p className="text-xs text-[#BEBEBE]">
                                    Starts {moment(item.waktu_mulai).format("DD MMM YYYY, HH:mm")} WIB
                                </p>
                                <p className="text-xs text-[#BEBEBE]">
                                    Ends {moment(item.waktu_selesai).format("DD MMM YYYY, HH:mm")} WIB
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-4xl font-black">
                                <FaUserCheck />
                                <p>{attendanceCounts[item.slug] ?? 0}</p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div>No Data</div>
                )}
            </div>

            {/* Control Bottom */}
            <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                <div className="flex gap-2 items-baseline text-sm">
                    <Limit
                        limit={queryParams.limit}
                        setLimit={handleSelect}
                    />
                    {totalEntries} entries
                </div>

                <Pagination
                    totalCount={totalEntries}
                    onPageChange={handlePageClick}
                    currentPage={currentPage}
                    pageSize={queryParams.limit}
                />
            </div>
        </div>
    );
};

export default AttendancePage;
