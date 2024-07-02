import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
function Filter() {
  const dispatch = useDispatch()

  const style = {
    margin: 10
  }

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div style={style}>
      <label htmlFor="filter">Suodata</label>
      <input
        id="filter"
        type="text"
        name="filter"
        onChange={handleChange}
        placeholder="..."
      />
    </div>
  )
}

export default Filter
