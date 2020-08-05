const path = require('path');
const page = require('../../tools/page');
for (let i = 1; i < 5; i++) {
    page.initPage(path.join(__dirname, 'pages'), `p${i}`);
}
