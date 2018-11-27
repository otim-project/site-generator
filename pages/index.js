import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = ({id, title}) => (
  <li>
    <Link as={`/n/${id}`} href={`/node?title=${title}`}>
      <a>{title}</a>
    </Link>
  </li>
)

export default () => (
  <Layout>
    <h1>OTIM</h1>
    <ul>
      <PostLink id="blah" title="blah"/>
    </ul>
  </Layout>
)
