/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const express = require('express');
const { resolve } = require('path');
const { asyncController } = require('../utils/async');
const { getRouteData, checkValidation } = require('../middleware');

const router = express.Router();

module.exports = (api, appDIR) => {
  Object.entries(api).forEach((route) => {
    const routeInfo = route[1];

    // console.log(routeInfo.url, routeInfo.middleware ?? [], require(resolve(`${appDIR}/app/controller/${routeInfo.path ?? ''}/${routeInfo.controller}`))[routeInfo.function]);
    router[routeInfo.method](
      routeInfo.url,
      [getRouteData, ...(routeInfo?.middleware ?? []), checkValidation],
      asyncController(require(resolve(`${appDIR}/app/controller/${routeInfo.path ?? ''}/${routeInfo.controller}`))[routeInfo.function]),
    );
  });

  return router;
};
