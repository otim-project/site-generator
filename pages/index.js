import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const linkStyle = {
  padding: 20,
  cursor: 'pointer'
}

const NodeLink = ({ config }) => (
  <Link as={`/node/${config.config.key}`} href={`/node?${serialize(config)}`}>
    <div style={linkStyle}>
        <div>{config.meta.title}</div>
        <div>{config.meta.author}</div>
    </div>
  </Link>
)

export default ({ url: { query } }) => (
  <Layout>
    <h1>OTIM</h1>
    <div>
    {
        query.nodes.map(node => (
            <NodeLink config={getNodeConfig(node, query)}/>
        ))
    }
    </div>

  </Layout>
)


function getNodeConfig(node, { contentMap, metaMap }) {
    return {
        config: node,
        content: contentMap[node.key],
        meta: metaMap[node.key],
    }
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
