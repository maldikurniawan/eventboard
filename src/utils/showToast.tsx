import type { ToastOptions } from "react-toastify";
import { Slide, toast } from "react-toastify";

/**
 * Menampilkan pesan toast dengan tipe tertentu
 * @param message - Pesan yang ingin ditampilkan dalam toast.
 * @param type - Jenis toast (info, success, warning, error). Default: 'info'.
 * @param time - Durasi toast dalam milidetik. Default: 3000.
 * @param closeOnClick - Apakah toast ditutup saat diklik. Default: true.
 */

export const showToast = (
    message: string,
    type: "info" | "success" | "warning" | "error" = "info",
    time: number = 3000,
    closeOnClick: boolean = true
): void => {
    const toastConfig: ToastOptions = {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: closeOnClick,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
        style: {
            fontSize: "14px",
            fontWeight: 600,
            padding: "10px 20px",
            margin: "10px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            color: "#333",
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
