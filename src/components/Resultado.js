import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Resultado = () => {

    // Estado
    const navigate = useNavigate()

    // Obtengo los significados consultando en el state de Redux
    const verSignificados = useSelector( state => state.significados.significados)

    return (
        <div className='row'>
            <div className='col s12 p-0 m-0'>
                <button type='button' className='btnBack' onClick={() => navigate('/principal')}>Regresar</button>
            </div>
            <div className="col s12 p-0 m-0 panel1">
                {verSignificados.length === 0 ?
                    <p className='center' style={{fontSize: '1.5rem', fontWeight: 'bold'}}>No existen significados para este acrónimo</p>
                :
                    verSignificados.map(peticion => {
                        const {lfs, sf} = peticion
                        return (
                            <Fragment key={sf}>
                                <h1>Arónimo {sf}</h1>
                                {lfs.map(data => {
                                    const {freq, lf, since, vars} = data
                                    return (
                                        <p key={freq}>
                                            <span style={{fontWeight: 'bold'}}>lf:</span> {lf}, <span style={{fontWeight: 'bold'}}>freq:</span> {freq}, <span style={{fontWeight: 'bold'}}>since:</span> {since}
                                            {vars.map(peticiones => {
                                                const {lf, freq, since} = peticiones
                                                return (
                                                    <Fragment key={lf}>
                                                        <br />
                                                        <span style={{marginLeft: '10%'}} key={lf}>
                                                            <span style={{fontWeight: 'bold'}}>lf:</span> {lf}, <span style={{fontWeight: 'bold'}}>freq:</span> {freq}, <span style={{fontWeight: 'bold'}}>since:</span> {since} <br />
                                                        </span>
                                                    </Fragment>
                                                )
                                            })}
                                        </p>
                                    )
                                })}
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Resultado;