import { Button, Circle, TextField } from "@/components";
import { useFormik } from "formik";
import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const FormAttendance: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            nama: "",
            nohp: "",
            email: "",
            nama_perusahaan: "",
        },
        validationSchema: Yup.object({
            nama: Yup.string().required("Required"),
            nohp: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            nama_perusahaan: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            setLoading(true);
        },
    });

    return (
        <div className="relative overflow-hidden">
            <Circle />
            <div className="relative w-screen h-screen overflow-hidden flex font-light">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-white rounded-md backdrop-blur-lg shadow-xl">
                        <div className="flex items-center mb-4">
                            <Link to={"/event"} className="text-xl font-bold text-center">
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
                                color="#"
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
                                color="#"
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
                                color="#"
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
                                    className="w-full"
                                    color="#000000"
                                >
                                    <div className="text-white">
                                        {loading ? (
                                            <TbLoader2 size={20} className="animate-spin mx-auto" />
                                        ) : (
                                            "Login"
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