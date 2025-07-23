import { useDeleteData, useGetData, usePostData, usePutData } from "@/actions";
import {
    Button,
    ButtonRipple,
    DateTimePicker,
    Limit,
    Modal,
    Pagination,
    Tables,
    TextArea,
    TextField,
    Tooltip
} from "@/components";
import { API_URL_event } from "@/constants";
import { showToast } from "@/utils/showToast";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { TbEye, TbPencil, TbTrash } from "react-icons/tb";
import Swal from "sweetalert2";
import { useDebounceValue } from 'usehooks-ts';
import * as Yup from "yup";

interface EventInterface {
    id: string;
    nama: string;
    slug: string;
    deskripsi: string;
    waktu_mulai: string;
    waktu_selesai: string;
    status: string;
    barcode: {
        image_url: string;
        barcode_value: string;
    };
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
    const [qrcodeModal, setQRCodeModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debounceSearch] = useDebounceValue(searchTerm, 500)

    const createEvent = usePostData(API_URL_event, true);
    const updateEvent = usePutData(`${API_URL_event}${selectedEvent?.id}/`, true);
    const deleteEvent = useDeleteData(API_URL_event, true);

    const formik = useFormik({
        initialValues: {
            nama: "",
            deskripsi: "",
            waktu_mulai: "",
            waktu_selesai: "",
        },
        validationSchema: Yup.object({
            nama: Yup.string().required("Required"),
            deskripsi: Yup.string().required("Required"),
            waktu_mulai: Yup.string().required("Required"),
            waktu_selesai: Yup.string().required("Required"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (isEditMode && selectedEvent) {
                updateEvent.mutate(
                    { id: selectedEvent.id, ...values } as any,
                    {
                        onSuccess: (res: any) => {
                            showToast(res.message, "success", 3000, true, true);
                            resetForm();
                            getEvent.refetch();
                            setBasicModal(false);
                            setIsEditMode(false);
                        },
                        onError: () => {
                            showToast("Error while updating event.", "error", 3000, true, true);
                        },
                    }
                );
            } else {
                createEvent.mutate(values as any, {
                    onSuccess: (res: any) => {
                        showToast(res.message, "success", 3000, true, true);
                        resetForm();
                        getEvent.refetch();
                        setBasicModal(false);
                    },
                    onError: () => {
                        showToast("Error while creating event.", "error", 3000, true, true);
                    },
                });
            }
        }
    });

    const onDelete = (item: EventInterface) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: "#FF0000",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            customClass: {
                popup: 'custom-popup',
                title: 'custom-title',
                icon: 'custom-icon',
                htmlContainer: 'custom-val',
                confirmButton: 'custom-delete-button',
                cancelButton: 'custom-cancel-button',
            }
        }).then((result) => {
            if (result.value) {
                deleteEvent.mutate((item.id) as any, {
                    onSuccess: (res) => {
                        const data = res as { message: string };
                        showToast(data.message, "success", 3000, true, true);
                        getEvent.refetch();
                    },
                    onError: (error) => {
                        console.log(error);
                        const data = error as { message: string };
                        showToast(data.message, "warning", 3000, true, true);
                    },
                });
            }
        });
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

    const downloadQRCode = async () => {
        if (!selectedEvent?.barcode?.image_url || !selectedEvent?.slug) return;

        try {
            const response = await fetch(selectedEvent.barcode.image_url);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedEvent.slug}-qr.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Gagal mengunduh gambar QR Code:", error);
        }
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
                                            <Tooltip tooltip="Lihat QR Code">
                                                <ButtonRipple
                                                    stopPropagation
                                                    onClick={() => {
                                                        setSelectedEvent(item);
                                                        setQRCodeModal(true);
                                                    }}
                                                    className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                >
                                                    <TbEye className="text-xl text-blue-500" />
                                                </ButtonRipple>
                                            </Tooltip>
                                            <Tooltip tooltip="Edit">
                                                <ButtonRipple
                                                    stopPropagation
                                                    onClick={() => {
                                                        setIsEditMode(true);
                                                        setSelectedEvent(item);
                                                        formik.setValues({
                                                            nama: item.nama || "",
                                                            deskripsi: item.deskripsi || "",
                                                            waktu_mulai: item.waktu_mulai || "",
                                                            waktu_selesai: item.waktu_selesai || "",
                                                        });
                                                        setBasicModal(true);
                                                    }}
                                                    className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                >
                                                    <TbPencil className="text-xl text-yellow-500" />
                                                </ButtonRipple>
                                            </Tooltip>
                                            <Tooltip tooltip="Hapus">
                                                <ButtonRipple
                                                    stopPropagation
                                                    onClick={() => onDelete(item)}
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
                    <form onSubmit={formik.handleSubmit} className="space-y-3">
                        <TextField
                            label="Nama"
                            id="nama"
                            name="nama"
                            type="text"
                            placeholder="Nama"
                            variant="outline"
                            value={formik.values.nama}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nama && formik.errors.nama}
                        />
                        <TextArea
                            label="Deskripsi"
                            id="deskripsi"
                            name="deskripsi"
                            placeholder="Deskripsi"
                            variant="outline"
                            value={formik.values.deskripsi}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.deskripsi && formik.errors.deskripsi}
                        />
                        <DateTimePicker
                            label="Waktu Mulai"
                            placeholder="Waktu Mulai"
                            value={formik.values.waktu_mulai}
                            setValue={(val) => formik.setFieldValue("waktu_mulai", val)}
                            error={formik.errors.waktu_mulai}
                        />
                        <DateTimePicker
                            label="Waktu Selesai"
                            placeholder="Waktu Selesai"
                            value={formik.values.waktu_selesai}
                            setValue={(val) => formik.setFieldValue("waktu_selesai", val)}
                            error={formik.errors.waktu_selesai}
                        />
                        <div className="text-sm flex justify-end">
                            <Button type="submit" color="lightGray" disabled={createEvent.isPending} className="cursor-pointer">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal show={qrcodeModal} setShow={setQRCodeModal} width="xs" height="auto">
                <div className="text-lg font-normal p-5 flex flex-col items-center justify-center">
                    <div className="mb-3 text-center capitalize">{selectedEvent?.nama}</div>
                    {selectedEvent?.barcode?.image_url ? (
                        <>
                            <img
                                src={selectedEvent.barcode.image_url}
                                alt="QR Code"
                                className="mx-auto w-48 h-48 object-contain"
                            />
                            <Button color="lightGray" className="cursor-pointer mt-3 w-48" onClick={downloadQRCode}>
                                Simpan Gambar
                            </Button>
                        </>
                    ) : (
                        <p className="text-sm text-[#BEBEBE]">QR Code tidak tersedia</p>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default EventPage;
