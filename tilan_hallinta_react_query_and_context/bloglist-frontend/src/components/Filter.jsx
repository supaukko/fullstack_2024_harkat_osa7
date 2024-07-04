import { useFilterValue, useChangeFilter } from '../contexts/FilterContext'
function Filter() {
  const { filter } = useFilterValue()
  const changeFilter = useChangeFilter()

  const style = {
    margin: 10
  }

  const handleChange = (event) => {
    console.log('Filter - handleChange', event.target.value)
    changeFilter(event.target.value)
  }

  return (
    <div style={style}>
      <label htmlFor="filter">Suodata</label>
      <input
        id="filter"
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        placeholder="..."
      />
    </div>
  )
}

export default Filter
