import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import flash from 'express-flash';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';
import { ENV } from '../config/env';
import { config } from '../config/app';

import nonRestrictedRoutes from './routes/nonRestrictedRoutes'
import customerRoutes from './routes/customerRoutes';

export default (app) => {
  app.set('port', (process.env.PORT || config.port));

  if (ENV === 'production') {
    app.use(gzip());
    // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
    app.use(helmet());
  }

  // old approach
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  
  // new version
  app.use(express.json())
  app.use(express.urlencoded({extended: true}));
  app.use(methodOverride());
  app.use(cookieParser());

  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use("/api", nonRestrictedRoutes)
  app.use("/api", customerRoutes)

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);

  if (ENV === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
  }
  console.log('--------------------------');

  app.use(flash());
};
