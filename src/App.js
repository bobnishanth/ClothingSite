import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Navigation from './routes/navigation/navigation.component'
import Shop from './routes/shop/shop.component'
import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react'
import Checkout from './components/checkout/checkout.component'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />}></Route>
        </Route>
      </Routes>
    </Fragment>
  )
}
export default App
