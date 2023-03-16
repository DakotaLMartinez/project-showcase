import { useEffect } from 'react'
import { useAuth } from '../../src/context/AuthContext'

function AuthenticatedWrapper({ children, credentials }) {
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    login(credentials)
  }, [])

  return (
    <>{isLoggedIn ? children : null}</>
  )
}

export default AuthenticatedWrapper