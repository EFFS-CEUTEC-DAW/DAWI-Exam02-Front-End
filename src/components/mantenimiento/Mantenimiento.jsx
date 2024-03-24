import { Link } from 'react-router-dom'
import { MantenimientoGrid } from './MantenimientoGrid'

export const Mantenimiento = () => {
  return (
    <>
      <div className='d-flex-row justify-content-center align-items-center' style={{Height: `100vh`}}>
        <MantenimientoGrid />
        <hr/>
        <Link to='/home' className="m-1 btn btn-primary" title='Regresar al Menu'> Regresar</Link>
      </div>
    </>
  )
}
