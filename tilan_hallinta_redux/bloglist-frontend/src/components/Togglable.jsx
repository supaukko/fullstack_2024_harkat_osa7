import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { toggleVisibility } from '../reducers/togglableReducer'
import { useDispatch, useSelector } from 'react-redux'

const Togglable = forwardRef((props) => {
  const dispatch = useDispatch()
  const togglable = useSelector((store) => store.togglable)
  console.log('Togglable', togglable)

  const hideWhenVisible = { display: togglable.visible ? 'none' : '' }
  const showWhenVisible = { display: togglable.visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => dispatch(toggleVisibility())}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div className="border">{props.children}</div>
        <button onClick={() => dispatch(toggleVisibility())}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
