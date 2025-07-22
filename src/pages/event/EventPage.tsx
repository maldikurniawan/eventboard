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
import moment from "moment";
import { useEffect, useState } from "react";
import { TbEye, TbPencil, TbTrash } from "react-icons/tb";
import { useDebounceValue } from 'usehooks-ts';

interface EventInterface {
    nama: string;
    waktu_mulai: string;
    waktu_selesai: string;
    status: string;
}


const EventPage = () => {
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

    const [basicModal, setBasicModal] = useState<boolean>(false);
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

    const totalEntries = getEvent?.data?.count || 0;
    const currentPage = Math.floor(queryParams.offset / queryParams.limit) + 1;


    return (
        <>
            <div className="p-4 bg-[#333333] rounded-xl">
                {/* Control Top */}
                <div className="flex items-center mb-4">
                    <div className="text-xl font-bold text-center">
                        Event List
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
                        onClick={() => setBasicModal(true)}
                    >
                        Create
                    </Button>
                </div>

                {/* Tables */}
                <Tables>
                    <Tables.Head>
                        <Tables.Row>
                            <Tables.Header>Event</Tables.Header>
                            <Tables.Header>Waktu Mulai</Tables.Header>
                            <Tables.Header>Waktu Selesai</Tables.Header>
                            <Tables.Header>Status</Tables.Header>
                            <Tables.Header center>Action</Tables.Header>
                        </Tables.Row>
                    </Tables.Head>
                    <Tables.Body>
                        {getEvent?.data?.results?.length > 0 ? (
                            getEvent.data.results.map((item: EventInterface, itemIdx: number) => (
                                <Tables.Row key={itemIdx}>
                                    <Tables.Data>
                                        <div className="capitalize">
                                            {item.nama}
                                        </div>
                                    </Tables.Data>
                                    <Tables.Data>{moment(item.waktu_mulai).format("DD MMM YYYY, HH:mm")}</Tables.Data>
                                    <Tables.Data>{moment(item.waktu_selesai).format("DD MMM YYYY, HH:mm")}</Tables.Data>
                                    <Tables.Data>
                                        <div className="capitalize">
                                            {item.status}
                                        </div>
                                    </Tables.Data>
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
                                            <Tooltip tooltip="Edit">
                                                <ButtonRipple
                                                    stopPropagation
                                                    className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                >
                                                    <TbPencil className="text-xl text-yellow-500" />
                                                </ButtonRipple>
                                            </Tooltip>
                                            <Tooltip tooltip="Hapus">
                                                <ButtonRipple
                                                    stopPropagation
                                                    className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                >
                                                    <TbTrash className="text-xl text-red-500" />
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
            <Modal show={basicModal} setShow={setBasicModal} width="sm" height="auto">
                <div className="text-lg font-normal p-5">
                    <div className="mb-3">Tambah Event</div>
                    <div className="text-sm mb-3">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
                        quae officia doloribus in alias laudantium odio delectus nostrum
                        iure! Ipsa eos harum tenetur distinctio! Eligendi ab dignissimos
                        laboriosam ipsa velit.
                    </div>
                    <div className="text-sm flex justify-end">
                        <Button onClick={() => setBasicModal(false)} color="lightGray">
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EventPage;
