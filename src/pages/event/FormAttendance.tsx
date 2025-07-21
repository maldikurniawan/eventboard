import { usePostData } from "@/actions";
import { Button, Circle, TextField } from "@/components";
import { API_URL_event } from "@/constants";
import { showToast } from "@/utils/showToast";
import { useFormik } from "formik";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FormAttendance: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const createEventAttendance = usePostData(API_URL_event, true);
    const navigate = useNavigate();

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
                    navigate("/attendance");
                    showToast(data.message, "success", 3000);
                },
                onError: (error) => {
                    console.error(error);
                    showToast("An error occurred while submitting the form.", "error", 3000);
                    resetForm();
                    setLoading(false);
                },
            });
        },
    });

    return (
        <div className="relative overflow-hidden">
            <Circle />
            <div className="relative w-screen h-screen overflow-hidden flex font-light">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-white rounded-xl backdrop-blur-lg shadow-xl">
                        <div className="flex items-center mb-4">
                            <Link to={"/attendance"} className="text-xl font-bold text-center">
                                Form Attendance
                            </Link>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4 text-[#]">
                            <TextField
                                label="Nama"
                                id="nama"
                                name="nama"
                                type="text"
                                placeholder="Nama"
                                color="#000000"
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
                                color="#000000"
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
                                color="#000000"
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
                                color="#000000"
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
                                    color="#000000"
                                >
                                    <div className="text-white">
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