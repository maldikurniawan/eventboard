import type { ToastOptions } from "react-toastify";
import { Slide, toast } from "react-toastify";

/**
 * Menampilkan pesan toast dengan tipe tertentu, mendukung mode gelap
 * @param message - Pesan yang ingin ditampilkan dalam toast.
 * @param type - Jenis toast (info, success, warning, error). Default: 'info'.
 * @param time - Durasi toast dalam milidetik. Default: 3000.
 * @param closeOnClick - Apakah toast ditutup saat diklik. Default: true.
 * @param darkMode - Apakah toast ditampilkan dalam mode gelap. Default: false.
 */
export const showToast = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info",
    time: number = 3000,
    closeOnClick: boolean = true,
    darkMode: boolean = false
): void => {
    const toastConfig: ToastOptions = {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: closeOnClick,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: Slide,
        style: {
            fontSize: "14px",
            fontWeight: 600,
            padding: "10px 20px",
            margin: "10px",
            borderRadius: "10px",
            backgroundColor: darkMode ? "#333333" : "#FFFFFF",
            color: darkMode ? "#F5F5F5" : "#333333",
        },
    };

    switch (type) {
        case "success":
            toast.success(message, toastConfig);
            break;
        case "warning":
            toast.warning(message, toastConfig);
            break;
        case "error":
            toast.error(message, toastConfig);
            break;
        default:
            toast.info(message, toastConfig);
            break;
    }
};
