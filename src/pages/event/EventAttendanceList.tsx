import { useGetData } from "@/actions";
import {
    Button,
    Card,
    Limit,
    Pagination,
    Tables,
    TextField
} from "@/components";
import { API_URL_event } from "@/constants";
import { useEffect, useState } from "react";
import { TbLoader } from "react-icons/tb";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDebounceValue } from 'usehooks-ts';

interface EventAttendanceInterface {
    nama: string;
    nohp: string;
    email: string;
    nama_perusahaan: string;
}


const EventAttendanceList = () => {
    const [queryParams, setQueryParams] = useState({
        limit: 10,
        offset: 0,
        search: "",
        sortColumn: "",
        sortOrder: "",
    });

    const { slug } = useParams();

    const getEventAttendance = useGetData(
        `${API_URL_event}${slug}/attendance/`,
        [`event-${slug}`, queryParams],
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

    const getEvent = useGetData(API_URL_event, ["event"], true);
    const dataEvent = getEvent.data?.results?.find((item: any) => item.slug === slug);

    const [searchTerm, setSearchTerm] = useState("");
    const [debounceSearch] = useDebounceValue(searchTerm, 500)

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

    const totalEntries = getEventAttendance?.data?.count || 0;
    const currentPage = Math.floor(queryParams.offset / queryParams.limit) + 1;

    if (getEvent.isLoading) {
        return <div className="relative h-screen flex justify-center items-center">
            <div className='text-center font-bold text-white'>
                <TbLoader size={20} className="animate-spin" />
            </div>
        </div>
    }

    if (!dataEvent) {
        return <Navigate to="/*" />;
    }

    // console.log(dataEvent)

    return (
        <div className="min-h-screen overflow-x-hidden p-10 bg-[#1A1A1A] text-white">
            <Card>
                <div className="p-10">
                    {/* Control Top */}
                    <div className="flex items-center mb-4">
                        <Link to={"/form"} className="text-xl font-bold text-center">
                            Event Attendance List
                        </Link>
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
                            onClick={getEventAttendance.refetch}
                        >
                            Refresh
                        </Button>
                    </div>

                    {/* Tables */}
                    <Tables>
                        <Tables.Head>
                            <Tables.Row>
                                <Tables.Header>Nama</Tables.Header>
                                <Tables.Header>No. HP</Tables.Header>
                                <Tables.Header>Email</Tables.Header>
                                <Tables.Header>Nama Perusahaan</Tables.Header>
                            </Tables.Row>
                        </Tables.Head>
                        <Tables.Body>
                            {getEventAttendance?.data?.results?.length > 0 ? (
                                getEventAttendance.data.results.map((item: EventAttendanceInterface, itemIdx: number) => (
                                    <Tables.Row key={itemIdx}>
                                        <Tables.Data>
                                            <div className="capitalize">
                                                {item.nama}
                                            </div>
                                        </Tables.Data>
                                        <Tables.Data>{item.nohp}</Tables.Data>
                                        <Tables.Data>{item.email}</Tables.Data>
                                        <Tables.Data>{item.nama_perusahaan}</Tables.Data>
                                    </Tables.Row>
                                ))
                            ) : (
                                <Tables.Row>
                                    <Tables.Data colspan={4} center>No Data</Tables.Data>
                                </Tables.Row>
                            )}

                        </Tables.Body>
                    </Tables>

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
            </Card>
        </div>
    );
};

export default EventAttendanceList;
