# [Fullstackopen osa 7 - Lisää tyyleistä](https://fullstackopen.com/osa7/lisaa_tyyleista)

## [React-Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction/)

`npm install react-bootstrap`

### stylesheet

React-Bootstrap doesn't depend on a very precise version of Bootstrap,
it's not shipped with any included CSS. However, some stylesheet is required to use these components

Lisään index.html tiedostoon CDN:

```
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>
```

## [MaterialUI](https://mui.com/)

`npm install @mui/material @emotion/react @emotion/styled`

Renderöidään koko App Container sisään:

```
import { Container } from '@mui/material'

const App = () => {
  // ...
  return (
    <Container>
      // ...
    </Container>
  )
}

```

