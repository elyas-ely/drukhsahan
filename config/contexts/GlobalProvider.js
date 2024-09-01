import React, { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "../../lib/appwrite/users/userApi"

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthUser()
  }, [])

  const checkAuthUser = async () => {
    setIsLoading(true)
    try {
      const currentAccount = await getCurrentUser()
      // const currentAccount = true
      if (!currentAccount) return console.log("no current account")

      setUser(currentAccount)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export default GlobalProvider
