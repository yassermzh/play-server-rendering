import React from 'react'
import ReactDom from 'react-dom/server'
import { match, RouterContext } from 'react-router'

const App = (props) => <div><h1>app</h1>{props.children}</div>
const Page1 = (props) => <div>Page1! id={props.params.id}</div>
const routes = {
  path: '/',
  component: App,
  childRoutes: [{
    path: '/page1/:id',
    component: Page1,
  }]
}

match({ routes, location: '/page1/2?q=3' }, (error, redirectLocation, renderProps) => {
  if (error) { console.log('failed! error=', error); return }
  else {
    // console.log('renderProps=', Object.keys(renderProps))
    const rendered = ReactDom.renderToStaticMarkup(<RouterContext {...renderProps} />)
    console.log('rendered=', rendered)
  }
})
