const path = require('path');
const fs = require('fs');
exports.saveFile = (fileName, content) => {
    const arr = splitPath(fileName);
    const dir = (path.parse(fileName).root === '/' ? '/' : '') + arr.splice(0, arr.length - 1).join(path.sep);
    exports.mkDir(dir);
    fileName = path.join(dir, arr[0]);
    fs.writeFileSync(fileName, content, 'utf8');
};

const splitPath = (target, char) => {
    char = char || path.sep;
    if (target.indexOf(char) === -1) {
        return [target];
    }
    const char1 = '/';
    const char2 = '\\';
    return target.split(char).reduce((sum, item) => {
        if (item) {
            if (item.indexOf(char1) >= 0) {
                sum.splice(sum.length, 0, ...splitPath(char1));
            } else if (item.indexOf(char2) >= 0) {
                sum.splice(sum.length, 0, ...splitPath(item, char2));
            } else {
                sum.push(item);
            }
        }
        return sum;
    }, []);
};
exports.mkDir = dirPath => {
    const index = dirPath.lastIndexOf('.');
    const fileName = index >= 0 ? dirPath.substr(index) : '';
    dirPath = fileName ? path.dirname(dirPath) : dirPath;
    if (!fs.existsSync(dirPath)) {
        splitPath(dirPath).reduce(
            (sum, item) => {
                const prev = sum;
                sum = path.join(sum, item);
                if (!fs.existsSync(sum)) {
                    fs.accessSync(prev, fs.constants.R_OK | fs.constants.W_OK);
                    fs.mkdirSync(sum);
                }
                return sum;
            },
            path.parse(dirPath).root === '/' ? '/' : ''
        );
    }
};
