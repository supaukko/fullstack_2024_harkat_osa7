import  { useField, useWindowWidth } from '../hooks'
import {
  Button,
  TextField,
} from '@mui/material'

const CreateNew = (props) => {
  const {set: contentSet, ...content} = useField('content', 'text')
  const {set: authorSet, ...author} = useField('author', 'text')
  const {set: infoSet, ...info} = useField('info', 'text')
  const width = useWindowWidth()

  const handleSubmit = (e) => {
    console.log('handleSubmit')
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    // console.log('handleReset')
    contentSet('')
    authorSet('')
    infoSet('')
  }

  return (
    <div>
      <h2>create a new anecdote (window width={width})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='content' {...content} />
        </div>
        <div>
          <TextField label='author' {...author} />
        </div>
        <div>
          <TextField label='url for more info' {...info} />
        </div>
        <Button type='submit' variant="contained" color="primary">create</Button>
        <Button type='button' variant="contained" color="secondary" onClick={handleReset}>reset</Button>
      </form>
    </div>
  )
}

export default CreateNew