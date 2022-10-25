import React, { useContext, useEffect, useState } from 'react'
import { types } from '../Types/types'
import { AuthContext } from '../Auth/AuthContext'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

//PUBLIC COMPONENTS
import { SignIn } from '../Pages/Auth/SignIn/SignIn'
import { SignUp } from '../Pages/Auth/SignUp/SignUp'
import { PasswordRecovery } from '../Pages/Auth/PasswordRecovery/PasswordRecovery'
import { NotFound } from '../Pages/NotFound/NotFound'

// PRIVATE COMPONENTS
import {Dashboard as DashboardRes} from '../Pages/Dashboard/Residents/Dashboard'
import { LayoutLoading } from '../Components/Layout/LayoutLoading'

import ComponentsList from './ModulesList'
import { getRulesByRole, tokenDecrypt } from '../controllers/System/AuthController'

export const AppRouter = () => {
  const { user, dispatch } = useContext( AuthContext );
  const [loading, setLoading] = useState(false)
  const [modules, setModules] = useState([])
  const token = localStorage.getItem('token') || null

  useEffect(() =>{ onLoad() }, [user.logged, token, dispatch])
  
  const onLoad = () => {
    if (token) {
      return validateToken()
    }

    return(
      dispatch({
        type: types.logout
      }),
      <Navigate to="/sign-in" />
    )
  }

  const validateToken = async () => {
    try {
      setLoading(true)

      const userInfo = await tokenDecrypt(token)
      if (!userInfo.status) {
        throw new Error("Error al validar token")
      }
      
      const modules = await getRulesByRole(userInfo.result.role)
      if (!modules.status) {
        throw new Error("Sin modulos disponibles")
      }

      setModules(modules.result)
      setLoading(false)
      dispatch({
        type: types.login,
        payload: {
          logged: true,
          info: {...userInfo.result},
          rules: [...modules.result]
        },
      })
    } catch (error) {
      setLoading(false)
      dispatch({
        type: types.logout
      })
      return <Navigate to="/sign-in" />
    }
  }

  return (
    <>
      { !loading 
        ? <>
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/sign-in"
                element={<PublicRoute isAuth={user.logged} component={SignIn} />}
              />
              <Route
                exact
                path="/sign-up"
                element={<PublicRoute isAuth={user.logged} component={SignUp} />}
              />
              <Route
                exact
                path="/password-recovery"
                element={<PublicRoute isAuth={user.logged} component={PasswordRecovery} />}
              />
              <Route
                exact
                path="/"
                element={<PrivateRoute isAuth={user.logged} component={DashboardRes} />}
              />
              <Route
                exact
                path="/dashboard"
                element={<PrivateRoute isAuth={user.logged} component={DashboardRes} />}
              />
              { modules.length > 0 && modules?.map( item =>
                <>
                  <Route
                    key={item.id}
                    id={item?.system_module?.id}
                    exact
                    path={item?.system_module?.link}
                    element={
                      <PrivateRoute 
                        isAuth={user.logged} 
                        component={ ComponentsList[`${item?.system_module?.name}`] } 
                      />
                    }
                  />
                  { item.read &&
                    <Route
                      key={item.id}
                      exact
                      path={`${item?.system_module?.link}/view/:id`}
                      element={
                        <PrivateRoute 
                          isAuth={user.logged} 
                          component={ ComponentsList[`${item?.system_module?.name}Details`] } 
                        />
                      }
                    />
                  }
                  { item.create &&
                    <Route
                      key={item.id}
                      exact
                      path={`${item?.system_module?.link}/new`}
                      element={
                        <PrivateRoute 
                          isAuth={user.logged} 
                          component={ ComponentsList[`${item?.system_module?.name}Details`] } 
                        />
                      }
                    />
                  }
                  { item.update &&
                    <Route
                      key={item.id}
                      exact
                      path={`${item?.system_module?.link}/edit/:id`}
                      element={
                        <PrivateRoute 
                          isAuth={user.logged} 
                          component={ ComponentsList[`${item?.system_module?.name}Details`] } 
                        />
                      }
                    />
                  }
                </>
              )}
              {localStorage.getItem('token') && (
                <Route component={NotFound} isAuth={false} />
              )}
              {!localStorage.getItem('token') && (
                <Route path="*" exact isAuth={false} component={NotFound}  />
              )}
            </Routes>
          </BrowserRouter>
        </>
        : <LayoutLoading />
      }
    </>
  )
}
