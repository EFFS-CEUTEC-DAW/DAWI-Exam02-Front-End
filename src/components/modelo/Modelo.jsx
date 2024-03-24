import { Link } from 'react-router-dom'
import ModeloGrid from './ModeloGrid'

export const Modelo = () => {
  return (
    <>
      <div className='d-flex-row justify-content-center align-items-center' style={{Height: `100vh`}}>
        <ModeloGrid />
        <hr/>
        <Link to='/home' className="m-1 btn btn-primary" title='Regresar al Menu'> Regresar</Link>
      </div>
    </>
  )
}
