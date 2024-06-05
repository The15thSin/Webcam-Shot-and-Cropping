import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Crop from './components/Crop/Crop'
import Landing from './components/Landing/Landing'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Landing />
        } />
        <Route path = '/crop' element={
          <Crop />
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
