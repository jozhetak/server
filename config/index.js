const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
 */
const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] === undefined) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
  }
  return target;
};

const config = {
  common: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT,
      url: process.env.API_URL
    },
    email: {
      username: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
      expireTime: process.env.EMAIL_EXPIRE_TIME,
      confirmation: process.env.CONFIRMATION_ENDPOINT,
      recoverPass: process.env.RECOVER_PASS_ENDPOINT,
      from: process.env.FROM_EMAIL
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET,
      expiryTime: process.env.EXPIRY_TIME
    }
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
