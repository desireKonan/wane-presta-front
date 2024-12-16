import { toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let currentToast: React.ReactText | null = null;

export const setToast = (type: TypeOptions, data: string): void => {
    
    const commonOptions: ToastOptions = {
        type,
        autoClose: 2000,
        onClose: () => {
            currentToast = null;
        },
    };

    if (currentToast !== null) {
        toast.update(currentToast, {
            ...commonOptions,
            render: data,
        });
    } else {
        currentToast = toast(data, {
            ...commonOptions,
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            rtl: false,
        });
    }
};