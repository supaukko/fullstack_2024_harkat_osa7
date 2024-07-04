import {
  useVisibilityValue,
  useVisibilityDispatch
} from '../contexts/VisibilityContext'
import PropTypes from 'prop-types'

/**
 * Komponentin luova funktio on kääritty funktiokutsun forwardRef sisälle,
 * jolloin komponentti pääsee käsiksi sille määriteltyyn refiin.
 * Komponentti tarjoaa useImperativeHandle-hookin avulla sisäisesti
 * määritellyn funktionsa toggleVisibility ulkopuolelta kutsuttavaksi
 */
const Togglable = (props) => {
  const visibilityDispatch = useVisibilityDispatch()
  const data = useVisibilityValue()
  const hideWhenVisible = { display: data?.visible ? 'none' : '' }
  const showWhenVisible = { display: data?.visible ? '' : 'none' }

  const toggleVisibility = () => {
    visibilityDispatch({ type: 'BLOG_FORM_VISIBILITY' })
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div className="border">{props.children}</div>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
