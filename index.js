import React from 'react'
import ReactDom from 'react-dom/server'

const App = () => <div>app</div>

const rendered = ReactDom.renderToStaticMarkup(<App />)
console.log('rendered=', rendered)
