import { createContext, useState, useEffect } from 'react'
import SHOP_DATA from '../shop-data/shop-data'
//import { addCollectionAndDocuments } from '../utils/firebase.util' -----runs only once at the time of creation then comment it for further understadning
import { getCategoriesAndDocuments } from '../utils/firebase.util'
export const CategoriesContext = createContext({
  categoriesMap: {},
  // setShopObject: () => PRODUCTS,
})
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, []) ----runs only once at the time of creation then comment it for further understadning

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  })

  const value = { categoriesMap }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
