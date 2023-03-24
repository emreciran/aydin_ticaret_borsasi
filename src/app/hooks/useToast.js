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

  return [{ showError, showSuccess }];
};

export default useToast;
