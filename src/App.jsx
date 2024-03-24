import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { Home } from './components/Home'
import { Marca } from './components/marca/Marca'
import { MarcaForm } from './components/marca/MarcaForm'
import { Modelo } from './components/modelo/Modelo'
import { ModeloForm }  from './components/modelo/ModeloForm'
import { Vehiculo } from './components/vehiculo/Vehiculo'
import { VehiculoForm } from './components/vehiculo/VehiculoForm'
import { EspecialidadMecanico } from './components/especialidad_mecanico/EspecialidadMecanico'
import { EspecialidadMecanicoForm } from './components/especialidad_mecanico/EspecialidadMecanicoForm'
import { Mecanico } from './components/mecanico/Mecanico'
import { MecanicoForm } from './components/mecanico/MecanicoForm'
import { Mantenimiento } from './components/mantenimiento/Mantenimiento'
import { MantenimientoForm } from './components/mantenimiento/MantenimientoForm'
import { Login } from './components/usuario/Login'
import { UserRegister } from './components/usuario/UserRegister'

import { HistorialVehiculo } from './components/HistorialVehiculo'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/user_register' element={<UserRegister/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/marca' element={<Marca/>} />
          <Route path='/marca_form/:id' element={<MarcaForm/>} />
          <Route path='/modelo' element={<Modelo/>} />
          <Route path='/modelo_form/:id' element={<ModeloForm/>} />
          <Route path='/vehiculo' element={<Vehiculo/>} />
          <Route path='/vehiculo_form/:id' element={<VehiculoForm/>} />
          <Route path='/especialidad_mecanico' element={<EspecialidadMecanico/>} />
          <Route path='/especialidad_mecanico_form/:id' element={<EspecialidadMecanicoForm/>} />
          <Route path='/mecanico' element={<Mecanico/>}/>
          <Route path='/mecanico_form/:id' element={<MecanicoForm/>}/>
          <Route path='/mantenimiento' element={<Mantenimiento/>} />
          <Route path='/mantenimiento_form/:id' element={<MantenimientoForm/>} />

          <Route path='/historial_vehiculo' element={<HistorialVehiculo/>}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App