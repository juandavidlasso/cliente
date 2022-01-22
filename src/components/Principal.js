import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { crearNuevoAcronimoAction, obtenerSignificadoApi } from '../redux/actions/acronimoActions'

const Principal = () => {

    // Estado
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [peticion, setPeticion] = useState({
        acronimo: ''
    })

    // OnChange
    const actualizarState = e => {
        setPeticion({
            ...peticion,
            [e.target.name]: e.target.value
        })
    }

    // Obtengo dato
    const { acronimo } = peticion

    // Función que ejecuta el dispatch del action para insertar en la DB
    const agregarAcronimoRedux = (acroni) => dispatch( crearNuevoAcronimoAction(acroni) )
    // Función que ejecuta el dispatch del action que consulta el API para obtener el significado
    const obtenerSignificados = (dato) => dispatch( obtenerSignificadoApi(dato) )
    

    // Petición submit
    const submitPeticion = async(e) => {
        e.preventDefault()
    
        // Validar
        if(acronimo.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el acrónimo',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            return
        }

        // Valido que solo sea texto sin espacios
        var patron = /^[a-zA-Z]+$/
        if(patron.test(acronimo) === false) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Solo texto sin espacios.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            return
        }

        // Llamo la función que guardar el acrónimo
        agregarAcronimoRedux(acronimo)
        // Llamo la función que consulta el API
        obtenerSignificados(acronimo)

        // Mensaje de espera mientras consulta y redirijo a la vista para mostrar el resultado de la consulta
        Swal.fire({
            icon: 'info',
            title: 'Consultando',
            text: 'Estamos consultando el API.',
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2500
        }).then( () => {
            navigate('/resultado')
        })
    }

    return (
        <div className='row'>
            <div className='col s12 p-0 m-0' style={{textAlign: 'right'}}>
                <button type='button' className='btnBack' onClick={() => navigate('/consultados')}>Ver acrónimos consultados</button>
            </div>
            <div className="col s6 offset-s3 panel">
                <p>Ingrese el acrónimo o una inicial</p>
                <div className="row">
                    <form onSubmit={submitPeticion} className="col s12">
                        <div className="row">
                            <div className="input-field col s10">
                                <input type="text" name='acronimo' placeholder='Ingrese el acrónimo o una inicial' className="validate" value={acronimo} onChange={actualizarState} />
                            </div>
                            <div className='center'>
                                <input type="submit" value="Consultar" className='btnConsulta' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Principal;