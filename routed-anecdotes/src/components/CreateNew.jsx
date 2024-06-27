import  { useField, useWindowWidth } from '../hooks'

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
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew