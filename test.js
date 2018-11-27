const { exportPathMap } = require('./next.config');

run();

async function run() {
    const exportPathMapResult = await exportPathMap();
    console.log(exportPathMapResult)
}