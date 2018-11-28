import Layout from '../components/MyLayout.js'

export default ({url: {query: {meta, staticDir, config, content}}}) => (
    <Layout>
        <div>
            <div className="node-header">
                <div className="node-repo-container">
                <a className="node-repo" href={`https://github.com/${config.repo}`}>{config.repo}</a>
                </div>
                <div className="node-title">{meta.title}</div>
                <div className="node-author">{meta.author}</div>
                <div className="node-date">Published {meta.date}</div>
            </div>
            <div className="content">
                {renderContent(content, staticDir)}
            </div>
            <style jsx>{`
                .content {
                    max-width: 700px;
                    margin: auto;
                }
                .node-header {
                    max-width: 750px;
                    margin: auto;
                    padding-top: 50px;
                    padding-bottom: 50px;
                }
                .node-title {
                    font-size: 2.5em;
                }

                .node-author {
                    font-size: 1.5em;
                    margin: 20px 0;
                }

                .node-date {
                    color: rgba(0, 0, 0, 0.3);
                    margin: 10px 0;
                    display: inline-block;
                }
                .node-repo-container {
                    text-align: right;
                    display: block;
                    margin-bottom: 150px;
                }
                .node-repo {
                    text-align: right;
                    font-size: .8em;
                    padding: 30px;
                    border-radius: 5px;
                    box-shadow: 10px 26px 88px -15px rgba(0,0,0,0.1);
                    color: #fff;
                    background-color: #f4b042;
                    margin: auto;
                    transition: all 0.5s ease;
                    letter-spacing: 2px;
                }
                .node-repo:hover {
                  opacity: .5;
                }

            `}</style>

        </div>
    </Layout>
)

function renderContent(content, staticDir) {
    return content.map(
        ({title, path, sub}) => (
            <div className='chapter-container'>
                <div className='chapter-header'>
                <div className='chapter-name'>{title}</div>
                {
                    path && staticDir[path] ? (
                        <a className='chapter-link' href={`/static/built/${staticDir[path]}`}>pdf</a>
                    ) : ''
                }
                </div>
                {
                    sub ? (
                        <div className='sub-chapter'>
                            {renderContent(sub, staticDir)}
                        </div>
                    ): ''
                }

                <style jsx>{`
                    .chapter-header {
                        padding: 10px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }
                    .chapter-name {
                        display: inline-block;
                    }
                    .chapter-link {
                        margin-left: 10px;
                    }
                    .sub-chapter {
                        margin-left: 30px;
                    }
                `}</style>

            </div>
        )
    )
}