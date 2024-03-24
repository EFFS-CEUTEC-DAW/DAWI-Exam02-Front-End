import { Link } from 'react-router-dom'
import VehiculoGrid from './VehiculoGrid'

export const Vehiculo = () => {
  return (
    <>
      <div className='d-flex-row justify-content-center align-items-center' style={{Height: `100vh`}}>
        <VehiculoGrid />
        <hr/>
        <Link to='/home' className="m-1 btn btn-primary" title='Regresar al Menu'> Regresar</Link>
      </div>
    </>
  )
}
