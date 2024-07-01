
# Fullstackopen - osa 4

[fullstackopen osa 4](https://fullstackopen.com/osa4)

## Backend

Tehdään uusi Node-projekti
```
npm init
npm install eslint
npm install express
npm install dotenv
npm install express
npm install mongodb
npm install mongoose
npm install cors
npm install morgan --save
npm install --save-dev nodemon
```

## ESLint

Suosittu työkalu JavaScriptissä staattiseen analyysiin eli "linttaukseen" on [ESLint](https://archive.eslint.org/docs/user-guide/getting-started)

```
npm install eslint --save-dev
npm init @eslint/config@latest

```

### Lisäosat

[Lisäosat](https://eslint.style/packages/js): 

```
npm install --save-dev eslint @eslint/js
npm install --save-dev @stylistic/eslint-plugin-js
```

### MongoDB

Käytetään [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) palvelun tarjoamaa NoSQL tietokantaa


# Frontend

Luodaan frontend-alihakemistoon Vite-projekti:
```
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios
npm run dev
```

## Lokaali testaus

Käynnistetään backend: `npm run dev`
Käynnistetään frontend: `npm run dev`
Mennään selaimella osoitteeseen: `http://localhost:5173/`

## Lokaali testaus frontendin tuotantokoodilla

Frontendin sovelluskehitysmoodia varten Viten konfiguraation on määritelty proxyasetukset, joiden perusteella React toimii lokaalissa ympäritössä proxynä.
Jos React-koodi tekee HTTP-pyynnön palvelimen johonkin osoitteeseen, joka ei ole React-sovelluksen vastuulla (eli kyse ei ole esim. sovelluksen JavaScript-koodin tai CSS:n lataamisesta), lähetetään pyyntö edelleen osoitteessa http://localhost:3001 olevalle palvelimelle.

Backendissä generoidaan frontendin tuotantokoodi: `npm run build:ui`
Käynnistetään backend: `npm run dev`
Mennään selaimella osoitteeseen: `http://localhost:3001/`

### Same origin policy ja CORS
Koska palvelin on localhostin portissa 3001 ja frontend localhostin portissa 5173, niiden origin ei ole sama.
Muista origineista tulevat pyynnöt voidaan sallia kaikkiin backendin Express routeihin käyttämällä Noden cors-middlewarea.

```
npm install cors

const cors = require('cors')

app.use(cors())

```

## Testaus

Asennetaan Jestin SuperTest kirjastoa

```
npm install --save-dev supertest
```

# Ympärsitömuuttuja / NODE_ENV

Pitää asentaa `cross-env` jotta NODE_ENV voidaan määritellä Windows:ssa

```
npm install --save-dev cross-env
```

# awsync / await miten päästään eroon try - catch lohkoisa

express-async-errors -kirjastoa käytettäessä ei tarvita
erillisiä avulla try-catch lohkoja eikä next(exception) funktiokutsu. Kirjasto hoitaa asian konepellin alla, eli jos async-funktiona määritellyn routen sisällä syntyy poikkeus, siirtyy suoritus automaattisesti virheenkäsittelijämiddlewareen.

`npm install express-async-errors`


# Kirjautuminen

JSON web token generoidaan jsonwebtoken-kirjaston avulla.
.env tiedostoon talletetaan testailua varten:
`SECRET=1dfae605-829f-47d8-bfca-536aa7e7eec1`


Kryptauksessa käytetään bcryptjs kirjastoa (bcrypt kirjasston kanssa
voi olla ongelmia Windowsin kanssa)

```

npm install  bcryptjs
npm install jsonwebtoken
```

# Fullstackopen - osa 5 - frontend

[fullstackopen osa 5](https://fullstackopen.com/osa5)

## Kirjautuminen frontendissa

## props.children ja proptypet

useRef hookilla luodaan ref, joka kiinnitetään child-komponentin sisältävälle parent-komponentille. Nyt siis ref-muuttuja toimii viitteenä komponenttiin.
Komponentin luova funktio on kääritty funktiokutsun forwardRef sisälle, jolloin komponentti pääsee käsiksi sille määriteltyyn refiin.

Komponentti tarjoaa useImperativeHandle-hookin avulla sisäisesti määritellyn funktionsa ulkopuolelta kutsuttavaksi - xxxRef.current.yyy()

### Proptypet

Komponentin olettamat ja edellyttämät propsit ja niiden tyypit voidaan määritellä kirjaston prop-types

```
npm install prop-types
```

## React-sovellusten testaaminen

React-komponenttien testaamiseen voidaan käyttää Facebookin kehittämää Jest-kirjastoa. Viten kehittäjien uuden generaation Vitest-testikirjastot tarjoavat saman ohjelmointirajapinnan, joten testauskoodissa ei käytännössä ole mitään eroa.

```
npm install --save-dev vitest jsdom
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev eslint-plugin-vitest-globals
```

Screen -objektin sisällön tulostus konsoliiin
```
screen.debug()

const element = screen.getByText('Foobar')
screen.debug(element)
```

### Nappien painelu

user-event -kirjaston avulla voidaan painella nappeja

```
npm install --save-dev @testing-library/user-event
```

## End to end -testaus: Playwright

### Testien kehittäminen ja debuggaaminen

Debug test case:

```
npm test -- -g'likes can be increased' --debug

await page.pause()
```

UI mode: `npm run test -- --ui`

Trace:

```
npm run test -- --trace on
npx playwright show-report
```


# Fullstackopen - osa 7

[Tehtävät 7.9 - 7.13](https://fullstackopen.com/osa7/tehtavia_blogilistan_laajennus#tehtavat-7-9-7-21)


## Koodin automaattinen muotoilu - tehtävä 7.9

### ESLint

#### Backend

Asennetaan ESLint, joka käyttää uuttaa [flat-konfiguraatiota](https://eslint.org/blog/2022/08/new-config-system-part-2/)

[Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)


```
npm init @eslint/config@latest
```

Backendille valitaan sourcetypeksi `commonjs` (require / export) ja jätetään linttauksesta pois bloglist-frontend-alihakemisto,
jossa on käytössä ECMAScript moduulit (import / export)

#### Frontend


Viten mukana ESlint on valmiiksi asennettu - tämä versio käyttää vanhaa konfiguraatiota.

### Prettier

Asennetaan kehitysaikaiset kirjastot:
```
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier prettier

```

eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier.

eslint-plugin-prettier - Runs Prettier as an ESLint rule


#### Backend

`eslint.config.mjs` tiedostossa

Tehdään `.prettierrc` tiedosto.
Tehdään `.prettierignore` tiedosto ja lisätään sinne mm. bloglist-frontend hakemisto


#### Frontend


`.eslintrc.cjs` tiedostoon lisätään

```
  plugins: [
    ...
    'prettier'
  ],
  extends: [
    ...
    'plugin:prettier/recommended',
  ],
```

Tehdään `.prettierrc` tiedosto.
Tehdään `.prettierignore` tiedosto ja lisätään sinne mm. bloglist-frontend hakemisto

## Tilan hallinta: Redux

https://fullstackopen.com/osa6/flux_arkkitehtuuri_ja_redux


Redux-store sovelluksen voi välittää komponenteille React Redux-kirjaston tarjoamalla hooks-rajapinnalla:
```
npm install react-redux
```

React Redux ‑kirjaston tarjoama useDispatch-hook tarjoaa mille tahansa React-komponentille pääsyn tiedostossa main.jsx määritellyn Redux-storen dispatch-funktioon, jonka avulla komponentti pääsee tekemään muutoksia Redux-storen tilaan.

Storeen talletettuihin muistiinpanoihin komponentti pääsee käsiksi React Redux ‑kirjaston useSelector-hookin kautta.

### Redux Toolkit
Toolkitillä vältetään turha toisto. Esim. configureStore-funktion configureStore funktiolla päästään eroon combineReducers funktiosta. configureStore-funktion käytöstä on myös monia muita hyötyjä, kuten kehitystyökalujen ja usein käytettyjen kirjastojen vaivaton käyttöönotto ilman erillistä konfiguraatiota. 

Asennetaan Redux toolkit
```
npm install @reduxjs/toolkit
```

Redux-storen alustus Redux Thunk ‑kirjaston avulla voi lisätä asynkronisiä funktiota actioniin, jotka ensin odottavat jonkin asynkronisen toimenpiteen valmistumista ja vasta sen jälkeen dispatchaavat varsinaisen actionin.

 Huom. Redux Thunk-kirjaston käyttö ei vaadi ylimääräistä konfiguraatiota eikä asennusta, kun Redux-store on luotu Redux Toolkitin configureStore-funktiolla
 
