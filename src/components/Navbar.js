import React, { useContext} from 'react'
import UserContext from '../context/UserContext';

export const Navbar = () => {

 const { user, login, logout } = useContext(UserContext);

  return (
    <div>
      
      <nav id = "cabecera" className="navbar navbar-dark bg-dark mb-4 cabecera">
        <span className="navbar-brand">
          <h2> {user ? `Hola ${user.name}` : 'Bienvenido'} </h2>
        </span>
        {user ? (
          <button id="botonL" className="btn btn-outline-danger" class="mr-2" onClick={logout} type="button">
            Logout
          </button>
        ) : (
          <button id="botonL" className="btn btn-outline-success" onClick={login} type="button">
            Login
          </button>
        )}
      </nav>

    </div>
  )
}
