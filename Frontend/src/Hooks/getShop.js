import { useEffect } from "react";
import { useAppDispatch, useStore } from "../Redux/hook"
import { setShop, setShopLoading } from "../Redux/Slices/shopSlice";
import axios from "axios";
import { store } from "../Redux/store";

export const useGetShop= ()=>{
    const dispatch = useAppDispatch()
    const {shop} = useStore();
    useEffect(()=>{
        const fetchShop = async()=>{
            try {
                const res = await axios.get("http://localhost:5002/api/getMyShop",{withCredentials:true});
                 dispatch(setShopLoading(true));
                 dispatch(setShop(res.data.stores));
                 
            } catch (error) {
                dispatch(setShopLoading(false));
                console.error("Failed to fetch user", error);

            }
        }
        fetchShop();
    },[dispatch])

}