import Layout from '../components/MyLayout.js'

export default (props) => (
    <Layout>
        <pre>
       {JSON.stringify(props.url.query, null, 4)}
       </pre>
    </Layout>
)
