import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const NodeLink = ({ config }) => (
  <Link as={`/n/${config.config.key}`} href={`/node?${serialize(config)}`}>
    <a>Yo {config.config.key}</a>
  </Link>
)

export default ({ url: { query } }) => (
  <Layout>
    <h1>OTIM</h1>
    <div>
    {
        query.nodes.map(node => (
            <NodeLink config={getNodeConfig(node, query.contentMap)}/>
        ))
    }
    </div>
    {JSON.stringify(query, null, 4)}

  </Layout>
)


function getNodeConfig(node, contentMap) {
    return {
        config: node,
        content: contentMap[node.key],
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
