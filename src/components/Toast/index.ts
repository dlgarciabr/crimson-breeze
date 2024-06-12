import { toast, ToastOptions } from 'react-toastify';

export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning'
}

const showToast = (type: ToastType, message: string) => {
  const options: ToastOptions = {
    toastId: new Date().getTime(),
    theme: 'colored',
    draggable: true,
    position: 'top-center',
    autoClose: type === ToastType.ERROR ? 20000 : 3000
  };
  toast[type](message, options);
};

const dismissToast = toast.dismiss;

export { showToast, dismissToast };
