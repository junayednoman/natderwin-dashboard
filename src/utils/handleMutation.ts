import { toast } from "react-toastify";

const handleMutation = async (
  data: object | string,
  mutationFunc: any,
  loadingTxt: string,
  onSuccess?: unknown,
  onFailure?: unknown
) => {
  const loadingToast = toast.loading(loadingTxt);
  try {
    const res = await mutationFunc(data).unwrap();

    if (res?.success) {
      toast.update(loadingToast, { render: res?.message, type: "success", isLoading: false, autoClose: 1800 });
      if (typeof onSuccess === "function") {
        onSuccess(res);
      }
    } else {
      if (typeof onFailure === "function") {
        onFailure(res);
      }
    }
  } catch (error: any) {
    const errorMessage = error?.data?.message || error?.message || "Something went wrong!";
    toast.update(loadingToast, { render: errorMessage, type: "error", isLoading: false, autoClose: 1800 });
    console.log("error22, ", error);
  }
};

export default handleMutation;
