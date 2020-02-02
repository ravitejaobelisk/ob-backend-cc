const baseConfig = JSON.parse(JSON.stringify(require('./local')));

module.exports = Object.assign(baseConfig, {
  swagger: {
    baseUrl: 'https://rocky-waters-24536.herokuapp.com'
  }
});
