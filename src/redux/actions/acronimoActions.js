import {
    AGREGAR_ACRONIMO,
    AGREGAR_ACRONIMO_EXITO,
    AGREGAR_ACRONIMO_ERROR,
    COMENZAR_CONSULTA,
    COMENZAR_CONSULTA_EXITO,
    COMENZAR_CONSULTA_ERROR,
    COMENZAR_CONSULTA_API,
    COMENZAR_CONSULTA_API_EXITO,
    COMENZAR_CONSULTA_API_ERROR } from '../types'
import Swal from 'sweetalert2'
import axios from 'axios'

// Función para agregar nuevo acrónimo
export function crearNuevoAcronimoAction(acronimo) {
    return async (dispatch) => {
        dispatch( agregarAcronimo() )

        try {
            // Insertar en la DB
            await axios({
                method: 'POST',
                url: 'http://localhost:4000/api/insert',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    Acronimo: acronimo
                }
            })
            
            dispatch( agregarAcronimoExito(acronimo) )
        } catch (error) {
            dispatch( agregarAcronimoError(true) )
            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un error, ${error}`,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
        }
    }
}

const agregarAcronimo = () => ({
  type: AGREGAR_ACRONIMO,
  payload: true
})

// Si se guarda con éxito en la DB
const agregarAcronimoExito = acronimo => ({
  type: AGREGAR_ACRONIMO_EXITO,
  payload: acronimo
})

// Si ocurre un error al guardar en la DB
const agregarAcronimoError = estado => ({
  type: AGREGAR_ACRONIMO_ERROR,
  payload: estado
})



// Función para consultar los acrónimos en la DB
export const obtenerAcronimosAction = () => {
    return async (dispatch) => {
        dispatch( consultarAcronimos() )

        try {
            const respuesta = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/consultados'
            })
            
            dispatch( consultarAcronimosExitosa(respuesta.data) )
        } catch (error) {
            dispatch( consultarAcronimosError() )
            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un error, ${error}`,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
        }
    }
}

const consultarAcronimos = () => ({
  type: COMENZAR_CONSULTA,
  payload: true
})

// Si se consulta con éxito en la DB
const consultarAcronimosExitosa = acronimos => ({
  type: COMENZAR_CONSULTA_EXITO,
  payload: acronimos
})

// Si ocurre un error al consultar en la DB
const consultarAcronimosError = () => ({
  type: COMENZAR_CONSULTA_ERROR,
  payload: true
})




// Función para consultar el significado en la API
export const obtenerSignificadoApi = (acronimo) => {
    return async (dispatch) => {
        dispatch( consultarApi() )

        try {
            const respuesta = await axios({
                method: 'GET',
                url: `http://www.nactem.ac.uk/software/acromine/dictionary.py`,
                params: {
                    sf: acronimo
                }
            })
            
            dispatch( consultarApiExito(respuesta.data) )
        } catch (error) {
            dispatch( consultarApiError() )
            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Hubo un error, ${error}`,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
        }
    }
}

const consultarApi = () => ({
  type: COMENZAR_CONSULTA_API,
  payload: true
})

// Si se consulta con éxito en la API
const consultarApiExito = significados => ({
  type: COMENZAR_CONSULTA_API_EXITO,
  payload: significados
})

// Si ocurre un error al consultar la API
const consultarApiError = () => ({
  type: COMENZAR_CONSULTA_API_ERROR,
  payload: true
})