const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customerRouter = require('./customers.router');
const orderProductsRouter = require('./order-products.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const certificateRouter = require('./certificates.router');
const portafolioRouter = require('./portafolio.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customer', customerRouter);
  router.use('/order-products', orderProductsRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/certificates', certificateRouter);
  router.use('/portafolios', portafolioRouter);

}

module.exports = routerApi;
