import { ENV } from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

// // export const apiEndpoint = isDebug ? 'http://localhost:3000' : 'https://demo-reactgo.herokuapp.com';
// export const apiEndpoint = 'http://localhost:3000';
// // Replace with 'UA-########-#' or similar to enable tracking

export const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/wine_time',
    port: process.env.PORT || 5000,
    sslport: 5001,
};
