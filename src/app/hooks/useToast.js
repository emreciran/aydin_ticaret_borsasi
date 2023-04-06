import toast from "react-hot-toast";

const useToast = () => {
  function showError(message) {
    toast.error(message, {
      position: "top-center",
      duration: 5000,
    });
  }

  function showSuccess(message) {
    toast.success(message, {
      position: "top-center",
      duration: 5000,
    });
  }

  function showCustom(jsx) {
    toast.custom(jsx, {
      position: "top-center",
      duration: 10000,
    });
  }

  return [{ showError, showSuccess, showCustom }];
};

export default useToast;
