
// import { createContext ,useState } from "react";

// export const AuthContext=createContext();

// export const AuthProvider=({children})=>{

//     const [user, setUser] = useState(() => {
//        const userInfo = localStorage.getItem("userInfo");
//        return userInfo ? JSON.parse(userInfo) : null;
//     });

//     const login=(userdata)=>{
//         setUser(userdata)
//         localStorage.setItem("userInfo",JSON.stringify(userdata));
//     }

//     const logout=()=>{
//         setUser(null);
//         localStorage.removeItem("userInfo")
//     }

//     return (
//         <>
//           <AuthContext.Provider     value={{user,login,logout}}>
//              {children}
//           </AuthContext.Provider>

//         </>
//     )
// }