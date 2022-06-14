import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Navigation from './routes/navigation/navigation.component'
import Shop from './routes/shop/shop.component'
import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
        </Route>
      </Routes>
    </Fragment>
  )
}
export default App
