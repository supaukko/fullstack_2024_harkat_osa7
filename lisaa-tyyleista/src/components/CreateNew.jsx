import { useField, useWindowWidth } from '../hooks'
import { Form, Input, Button } from './styled'

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
        <div>
          content
          <Input {...content} />
        </div>
        <div>
          author
          <Input {...author} />
        </div>
        <div>
          url for more info
          <Input {...info} />
        </div>
        <Button type='submit'>create</Button>
        <Button type='button' onClick={handleReset}>reset</Button>
      </Form>
    </div>
  )
}

export default CreateNew