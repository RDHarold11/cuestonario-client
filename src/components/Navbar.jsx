import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className='bg-[#114232] h-10 text-white px-10 py-10 w-full'>
        <div className='flex h-full items-center justify-end'>
            <ul className='flex items-center gap-5'>
                <Link to="/">Lideres</Link>
                <Link to="/cuestonario">Crear evaluaciones</Link>
                <Link>Estadisticas</Link>
                <li>Salir</li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar