import { Link } from 'react-router-dom'
import { MecanicoGrid } from './MecanicoGrid'

export const Mecanico = () => {
  return (
    <>
      <div className='d-flex-row justify-content-center align-items-center' style={{Height: `100vh`}}>
        <MecanicoGrid />
        <hr/>
        <Link to='/home' className="m-1 btn btn-primary" title='Regresar al Menu'> Regresar</Link>
      </div>
    </>
  )
}
