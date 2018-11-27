const octokit = require('@octokit/rest')()
const yaml = require('js-yaml');

module.exports = { getSiteConfig }

async function getSiteConfig() {
    const config = await getConfig();
    return formatSiteConfig(config);
}

function formatSiteConfig({nodes, contentMap}) {
    return nodes.reduce((result, config) => ({
        ...result,
        [config.key]: {
            page: `/node/${config.key}`,
            query: {
                config,
                content: contentMap[config.key]
            }
        }
    }), {})
}

async function getConfig() {
    const nodes = await getNodesConfig();
    const contentMap = await getContentMap(nodes);
    return {
        nodes,
        contentMap
    }
}

async function getContentMap(nodesConfig) {
    return nodesConfig.reduce(async (result, {key, repo: nodeRepo }) => {
        const [ owner, repo ] = trimSlashes(nodeRepo).split('/');
        const nodeContent = await getNodeContent(owner, repo);
        return {
            ...result,
            [key]: nodeContent
        };
    }, {});
}

async function getNodesConfig() {
    const result = await octokit.repos.getContents({
        owner: 'otim-project',
        repo: 'root',
        path: 'nodes.yaml',
        ref: 'master'
    });
    return parseYamlConfig(result.data.content);
}

async function getNodeContent(owner, repo) {
    const result = await octokit.repos.getContents({
        owner,
        repo,
        path: '.otim/content.yaml',
        ref: 'master'
    })
    return parseYamlConfig(result.data.content);
}

function parseYamlConfig(rawFile) {
    return yaml.load(Buffer.from(rawFile, 'base64').toString());
}

function trimSlashes(s) {
    return s.replace(/^\/|\/$/g, '');
}


