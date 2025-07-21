import { Button, Circle, TextField } from "@/components";
import { API_URL_login } from "@/constants";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { TbEye, TbEyeOff, TbLoader2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username harus diisi"),
            password: Yup.string().required("Password harus diisi"),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post(API_URL_login, {
                    username: values.username,
                    password: values.password,
                });

                const { access, refresh } = response.data;
                localStorage.setItem("naruto", access);
                localStorage.setItem("refresh", refresh);

                navigate("/dashboard", { state: { loginSuccess: true } });
            } catch (error: any) {
                showToast("No active account found with the given credentials", "error", 3000);
            } finally {
                setLoading(false);
            }
        },

    });

    return (
        <div className="relative overflow-hidden">
            <Circle />
            <div className="relative w-screen h-screen overflow-hidden flex font-light">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-white rounded-md backdrop-blur-lg shadow-xl">
                        <div className="flex items-center mb-4">
                            <Link to={"/dashboard"} className="text-xl font-bold text-center">
                                Login
                            </Link>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <TextField
                                label="Username"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                color="#000000"
                                variant="outline"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && formik.errors.username}
                            />
                            <div className="relative">
                                <TextField
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type={isShow ? "text" : "password"}
                                    placeholder="Password"
                                    color="#000000"
                                    variant="outline"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && formik.errors.password}
                                />
                                <div
                                    className="absolute top-2 right-2 cursor-pointer"
                                    onClick={() => setIsShow(!isShow)}
                                >
                                    {isShow ? <TbEyeOff size={24} /> : <TbEye size={24} />}
                                </div>
                            </div>

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

export default LoginPage