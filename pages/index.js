import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = ({id, title}) => (
  <Link as={`/n/${id}`} href={`/node?title=${title}`}>
    <a>{title}</a>
  </Link>
)

export default () => (
  <Layout>
    <h1>OTIM</h1>
    <ul>
      <PostLink id="blah" title="blah"/>
    </ul>
  </Layout>
)
