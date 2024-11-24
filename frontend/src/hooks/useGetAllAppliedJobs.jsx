
import { APPLICATION_API_END_POINT } from "@/components/constant";
import { setallAppliedJobs } from "@/redux/jobslice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                // console.log(res.data);
                if (res.data.success) {
                    dispatch(setallAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
};
export default useGetAllAppliedJobs;

