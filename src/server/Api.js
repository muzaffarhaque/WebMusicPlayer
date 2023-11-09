import axiosInstance from "../components/Interceptor"

const commonPostApi = async(url, data="") => {
    try {
        const res = await axiosInstance.post(url, data);
        return res;
    } catch (error) {
        return error;
    }
}
export default commonPostApi;