import {useState, useContext, createContext} from 'react'

//An AuthContext in React is commonly used for managing 
// authentication state (such as user login status) 
// across your application. 

// create the context
const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')  //returns true or false
    )
  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext};