import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper"
import { router } from "./router/router" 
import { AuthService } from "./services/auth.service"
import { useAppDispatch } from "./store/hooks" 
import { login, logout } from "./store/user/userSlice"

function App() {
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage() 
    
    try {
      if(token) { 
        const data = await AuthService.getProfile()

        if(data) {
          dispatch(login(data)) 
        } else { 
          dispatch(logout())
        }
      }
    } catch (error) {
      console.log(error)
    }
  
  }

  useEffect(()=> {checkAuth()}, [])

  return <RouterProvider router={router} />
}

export default App