import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAuth } from "../Redux/hook";
import { setUser, setLoading } from "../Redux/Slices/authSlice";

export const useFetchUser = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));

        const res = await axios.get(
          "http://localhost:5002/api/user-data",
          { withCredentials: true }
        );

        dispatch(setUser(res.data.user));
        
        
      } catch (error) {
        dispatch(setLoading(false));
        console.error("Failed to fetch user", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [dispatch, user]);
};
