import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_API_URL;

let headers: any = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    ...headers,
  },
});

export const getQueryData = async (data: any) => {
  const api = data?.queryKey[0];
  const search = data?.queryKey[1];
  const orderBy = data?.queryKey[2];
  const order = data?.queryKey[3];
  const page = data?.queryKey[4];
  const perPage = data?.queryKey[5];

  const url = `/${api}?search=${search}&order=${order}&page=${page}&orderBy=${orderBy}&perPage=${perPage}`;
  const response = await apiClient.get(url);
  return response.data;
};

//axios client response interceptor for alert
apiClient.interceptors.response.use(
  function (response) {
    // const { status, data } = response;
    // if (status == 201 || status == 200) {
    //   toast.success(data.message, { autoClose: 1000 });
    // }
    return response;
  },
  function (error) {
    // const { status, data } = error.response;
    // if (status == 401) {
    //   localStorage.removeItem("token");
    //   location.replace("/app/login");
    //   toast.error("Login required!", { autoClose: 1500 });
    // }
    // if (status == 403 || status == 409) {
    //   toast.error(data.message, { autoClose: 1000 });
    // }
    // if (status == 500) {
    //   toast.error("Server Error!", { autoClose: 1000 });
    // }
    // if (status == 422) {
    //   toast.error("Please fill form !", { autoClose: 1000 });
    // }
    return Promise.reject(error);
  }
);
apiClient.interceptors.request.use(
  async (config: any) => {
    if (config.method == "delete") {
      let modal = Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1ea432e6",
        cancelButtonColor: "#9F1853",
        confirmButtonText: "Yes ",
        cancelButtonText: "No",
        reverseButtons: true,
      });
      const { isConfirmed, dismiss } = await modal;
      if (isConfirmed) {
        return config;
      }
    } else {
      return config;
    }
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);
