const express = require('express');
const router = express.Router();
const SkillService = require('./../services/skills.service');

const service = new SkillService();

router.get('/',
  async (req, res, next) => {
  try {
    const skills = await service.find();
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const skill = await service.findOne(id);
      res.json(skill);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSkill = await service.create(body);
      res.status(201).json(newSkill);
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
      const skill = await service.update(id, body);
      res.json(skill);
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
