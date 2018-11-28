const octokit = require('@octokit/rest')()
const yaml = require('js-yaml');
const { accessKeyId, secretAccessKey, region, Bucket } = require('./s3creds');
const s3 = require('s3');

const s3Client = s3.createClient({
  s3Options: {
    accessKeyId,
    secretAccessKey,
    region,
  },
});


module.exports = { getSiteConfig }

getSiteConfig();

async function getSiteConfig() {
    const config = await getConfig();
    const nodeToDir = downloadOutputs(config.contentMap);
    return formatSiteConfig(config, nodeToDir, {
        '/': {
            page: '/index',
            query: config
        }
    });
}

function formatSiteConfig({nodes, contentMap, metaMap}, nodeToDir, baseObj) {
    return nodes.reduce((result, config) => ({
        ...result,
        [`/node/${config.key}`]: {
            page: '/nodePage',
            query: {
                config,
                content: contentMap[config.key],
                meta: metaMap[config.key],
                staticDir: nodeToDir[config.key],
            }
        }
    }), baseObj)
}

function downloadOutputs(contentsMap) {
    const keyToOuputPaths = Object.keys(contentsMap)
        .reduce((result, key) => ({
            ...result,
            [key]: getAllPaths(contentsMap[key])
        }), {})
    const nodeToFileKey = {}
    Object.keys(keyToOuputPaths).forEach(
        nodeKey => (
            keyToOuputPaths[nodeKey].forEach(sourcePath => {
                const Key = getFileKey(nodeKey, sourcePath);
                nodeToFileKey[nodeKey] = nodeToFileKey[nodeKey] || {};
                nodeToFileKey[nodeKey] = {
                    ...nodeToFileKey[nodeKey],
                    [sourcePath]: Key
                }
                const uploader = s3Client.downloadFile({
                    localFile: `static/built/${Key}`,
                    s3Params: { Bucket, Key },
                });

                uploader.on('error', function(err) {
                  console.error(`unable to download ${Key}`, err.stack);
                });
                uploader.on('progress', function() {
                    // future dev enhancement: add progress bar
                });
                uploader.on('end', () => console.log('downloaded', Key));
            })
        )
    );
    return nodeToFileKey;
}

function getFileKey(nodeKey, sourcePath) {
    return `${nodeKey}/${getRemotePath(sourcePath)}`;
}

async function getConfig() {
    const nodes = await getNodesConfig();
    const contentMap = await getContentMap(nodes);
    const metaMap = await getMetaMap(nodes);
    return {
        nodes,
        contentMap,
        metaMap
    }
}


async function getMetaMap(nodesConfig) {
    return nodesConfig.reduce(async (result, {key, repo: nodeRepo }) => {
        const [ owner, repo ] = trimSlashes(nodeRepo).split('/');
        const nodeMeta = await getNodeMeta(owner, repo);
        return {
            ...result,
            [key]: nodeMeta
        };
    }, {});
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

async function getNodeMeta(owner, repo) {
    const result = await octokit.repos.getContents({
        owner,
        repo,
        path: '.otim/meta.yaml',
        ref: 'master'
    })
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

function getRemotePath(sourcePath) {
    return `${trimSlashes(strimExtension(sourcePath))}.pdf`;
}

function trimSlashes(s) {
    return s.replace(/^\/|\/$/g, '');
}

function getAllPaths(nodes) {
    return nodes.reduce((result, {path, sub}) => {
        if (sub) {
            return [...result, ...getAllPaths(sub)]
        }

        if (path) {
            return [...result, path];
        }

        return result
    }, []);
}

function strimExtension(path) {
    return path.split('.').slice(0, -1).join('.')
}


