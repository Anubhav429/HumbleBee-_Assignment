const crypto = require('crypto');

exports.generateSyncToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
