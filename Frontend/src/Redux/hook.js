import { useDispatch, useSelector } from "react-redux"

export const useAuth =()=>{
            return useSelector(state => state.auth)
}
export const useStore =()=>{
            return useSelector(state => state.shop);
}

export const useAppDispatch = () => useDispatch();