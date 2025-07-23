import { useGetData, usePostData } from "@/actions";
import { Button, TextField } from "@/components";
import { API_URL_event } from "@/constants";
import { showToast } from "@/utils/showToast";
import { useFormik } from "formik";
import { useState } from "react";
import { TbLoader, TbLoader2 } from "react-icons/tb";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

const FormAttendance: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const getEvent = useGetData(API_URL_event, ["event"], true);
    const dataEvent = getEvent.data?.results?.find((item: any) => item.slug === slug);
    const createEventAttendance = usePostData(`${API_URL_event}${dataEvent?.slug}/attendance/`, true);

    const formik = useFormik({
        initialValues: {
            nama: "",
            nohp: "",
            email: "",
            nama_perusahaan: "",
        },
        validationSchema: Yup.object({
            nama: Yup.string().required("Nama wajib diisi"),
            nohp: Yup.string()
                .required("Nomor HP wajib diisi")
                .matches(
                    /^\+?\d{9,15}$/,
                    "Nomor HP tidak valid."
                ),
            email: Yup.string()
                .required("Email wajib diisi")
                .email("Format email tidak valid"),

            nama_perusahaan: Yup.string().required("Nama perusahaan wajib diisi"),
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            createEventAttendance.mutate(values as any, {
                onSuccess: (res: any) => {
                    const data = res as { message: string };
                    resetForm();
                    setLoading(false);
                    navigate("/result/" + dataEvent?.slug);
                    showToast(data.message, "success", 3000, true, true);
                },
                onError: (error) => {
                    console.error(error);
                    showToast("An error occurred while submitting the form.", "error", 3000, true, true);
                    resetForm();
                    setLoading(false);
                },
            });
        },
    });

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

    // console.log(dataEvent);

    return (
        <div className="relative overflow-hidden bg-[#1A1A1A]">
            <div className="relative w-screen h-screen overflow-hidden flex text-white">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-[#333333] rounded-xl backdrop-blur-lg shadow-xl">
                        <div className="flex items-center mb-4">
                            <div className="text-xl font-bold">
                                Form Attendance
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                            <TextField
                                label="No. HP"
                                id="nohp"
                                name="nohp"
                                type="text"
                                placeholder="No. HP"
                                variant="outline"
                                value={formik.values.nohp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nohp && formik.errors.nohp}
                            />
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Email"
                                variant="outline"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                label="Nama Perusahaan"
                                id="nama_perusahaan"
                                name="nama_perusahaan"
                                type="text"
                                placeholder="Nama Perusahaan"
                                variant="outline"
                                value={formik.values.nama_perusahaan}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nama_perusahaan && formik.errors.nama_perusahaan}
                            />
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full cursor-pointer"
                                    color="lightGray"
                                >
                                    <div className="text-black">
                                        {loading ? (
                                            <TbLoader2 size={20} className="animate-spin mx-auto" />
                                        ) : (
                                            "Submit"
                                        )}
                                    </div>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAttendance