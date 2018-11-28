import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const linkStyle = {
  padding: 20,
  cursor: 'pointer'
}

const NodeLink = ({ config }) => (
  <Link as={`/node/${config.config.key}`} href={`/node?${serialize(config)}`}>
    <div style={linkStyle}>
        <div className='node-link-container'>
          <div className="node-link-title">{config.meta.title}</div>
          <div className="node-link-author">{config.meta.author}</div>
        </div>
        <style jsx>{`
            .node-link-title {
              font-size: 2em;
              line-height: 1.3em;
            }
            .node-link-container {
              max-width: 300px;
              height: 400px;
              padding: 50px;
              border-radius: 5px;
              box-shadow: 10px 26px 88px -15px rgba(0,0,0,0.24);
              color: #fff;
              background-color: #f4b042;
              margin: auto;
              transition: all 0.5s ease;
            }
            .node-link-container:hover {
              opacity: .5;
            }
            .node-link-author {
              color: rgba(0, 0, 0, 0.5);
              margin-top: 20px;
            }
        `}</style>
    </div>
  </Link>
)

export default ({ url: { query } }) => (
  <Layout>
    <div>
    <div className='home-header'>
    <div className='header-img'>
      <img src='/static/img/header-img.png'/>

    </div>
    </div>
    <div className="columns books-container">
    {
        query.nodes.map(node => (
          <div className="column">
            <NodeLink config={getNodeConfig(node, query)}/>
          </div>
        ))
    }
    </div>

    <style jsx>{`
        .header-img {
          max-width: 500px;
          margin: auto;
          pointer-events: none;
        }
        .books-container {
          padding-top: 30px;
          padding-bottom: 150px;
        }
    `}</style>

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
