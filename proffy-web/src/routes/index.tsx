import React from 'react'
import { Switch } from 'react-router-dom'

import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Profile from '../pages/Profile'
import ForgotPassword from '../pages/ForgotPassword'
import Landing from '../pages/Landing'
import TeacherForm from '../pages/TeacherForm'
import TeacherList from '../pages/TeacherList'
import Success from '../pages/Success'

import MyRoute from './Route'

const Routes: React.FC = () => {
  return (
    <Switch>
      <MyRoute path='/login' component={Login} exact />
      <MyRoute path='/signup' component={SignUp} exact />
      <MyRoute path='/forgot-password' component={ForgotPassword} exact />
      <MyRoute path='/' component={Landing} exact isPrivate />
      <MyRoute path='/profile' component={Profile} exact isPrivate />
      <MyRoute path='/give-classes' component={TeacherForm} exact isPrivate />
      <MyRoute path='/study' component={TeacherList} exact isPrivate />
      <MyRoute path='/*/success' component={Success} />
    </Switch>
  )
}
export default Routes
