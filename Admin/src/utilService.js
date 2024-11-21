import toast from 'react-hot-toast';

export const utilService = {
  showSuccessToast: (message) => {
    toast.success(message);
  },
  showErrorToast: (message) => {
    toast.error(message);
  }
};
