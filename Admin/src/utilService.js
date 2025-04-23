import toast from 'react-hot-toast';

export const utilService = {
  showSuccessToast: (message) => {
    toast.success(message);
  },
  showErrorToast: (message) => {
    toast.error(message);
  }
};

export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date)) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


