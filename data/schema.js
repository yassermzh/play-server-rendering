import { graphql, buildSchema } from 'graphql'
var schema = buildSchema(`
  type Query {
    promotion: Promotion
  }
  type Promotion {  
    title: String
  }
`)

var root = {
  promotion() { return { title: 'fakes shoes' } }
}

export const runQuery = () =>
  graphql(schema, ' { promotion { title } }', root)

export default schema