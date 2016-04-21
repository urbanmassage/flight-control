var LOGIN_ADAPTER = process.env.LOGIN_ADAPTER || 'env';

module.exports = require('./' + LOGIN_ADAPTER);
