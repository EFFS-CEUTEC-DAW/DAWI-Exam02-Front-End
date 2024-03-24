import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const VehiculoForm = () => {
  const navigate =  useNavigate();
  const urlBase = 'http://localhost:4000/api/vehiculo';
  const { id } = useParams();
  const [dataModelo, setDataModelo] = useState([]);

  const [dataForm, setDataForm] = useState({
    modelo_id: 0, 
    anio: 0, 
    tipo_combustible: "", 
    kilometraje: 0, 
    num_puertas: 0, 
    num_asientos: 0,
    foto_vehiculo: ""
  });


  const getRecord = async() => {
    if ( id != 0 ) {
      const url = `${urlBase}/${id}`;
      const result = axios.get(url);
      const resulData = (await result).data;
      let tempRecord = {
        modelo_id: resulData[0].modelo_id, 
        anio: resulData[0].anio, 
        tipo_combustible: resulData[0].tipo_combustible, 
        kilometraje: resulData[0].kilometraje, 
        num_puertas: resulData[0].num_puertas, 
        num_asientos: resulData[0].num_asientos,
        foto_vehiculo: resulData[0].foto_vehiculo
      }
      setDataForm(tempRecord);
    }
  }

  const getRecordModelo = async() => {
    const url = 'http://localhost:4000/api/modelo';
    const result = axios.get(url);
    const resulData = (await result).data;
    setDataModelo(resulData);
  }

  useEffect( () => {
    getRecord();
    getRecordModelo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    if ( name === "foto_vehiculo" ) {
      const foto_vehiculo = e.target.files[0];
      setDataForm({ ...dataForm, [name]: foto_vehiculo });
      return;
    }
    setDataForm({ ...dataForm, [name]: value });
  }
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const datosFormulario = new FormData();
    datosFormulario.append("modelo_id", dataForm.modelo_id);
    datosFormulario.append("anio", dataForm.anio);
    datosFormulario.append("tipo_combustible", dataForm.tipo_combustible);
    datosFormulario.append("kilometraje", dataForm.kilometraje);
    datosFormulario.append("num_puertas", dataForm.num_puertas);
    datosFormulario.append("num_asientos", dataForm.num_asientos);
    datosFormulario.append("foto_vehiculo", dataForm.foto_vehiculo);
    if (id != 0){
      const url = `${urlBase}/${id}`;
      await axios.put(url, datosFormulario);
    } else {
      const url = urlBase;
      await axios.post(url, datosFormulario);
    }
    navigate('/vehiculo')
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{height: `100vh`}}>
          <form onSubmit={handlerSubmit}>
            <fieldset>
              <legend> {(id != 0 ? "Modificar" : "Registrar") } Vehículos</legend>
              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="anio" name="anio" placeholder="2010" value={dataForm.anio} onChange={handlerChange}/>
                <label htmlFor="anio" className="form-label text-black">Año</label>
              </div>

              <div className="form-floating">
                <select className="form-select bg-primary text-white" id="tipo_combustible" name="tipo_combustible" value={dataForm.tipo_combustible} onChange={handlerChange}>
                  <option value={null}>Seleccione Combustible</option>
                  <option value={"Gasolina"}>Gasolina</option>
                  <option value={"Diesel"}>Diesel</option>
                  <option value={"Gas"}>Gas</option>
                </select>
                <label htmlFor="tipo_combustible" className="form-label text-black">Seleccione Combustible</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="kilometraje" name="kilometraje" placeholder="100100" value={dataForm.kilometraje} onChange={handlerChange}/>
                <label htmlFor="kilometraje" className="form-label text-black">Kilometraje</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="num_puertas" name="num_puertas" placeholder="4" value={dataForm.num_puertas} onChange={handlerChange}/>
                <label htmlFor="num_puertas" className="form-label text-black">No. Puertas</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="num_asientos" name="num_asientos" placeholder="4" value={dataForm.num_asientos} onChange={handlerChange}/>
                <label htmlFor="num_asientos" className="form-label text-black">No. Asientos</label>
              </div>

              <div className="form-floating mb-3">
                <select className="form-select bg-primary text-white" id="modelo_id" name="modelo_id" value={dataForm.modelo_id} onChange={handlerChange}>
                  <option value={null}>Seleccione Modelo</option>
                  {dataModelo.map((item, i) => (
                    <option key={i} value={item.id}>{item.modelo}</option>
                  ))}
                </select>
                <label htmlFor="modelo_id" className="form-label text-black">Seleccione Modelo</label>
              </div>

              <div className="form-floating mb-3">
                <input type="file" className="form-control" id="foto_vehiculo" name="foto_vehiculo" onChange={handlerChange} />
                <label htmlFor="foto_vehiculo" className="form-label mt-4">Foto</label>
              </div>

              <button type='submit' className='btn btn-primary'><i className="bi bi-floppy-fill"></i> Salvar</button>
              <Link to='/vehiculo' className="m-1 btn btn-danger" title='Regresar al Grid'> Regresar</Link>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}