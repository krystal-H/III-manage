const fs = require('fs');
const path = require('path');

function fromJSONFile(filename) {
  return (req, res) => {
    const data = fs.readFileSync(path.resolve(__dirname, `./data/${filename}.json`)).toString();
    const json = JSON.parse(data);
    return res.json(json);
  };
}

// 文档 ： https://github.com/jaywcjlove/mocker-api
const proxy = {
  // 'GET /app/product/example': fromJSONFile('example'),
  'GET /app/apiPublish/getApiList': fromJSONFile('apiList'),
  'GET /app/apiPublish/changeState': fromJSONFile('changeState'),
  'GET /app/apiPublish/get': fromJSONFile('get'),
  'GET /app/apiPublish/addAndUpdate': fromJSONFile('addAndUpdate'),
  'GET /data/push/config/getList': fromJSONFile('dataobserver'),
  'POST /app/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: "sdfsdfsdfdsf",
        data: {
          id: 1,
          username: 'kenny',
          sex: 6
        }
      });
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
  },
};

module.exports = proxy;
