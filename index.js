import React from 'react'
import ReactDOM from 'react-dom/server'
import { match } from 'react-router'
import Relay from 'react-relay'
import IsomorphicRouter from 'isomorphic-relay-router'
import { runQuery } from './data/schema'

const App = (props) => <div><h1>app</h1>{props.children}</div>
const Page1 = Relay.createContainer((props) => <div>page1! {props.promotion.title}</div>, {
  fragments: {
    promotion: () => Relay.QL` fragment on Promotion { title } `
  }
})
const rootQuery = { promotion: (Component) => Relay.QL` query { promotion { ${Component.getFragment('promotion')} } }` }

const routes = {
  path: '/',
  component: App,
  childRoutes: [{
    path: '/page1/:id',
    component: Page1,
    queries: rootQuery,
  }]
}

var myNetworkLayer = {
  sendQueries(queryRequests) {
    // console.log('queryRequests=', queryRequests)
    return Promise.all(queryRequests.map(
      queryRequest => {
        runQuery().then(res => {
          if (res.data)
            queryRequest.resolve({ response: res.data })
          else {
            console.log('failed to run query!')
            queryRequest.reject({})
          }
        })
      }
    ))
  },
  sendMutation(mutationRequest) { /* ... */ },
  supports(...options) { return true }
}

match({ routes, location: '/page1/2?q=3' }, (error, redirectLocation, renderProps) => {
  if (error) { console.log('failed! error=', error); return }
  else {
    IsomorphicRouter.prepareData(renderProps, myNetworkLayer)
      .then(({ data, props }) => {
        const rendered = ReactDOM.renderToStaticMarkup(IsomorphicRouter.render(props))
        console.log('rendered=', rendered)
      })
      .catch((err) => { console.log('failed!, err=', err) })
  }
})
