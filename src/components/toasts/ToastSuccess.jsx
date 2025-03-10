import { toast } from 'react-toastify';

export function ToastSuccess(message) {

  toast.success(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });;

  return
}
