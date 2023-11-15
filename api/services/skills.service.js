const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class SkillService {
  constructor(){
  }

 async create(data) {
    const newSkill = await models.Skill.create(data);
    return newSkill;
  }

  async find() {
    const rta = await models.Skill.findAll();
    return rta;
  }

  async findOne(id) {
    const skill = await models.Skill.findByPk(id);
    if(!skill){
      throw boom.notFound('Skill not found');
    }
    return skill;
  }

  async update(id, changes) {
    const skill = await this.findOne(id);
    const rta = await skill.update(changes);
    return rta;
  }

  async delete(id) {
    const skill = await this.findOne(id);
    await skill.destroy();
    return { id };
  }
}

module.exports = SkillService;
