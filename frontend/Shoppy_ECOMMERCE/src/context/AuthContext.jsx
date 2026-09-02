import { createContext , useState , useEffect , useContext } from "react";
import { apiFetch } from "../api/api";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user , setUser]=useState(null);
    const [loading , setLoading]=useState(true);

    const checkAuth=async ()=>{
        try {
            // const response=await fetch("http://localhost:8000/user/me",{
            //     credentials:"include"
            // });

            const response=await apiFetch("/user/me");

            if(!response.ok){
                setUser(null)
                return;
            }

            const result=await response.json()

            setUser(result.data)

        } catch (error) {
            console.log("Authntication check failed: ",error)
            setUser(null)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        checkAuth()
    },[])

    const login=(userData)=>{
         setUser(userData);
    }

    const logout=async ()=>{
        try {
            //     await fetch(
            //     "http://localhost:8000/user/logout",
            //     {
            //         method: "POST",
            //         credentials: "include",
            //     }
            // )

            await apiFetch("/user/logout" , {
                method:"POST"
            })
            
        } catch (error) {
            console.log("Logout error: ",error)
        }finally{
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{login , loading ,logout , user}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth=()=>{
    return useContext(AuthContext);
}