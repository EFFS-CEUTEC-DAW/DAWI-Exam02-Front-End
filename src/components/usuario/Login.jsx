import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const url = `http://localhost:4000/api/usuario/auth/${user}/${password}`;
      const result = await axios.get(url);
      if (result.data.length === 0 ){
        setIsVisible(true);
        navigate('/');
        return;
      } 
      setIsVisible(false);
      navigate('/home');
    } catch (error) {
      if (error.response) {
        // El servidor devolvió un error
        setIsVisible(true);
        navigate('/');
      } else if (error.request) {
        // El error ocurrió durante la solicitud
        console.error('Error de red durante la solicitud');
      } else {
        // Error desconocido
        console.error('Error desconocido', error);
      }
    }
  };
  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{maxHeight: `100vh`}}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className='mb-3'> Login </legend>
              <div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control bg-primary text-white" id="InputUser" name="InputUser" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} />
                  <label className="text-black" htmlFor="InputUser">Usuario de la Cuenta</label>
                </div>

                <div className="form-floating">
                  <input type="password" className="form-control bg-primary text-white" id="inputPassword" name="inputPassword" placeholder="Password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
                  <label className="text-black" htmlFor="inputPassword">Password</label>
                </div>
              </div>

              <div className='mt-5'>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>

              <div className='mt-3'>
                <p>No tienes cuenta? <Link className='no-underline' to="/user_register"><strong>Registrate</strong></Link>.</p>
              </div>

            </fieldset>
          </form>
        </div>
      </div>
      {isVisible && (
        <div className='container-fluid'>
          <div className="alert alert-dismissible alert-danger">
            <strong>Atención!</strong> Error de usuario y/o contraseña.
          </div>
        </div>
      )}
    </>
  )
}
