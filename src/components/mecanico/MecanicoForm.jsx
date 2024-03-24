import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const MecanicoForm = () => {
  const navigate =  useNavigate();
  const urlBase = 'http://localhost:4000/api/mecanico';
  const { id } = useParams();

  const [dataEspecialidad, setDataEspecialidad] = useState([]);

  const [dataForm, setDataForm] = useState({
    nombre: "", 
    especialidad_mecanico_id: 0
  });

  const getRecord = async() => {
    if ( id != 0 ) {
      const url = `${urlBase}/${id}`;
      const result = axios.get(url);
      const resulData = (await result).data;
      let tempRecord = {
        nombre: resulData[0].nombre,
        especialidad_mecanico_id: resulData[0].especialidad_mecanico_id
      }
      setDataForm(tempRecord);
    }
  }

  const getRecordEspecialidad = async() => {
    const url = 'http://localhost:4000/api/especialidad_mecanico';
    const result = axios.get(url);
    const resulData = (await result).data;
    setDataEspecialidad(resulData);
  }

  useEffect( () => {
    getRecord();
    getRecordEspecialidad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (id != 0){
      const url = `${urlBase}/${id}`;
      await axios.put(url, dataForm);
    } else {
      const url = urlBase;
      await axios.post(url, dataForm);
    }
    navigate('/mecanico')
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{height: `100vh`}}>
          <form onSubmit={handlerSubmit}>
            <fieldset>
              <legend> {(id != 0 ? "Modificar" : "Registrar") } Modelo </legend>
              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="id" name="id" placeholder="0" value={id} onChange={handlerChange} disabled={true} />
                <label htmlFor="id" className="form-label text-black">ID</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control bg-primary text-white" id="nombre" name = "nombre" placeholder="Nombre" value={dataForm.nombre} onChange={handlerChange}/>
                <label htmlFor="nombre" className="form-label text-black">Nombre</label>
              </div>

              <div className="form-floating">
                <select className="form-select bg-primary text-white" id="especialidad_mecanico_id" name="especialidad_mecanico_id" value={dataForm.especialidad_mecanico_id} onChange={handlerChange}>
                  <option value={null}>Seleccione Especialidad</option>
                  {dataEspecialidad.map((item, i) => (
                    <option key={i} value={item.id}>{item.descripcion}</option>
                  ))}
                </select>
                <label htmlFor="especialidad_mecanico_id" className="form-label text-black">Seleccione Especialidad</label>
              </div>

              <button type='submit' className='btn btn-primary'><i className="bi bi-floppy-fill"></i> Salvar</button>
              <Link to='/mecanico' className="m-1 btn btn-danger" title='Regresar al Grid'> Regresar</Link>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}
