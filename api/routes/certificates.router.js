const express = require('express');
const router = express.Router();
const CertificateService = require('./../services/certificates.services');

const service = new CertificateService();

router.get('/',
  async (req, res, next) => {
  try {
    const certificates = await service.find();
    res.json(certificates);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const certificate = await service.findOne(id);
      res.json(certificate);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCertificate = await service.create(body);
      res.status(201).json(newCertificate);
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
      const certificate = await service.update(id, body);
      res.json(certificate);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
