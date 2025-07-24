import { Button, TextField } from "@/components";
import { API_URL_login } from "@/constants";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { TbEye, TbEyeOff, TbLoader2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
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

                navigate("/", { state: { loginSuccess: true } });
            } catch (error: any) {
                showToast("No active account found with the given credentials", "error", 3000, true, true);
            } finally {
                setLoading(false);
            }
        },

    });

    return (
        <div className="relative overflow-hidden bg-[#1A1A1A]">
            <img src="/assets/images/pattern_dark_auth.png" alt="bg-city" className="absolute z-0 w-full h-full object-cover bottom-0"/>
            <div className="relative w-screen h-screen overflow-hidden flex font-light">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-[#333333] text-white rounded-xl backdrop-blur-lg shadow-xl">
                        <div className="flex items-center mb-4">
                            <div className="text-xl font-bold text-center">
                                Login
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <TextField
                                label="Username"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
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
                                    color="lightGray"
                                >
                                    <div className="text-black">
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