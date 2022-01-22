import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { obtenerAcronimosAction } from '../redux/actions/acronimoActions'

const Consultados = () => {

    // Estado
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        // Función para llamar el dispatch del action que consulta los significados en la DB 
        // que han sido consultados
        const consultarDatos = () => dispatch( obtenerAcronimosAction() )
        consultarDatos()
    }, [])

    // Accedo al state de Redux para obtener los acrónimos consultados en la DB
    const mostrarProductos = useSelector( state => state.acronimos.acronimos)

    return (
        <div className='row'>
            <div className='col s12 p-0 m-0'>
                <button type='button' className='btnBack' onClick={() => navigate('/principal')}>Regresar</button>
            </div>
            <div className="col s12 p-0 m-0 panel1">
                <h1>Arónimos consultados</h1>
                {mostrarProductos.length === 0 ?
                    'No hay acrónimos consultados'
                :
                    mostrarProductos.map(datos => {
                        const {Id, Acronimo} = datos
                        return (
                            <ul key={Id}>
                                <li>
                                    {Acronimo}
                                </li>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Consultados;