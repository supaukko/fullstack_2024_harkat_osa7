import { createContext, useReducer, useContext } from 'react'

const initialState = {
  filter: ''
}

const filterReducer = (state, action) => {
  if (action.type === 'CHANGE_FILTER') {
    return { ...state, ...action.payload }
  }
  return state
}

const FilterContext = createContext()

export const useFilter = () => useContext(FilterContext)

export const useFilterValue = () => {
  const filterAndDispatch = useContext(FilterContext)
  if (filterAndDispatch !== undefined) {
    return filterAndDispatch[0]
  }
  return null
}

export const useFilterDispatch = () => {
  const filterAndDispatch = useContext(FilterContext)
  if (filterAndDispatch !== undefined) {
    return filterAndDispatch[1]
  }
  return null
}

export const useChangeFilter = () => {
  const filterAndDispatch = useContext(FilterContext)
  if (filterAndDispatch !== undefined) {
    return filterAndDispatch[2]
  }
  return null
}

export const FilterContextProvider = ({ children }) => {
  const [filter, filterDispatch] = useReducer(filterReducer, initialState)

  const changeFilter = (value) => {
    filterDispatch({
      type: 'CHANGE_FILTER',
      payload: { filter: value }
    })
  }

  return (
    <FilterContext.Provider value={[filter, filterDispatch, changeFilter]}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContext
