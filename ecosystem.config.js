module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [

      // First application
      {
        name      : 'wine-time',
        script    : './compiled/server.js',
        env : {
          NODE_ENV: 'production'
        }
      }
    ]
  };

