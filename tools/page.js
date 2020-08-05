const path = require('path');
const fs = require('./fs');
const mpLift = require('./life');

exports.initJSContent = pageName => {
    const lifes = mpLift.wechat.page
        .map(item => {
            return `${item}(){ console.log('${pageName}.${item} is run.') }`;
        })
        .join(',');
    return `
console.log('${pageName} js is run.');
Page({
    data: {},
    ${lifes}
})
    `;
};

exports.initPage = (
    root,
    pageName,
    jsContent = exports.initJSContent(pageName),
    xmlContent = 'page is ' + pageName,
    cssContent = '',
    jsonContent = '{}',
    cssType = 'wxss',
    xmlType = 'wxml'
) => {
    const dirPath = path.join(root, pageName);
    console.log(dirPath);
    fs.saveFile(`${dirPath}${path.sep}${pageName}.js`, jsContent);
    fs.saveFile(`${dirPath}${path.sep}${pageName}.${xmlType}`, xmlContent);
    fs.saveFile(`${dirPath}${path.sep}${pageName}.${cssType}`, cssContent);
    fs.saveFile(`${dirPath}${path.sep}${pageName}.json`, jsonContent);
};
