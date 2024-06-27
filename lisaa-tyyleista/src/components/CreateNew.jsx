import  { useField, useWindowWidth } from '../hooks'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url for more info:</Form.Label>
          <Form.Control {...info} />
        </Form.Group>
        <Button type='submit' variant='primary'>create</Button>
        <Button type='button' variant='secondary' onClick={handleReset}>reset</Button>
      </Form>
    </div>
  )
}

export default CreateNew