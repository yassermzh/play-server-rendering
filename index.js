import React from 'react'
import ReactDom from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const store = createStore((state = {}, action) => ({ x: 1 }), {})

const App = (props) => <div><h1>app</h1>{props.children}</div>
const Page1 = connect((state) => state)(
  props => <div>Page1! id={props.params.id}, x={props.x}</div>
)
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
    const rendered = ReactDom.renderToStaticMarkup(
      <Provider store={store}><RouterContext {...renderProps} /></Provider>
    )
    console.log('rendered=', rendered)
  }
})
