const customFunctions = require('./apiCustomFunctions');
const RotatingFileStream = require('bunyan-rotating-file-stream');

module.exports = {
  note: 'This is a private server.',
  name: 'CONTACT REQUEST API',
  version: '0.0.1',
  transom: {
    cors: {
      origins: ['*']
    },
    requestLogger: {
      name: 'contactapi',
      streams: [
        {
          type: 'raw',
          stream: new RotatingFileStream({
            path: (process.env.LOG_PATH || '.') + '/contactapi.log',
            level: 'debug',
            period: '1d', // daily rotation
            totalFiles: 180, // keep 180 back copies
            rotateExisting: true, // Give ourselves a clean file when we start up, based on period
            threshold: '10m', // Rotate log files larger than 10 megabytes
            totalSize: '1500m', // Don't keep more than 1500mb of archived log files
            gzip: true // Compress the archive log files to save space
          })
        }
      ]
    }
  },
  definition: {
    uri: {
      prefix: '/api/v1'
    },
    functions: {
      submitContactRequest: {
        methods: ['POST'],
        preMiddleware: [], // middleware added in the index.js
        function: customFunctions.submitContactRequest
      }
    }
  }
};
