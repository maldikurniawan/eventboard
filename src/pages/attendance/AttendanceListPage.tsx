import { useGetData } from "@/actions";
import {
    Button,
    ButtonRipple,
    Limit,
    Pagination,
    Tables,
    TextField,
    Tooltip
} from "@/components";
import { API_URL_event } from "@/constants";
import { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useDebounceValue } from 'usehooks-ts';
import { TiArrowBackOutline } from "react-icons/ti";

interface AttendanceListInterface {
    nama: string;
    nohp: string;
    email: string;
    nama_perusahaan: string;
}

const AttendanceListPage = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [debounceSearch] = useDebounceValue(searchTerm, 500)
    const { slug } = location.state;
    const { nama } = location.state;

    const [queryParams, setQueryParams] = useState({
        limit: 10,
        offset: 0,
        search: "",
        sortColumn: "",
        sortOrder: "",
    });

    const getEvent = useGetData(
        `${API_URL_event}${slug}/attendance/`,
        ["attendance", queryParams],
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

    // console.log(location?.state?.slug)

    return (
        <div className="p-4 bg-[#333333] rounded-xl">
            {/* Control Top */}
            <div className="flex items-center mb-4 gap-2">
                <Link to={"/attendance"}>
                    <TiArrowBackOutline className="text-xl font-bold"/>
                </Link>
                <div className="text-xl font-bold text-center">
                    {nama}
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

            {/* Tables */}
            <Tables>
                <Tables.Head>
                    <Tables.Row>
                        <Tables.Header>Nama</Tables.Header>
                        <Tables.Header>No. HP</Tables.Header>
                        <Tables.Header>Email</Tables.Header>
                        <Tables.Header>Nama Perusahaan</Tables.Header>
                        <Tables.Header center>Action</Tables.Header>
                    </Tables.Row>
                </Tables.Head>
                <Tables.Body>
                    {getEvent?.data?.results?.length > 0 ? (
                        getEvent.data.results.map((item: AttendanceListInterface, itemIdx: number) => (
                            <Tables.Row key={itemIdx}>
                                <Tables.Data>
                                    <div className="capitalize">
                                        {item.nama}
                                    </div>
                                </Tables.Data>
                                <Tables.Data>{item.nohp}</Tables.Data>
                                <Tables.Data>{item.email}</Tables.Data>
                                <Tables.Data>{item.nama_perusahaan}</Tables.Data>
                                <Tables.Data center>
                                    <div className="flex items-center justify-center">
                                        <Tooltip tooltip="Lihat">
                                            <ButtonRipple
                                                stopPropagation
                                                className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                            >
                                                <TbEye className="text-xl text-blue-500" />
                                            </ButtonRipple>
                                        </Tooltip>
                                    </div>
                                </Tables.Data>
                            </Tables.Row>
                        ))
                    ) : (
                        <Tables.Row>
                            <Tables.Data colspan={5} center>No Data</Tables.Data>
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
    )
}

export default AttendanceListPage