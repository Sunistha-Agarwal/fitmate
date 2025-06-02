import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const user = useContext(AuthContext)

    if(!user){
        throw Error('useAuth must be used inside an AuthContextProvider')
    }

    return user
}