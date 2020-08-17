import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface MyRouteProps extends RouteProps {
  isPrivate?: boolean
  guest?: boolean
}

const MyRoute: React.FC<MyRouteProps> = ({
  isPrivate = false,
  guest,
  ...rest
}) => {
  const { user } = useAuth()

  return isPrivate === !!user ? (
    <Route {...rest} />
  ) : guest ? (
    <Redirect
      to={{
        pathname: isPrivate ? '/login' : '/',
        state: { from: rest.location }
      }}
    />
  ) : (
    <Route {...rest} />
  )
}

export default MyRoute
