const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class PortafolioService {
  constructor(){
  }

 async create(data) {
    const newPortafolio = await models.Portafolio.create(data);
    return newPortafolio;
  }

  async find() {
    const rta = await models.Portafolio.findAll();
    return rta;
  }

  async findOne(id) {
    const portafolio = await models.Portafolio.findByPk(id);
    if(!portafolio){
      throw boom.notFound('Portafolio not found');
    }
    return portafolio;
  }

  async update(id, changes) {
    const portafolio = await this.findOne(id);
    const rta = await portafolio.update(changes);
    return rta;
  }

  async delete(id) {
    const portafolio = await this.findOne(id);
    await portafolio.destroy();
    return { id };
  }
}

module.exports = PortafolioService;