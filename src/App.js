import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Principal from './components/Principal'
import Resultado from './components/Resultado'
import Consultados from './components/Consultados'
import { Provider } from 'react-redux'
import store from '../src/redux/store'

const App = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <Provider store={store}>
          <Routes>
            <Route path='/principal' element={ <Principal /> } />
            <Route path='/resultado' element={ <Resultado /> } />
            <Route path='/consultados' element={ <Consultados /> } />
            <Route path="*" element={<Navigate to="/principal" />} />
          </Routes>
        </Provider>
      </div>
    </div>
  );
}

export default App;
