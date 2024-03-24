import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const MantenimientoForm = () => {
  const navigate =  useNavigate();
  const urlBase = 'http://localhost:4000/api/mantenimiento';
  const { id } = useParams();
  const [dataVehiculo, setDataVehiculo] = useState([]);

  const [dataForm, setDataForm] = useState({
    vehiculo_id: 0, 
    fecha: "", 
    diagnostico: "", 
    servicio: "", 
    kilometraje: 0, 
    costos: 0, 
    notas_adicionales: ""
  });

  const getRecord = async() => {
    if ( id != 0 ) {
      const url = `${urlBase}/${id}`;
      const result = axios.get(url);
      const resulData = (await result).data;
      let tempRecord = {
        vehiculo_id: resulData[0].vehiculo_id, 
        fecha: resulData[0].fecha, 
        diagnostico: resulData[0].diagnostico, 
        servicio: resulData[0].servicio, 
        kilometraje: resulData[0].kilometraje, 
        costos: resulData[0].costos, 
        notas_adicionales: resulData[0].notas_adicionales
      }
      setDataForm(tempRecord);
    }
  }

  const getRecordVehiculo = async() => {
    const url = 'http://localhost:4000/api/vehiculo';
    const result = axios.get(url);
    const resulData = (await result).data;
    setDataVehiculo(resulData);
    console.log(resulData);
  }

  useEffect(()=>{
    getRecord();
    getRecordVehiculo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "fecha"){
      setDataForm({ ...dataForm, [name]: moment(value).format('YYYY-MM-DD')});
      return;
    }
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
    navigate('/mantenimiento')
  }
  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-center align-items-center' style={{height: `100vh`}}>
          <form onSubmit={handlerSubmit}>
            <fieldset>
              <legend> {(id != 0 ? "Modificar" : "Registrar") } Mantenimiento </legend>
              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="id" name="id" placeholder="0" value={id} onChange={handlerChange} disabled={true} />
                <label htmlFor="id" className="form-label text-black">ID</label>
              </div>

              <div className="form-floating">
                <select className="form-select bg-primary text-white" id="vehiculo_id" name="vehiculo_id" value={dataForm.vehiculo_id} onChange={handlerChange}>
                  <option value={null}>Seleccione Vehiculo</option>
                  {dataVehiculo.map((item, i) => (
                    <option key={i} value={item.id}>{item.vehiculo}</option>
                  ))}
                </select>
                <label htmlFor="vehiculo_id" className="form-label text-black">Seleccione Vehiculo</label>
              </div>

              <div className="form-floating mb-3">
                <input type="date" className="form-control bg-primary text-white" id="fecha" name="fecha" value={moment(dataForm.fecha).format('YYYY-MM-DD')} onChange={handlerChange}/>
                <label htmlFor="fecha" className="form-label text-black">Fecha</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control bg-primary text-white" id="diagnostico" name="diagnostico" placeholder="Diagnostico" value={dataForm.diagnostico} onChange={handlerChange}/>
                <label htmlFor="diagnostico" className="form-label text-black">Diagnostico</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control bg-primary text-white" id="servicio" name="servicio" placeholder="Servicio" value={dataForm.servicio} onChange={handlerChange}/>
                <label htmlFor="servicio" className="form-label text-black">Servicio</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="kilometraje" name="kilometraje" value={dataForm.kilometraje} onChange={handlerChange}/>
                <label htmlFor="kilometraje" className="form-label text-black">Kilometraje</label>
              </div>

              <div className="form-floating mb-3">
                <input type="number" className="form-control bg-primary text-white" id="costos" name="costos" value={dataForm.costos} onChange={handlerChange}/>
                <label htmlFor="costos" className="form-label text-black">Costos</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control bg-primary text-white" id="notas_adicionales" name="notas_adicionales" placeholder="Notas Adicionales" value={dataForm.notas_adicionales} onChange={handlerChange}/>
                <label htmlFor="notas_adicionales" className="form-label text-black">Notas Adicionales</label>
              </div>

              <button type='submit' className='btn btn-primary'><i className="bi bi-floppy-fill"></i> Salvar</button>
              <Link to='/mantenimiento' className="m-1 btn btn-danger" title='Regresar al Grid'> Regresar</Link>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}