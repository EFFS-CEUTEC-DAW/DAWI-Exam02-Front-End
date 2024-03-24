import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const UserRegister = () => {
  const navigate =  useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const [dataForm, setDataForm] = useState({
    nombre_usuario: "", 
    correo_electronico: "", 
    contrasena: "", 
    nombre: "", 
    apellido: "", 
    foto_perfil: ""
  });

  const handlerChange = (e)=>{
    const {name, value} = e.target;
    if ( name === "foto_perfil" ) {
      const foto_perfil = e.target.files[0];
      setDataForm({ ...dataForm, [name]: foto_perfil });
      return;
    }
    setDataForm({ ...dataForm, [name]: value });
  }

  const handlerConfirmPassword = (e) => {
    if(e.target.value != dataForm.contrasena) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!isVisible){
      const url = 'http://localhost:4000/api/usuario';

      const datosFormulario = new FormData();
      datosFormulario.append("nombre_usuario", dataForm.nombre_usuario);
      datosFormulario.append("correo_electronico", dataForm.correo_electronico);
      datosFormulario.append("contrasena", dataForm.contrasena);
      datosFormulario.append("nombre", dataForm.nombre);
      datosFormulario.append("apellido", dataForm.apellido);
      datosFormulario.append("foto_perfil", dataForm.foto_perfil);
      await axios.post(url, datosFormulario);
      navigate('/');
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{maxHeight: `100vh`}}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className='mb-3'> Registro de Usuario </legend>
              <div>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control bg-primary text-white" id="nombre_usuario" name="nombre_usuario" placeholder="Usuario" onChange={handlerChange} />
                  <label className="text-black" htmlFor="nombre_usuario">Usuario de la Cuenta</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control bg-primary text-white" id="correo_electronico" name="correo_electronico" placeholder="Mensaje" onChange={handlerChange} />
                  <label className="text-black" htmlFor="correo_electronico">Correo</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control bg-primary text-white" id="contrasena" name="contrasena" placeholder="contrasena" autoComplete="off" onChange={handlerChange} />
                  <label className="text-black" htmlFor="contrasena">Password</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control bg-primary text-white" id="confirmar_contrasena" name="confirmar_contrasena" placeholder="contrasena" autoComplete="off" onChange={handlerConfirmPassword} />
                  <label className="text-black" htmlFor="confirmar_contrasena">Confirmar Password</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control bg-primary text-white" id="nombre" name="nombre" placeholder="Nombre Usuario" onChange={handlerChange} />
                  <label className="text-black" htmlFor="nombre">Nombre del Usuario</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control bg-primary text-white" id="apellido" name="apellido" placeholder="Apellido Usuario" onChange={handlerChange} />
                  <label className="text-black" htmlFor="apellido">Apellido del Usuario</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="file" className="form-control" id="foto_perfil" name="foto_perfil" onChange={handlerChange} />
                </div>
              </div>

              <div className='mt-5'>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/' className="m-1 btn btn-danger" title='Regresar al Login'> Regresar</Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      {isVisible && (
        <div className='contenedor mt-1'>
          <div className="alert alert-dismissible alert-danger">
            <strong>Atención!</strong> Contraseña y confirmar contraseña son diferentes.
          </div>
        </div>
      )}
    </>
  )
}