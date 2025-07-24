import { useGetData } from "@/actions";
import {
    Button,
    ButtonRipple,
    Limit,
    Modal,
    Pagination,
    Tables,
    TextField,
    Tooltip
} from "@/components";
import { API_URL_event } from "@/constants";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbEye } from "react-icons/tb";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import { useDebounceValue } from 'usehooks-ts';

interface AttendanceListInterface {
    nama: string;
    nohp: string;
    email: string;
    nama_perusahaan: string;
    ip_address: string;
}

const AttendanceListPage = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [debounceSearch] = useDebounceValue(searchTerm, 500)
    const [basicModal, setBasicModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [ipInfo, setIPInfo] = useState<any>(null);
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
        [`attendance-${slug}`, queryParams],
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
        const fetchIPInfo = async () => {
            if (!selectedData?.ip_address) {
                setIPInfo(null);
                return;
            }
            try {
                const res = await axios.get(`https://ipwho.is/${selectedData.ip_address}`);
                if (res.data?.success === false) {
                    setIPInfo(null);
                } else {
                    setIPInfo(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch IP address", err);
                setIPInfo(null);
            }
        };

        fetchIPInfo();
    }, [selectedData]);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${API_URL_event}${slug}/attendance/export-excel/`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `attendance-${slug}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Gagal download file:", error);
            showToast("Error while downloading file.", "error", 3000, true, true);
        } finally {
            setLoading(false);
        }
    };

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

    // console.log(ipInfo)

    return (
        <>
            <div className="p-4 bg-[#333333] rounded-xl">
                {/* Control Top */}
                <div className="flex items-center mb-4 gap-2">
                    <Link to={"/attendance"}>
                        <TiArrowBackOutline className="text-xl font-bold" />
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
                    <div className="flex gap-2 items-center">
                        <Button
                            color="#BEBEBE"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => getEvent.refetch()}
                        >
                            Refresh
                        </Button>
                        <Button
                            color="#BEBEBE"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={handleDownload}
                            disabled={loading}
                        >
                            Export to Excel
                        </Button>
                    </div>
                </div>

                {/* Tables */}
                <Tables>
                    <Tables.Head>
                        <Tables.Row>
                            <Tables.Header>Nama</Tables.Header>
                            <Tables.Header>No. HP</Tables.Header>
                            <Tables.Header>Email</Tables.Header>
                            <Tables.Header>Nama Perusahaan</Tables.Header>
                            <Tables.Header>IP Address</Tables.Header>
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
                                    <Tables.Data>{item.ip_address ?? "-"}</Tables.Data>
                                    <Tables.Data center>
                                        <div className="flex items-center justify-center">
                                            <Tooltip tooltip="Lihat">
                                                <ButtonRipple
                                                    stopPropagation
                                                    onClick={() => {
                                                        setBasicModal(true);
                                                        setSelectedData(item);
                                                    }}
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
                                <Tables.Data colspan={6} center>No Data</Tables.Data>
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
            <Modal show={basicModal} setShow={setBasicModal} width="md" height="auto">
                <div className="text-lg font-normal p-5">
                    <div className="mb-3 font-bold border-b w-fit border-black">IP Information</div>
                    <Tables>
                        <Tables.Body>
                            <Tables.Row>
                                <Tables.Data>IP Address</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.ip ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">Type</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.type ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Continent</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.continent ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">Country</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.country ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Region</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.region ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">City</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.city ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Latitude</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.latitude ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">Longitude</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.longitude ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Postal</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.postal || "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">Calling Code</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.calling_code ? `+${ipInfo?.calling_code}` : "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Capital</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.capital ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">Borders</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.borders ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Flag</Tables.Data>
                                <Tables.Data>
                                    {ipInfo?.flag && ipInfo?.flag.img ? (
                                        <img
                                            src={ipInfo?.flag.img}
                                            alt="flag"
                                            className="w-6 h-auto"
                                        />
                                    ) : (
                                        "N/A"
                                    )}
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">ASN</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.connection.asn ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>ISP</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.connection.isp ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">ORG</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.connection.org ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                            <Tables.Row>
                                <Tables.Data>Domain</Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.connection.domain ?? "N/A"
                                    }
                                </Tables.Data>
                                <Tables.Data>
                                    <p className="pl-1">Timezone</p>
                                </Tables.Data>
                                <Tables.Data>
                                    {
                                        ipInfo?.timezone.id ?? "N/A"
                                    }
                                </Tables.Data>
                            </Tables.Row>
                        </Tables.Body>
                    </Tables>

                </div>
            </Modal>
        </>
    )
}

export default AttendanceListPage