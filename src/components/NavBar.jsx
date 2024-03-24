import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to='/home' className="navbar-brand">Home</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Vehiculos
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link to='/marca' className="dropdown-item">Marca</Link></li>
                  <li><Link to='/modelo' className="dropdown-item">Modelo</Link></li>
                  <li><Link to='/vehiculo' className="dropdown-item">Vehiculo</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mantenimiento
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link to='/especialidad_mecanico' className="dropdown-item">Especialidad Mecanico</Link></li>
                  <li><Link to='/mecanico' className="dropdown-item">Mecanico</Link></li>
                  <li><Link to='/mantenimiento' className="dropdown-item">Mantenimiento</Link></li>
                </ul>
              </li>              
            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}
