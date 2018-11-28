import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const NodeLink = ({ config }) => (console.log('yo', config) ||
  <Link as={`/node/${config.config.key}`} href={`/node?${serialize(config)}`}>
    <a>Yo {config.config.key}</a>
  </Link>
)

export default ({ url: { query } }) => (
  <Layout>
    <h1>OTIM</h1>
    <pre>
{/*        {
            JSON.stringify(query, null, 4)
        }
*/}    </pre>
    <div>
    {
        query.query.nodes.map(node => (
            <NodeLink config={getNodeConfig(node, query.query.contentMap)}/>
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
