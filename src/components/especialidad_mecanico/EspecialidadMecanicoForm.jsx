import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const EspecialidadMecanicoForm = () => {
  const navigate =  useNavigate();
  const urlBase = 'http://localhost:4000/api/especialidad_mecanico';
  const { id } = useParams();

  const [dataForm, setDataForm] = useState({
    descripcion: ""
  });

  const getRecord = async() => {
    if ( id != 0 ) {
      const url = `${urlBase}/${id}`;
      const result = axios.get(url);
      const resulData = (await result).data;
      let tempRecord = {
        descripcion: resulData[0].descripcion
      }
      setDataForm(tempRecord);
    }
  }

  useEffect(()=>{
    getRecord();
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
    navigate('/especialidad_mecanico')
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{height: `100vh`}}>
          <form onSubmit={handlerSubmit}>
            <fieldset>
              <legend> {(id != 0 ? "Modificar" : "Registrar") } Especialidad Mecanico </legend>
              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="id" name="id" placeholder="0" value={id} onChange={handlerChange} disabled={true} />
                <label htmlFor="id" className="form-label text-black">ID</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control bg-primary text-white" id="descripcion" name = "descripcion" placeholder="Nombre Especialidad" value={dataForm.descripcion} onChange={handlerChange}/>
                <label htmlFor="descripcion" className="form-label text-black">Nombre Especialidad</label>
              </div>

              <button type='submit' className='btn btn-primary'><i className="bi bi-floppy-fill"></i> Salvar</button>
              <Link to='/especialidad_mecanico' className="m-1 btn btn-danger" title='Regresar al Grid'> Regresar</Link>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}