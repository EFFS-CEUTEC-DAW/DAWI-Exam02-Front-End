import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ModeloForm = () => {
  const navigate =  useNavigate();
  const urlBase = 'http://localhost:4000/api/modelo';
  const { id } = useParams();
  const [dataMarca, setDataMarca] = useState([]);

  const [dataForm, setDataForm] = useState({
    descripcion: "", 
    marca_id: 0
  });

  const getRecord = async() => {
    if ( id != 0 ) {
      const url = `${urlBase}/${id}`;
      const result = axios.get(url);
      const resulData = (await result).data;
      let tempRecord = {
        descripcion: resulData[0].descripcion,
        marca_id: resulData[0].marca_id
      }
      setDataForm(tempRecord);
    }
  }

  const getRecordMarca = async() => {
    const url = 'http://localhost:4000/api/marca';
    const result = axios.get(url);
    const resulData = (await result).data;
    setDataMarca(resulData);
  }

  useEffect( () => {
    getRecord();
    getRecordMarca();
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
    navigate('/modelo')
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
                <input type="text" className="form-control bg-primary text-white" id="descripcion" name = "descripcion" placeholder="Nombre Modelo" value={dataForm.descripcion} onChange={handlerChange}/>
                <label htmlFor="descripcion" className="form-label text-black">Descripción</label>
              </div>

              <div className="form-floating">
                <select className="form-select bg-primary text-white" id="marca_id" name="marca_id" value={dataForm.marca_id} onChange={handlerChange}>
                  <option value={null}>Seleccione Marca</option>
                  {dataMarca.map((item, i) => (
                    <option key={i} value={item.id}>{item.descripcion}</option>
                  ))}
                </select>
                <label htmlFor="marca_id" className="form-label text-black">Seleccione Marca</label>
              </div>

              <button type='submit' className='btn btn-primary'><i className="bi bi-floppy-fill"></i> Salvar</button>
              <Link to='/modelo' className="m-1 btn btn-danger" title='Regresar al Grid'> Regresar</Link>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}
