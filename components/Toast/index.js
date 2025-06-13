import { toast } from 'react-toastify';

export const Toast = ({ type, msg }) => {
    return toast(msg, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        type: type,
    });
};
