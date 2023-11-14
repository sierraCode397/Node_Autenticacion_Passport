const express = require('express');
const router = express.Router();
const PortafolioService = require('./../services/portafolios.services');

const service = new PortafolioService();

router.get('/',
  async (req, res, next) => {
  try {
    const portafolios = await service.find();
    res.json(portafolios);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const portafolio = await service.findOne(id);
      res.json(portafolio);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPortafolio = await service.create(body);
      res.status(201).json(newPortafolio);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const portafolio = await service.update(id, body);
      res.json(portafolio);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;