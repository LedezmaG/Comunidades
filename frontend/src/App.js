import { useReducer } from 'react';
import { AppRouter } from './Routers/AppRouter';
import { AuthContext } from './Auth/AuthContext';
import { authReducer } from './Auth/AuthReducer';
import "./Assets/Styles/Main.css"
import "./Assets/Styles/ButtonsCustom.css"

function App() {
  const [user, dispatch] = useReducer(authReducer, {})

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
