const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CertificateService {
  constructor(){
  }

 async create(data) {
    const newCertificate = await models.Certificate.create(data);
    return newCertificate;
  }

  async find() {
    const rta = await models.Certificate.findAll();
    return rta;
  }

  async findOne(id) {
    const certificate = await models.Certificate.findByPk(id);
    if(!certificate){
      throw boom.notFound('Certificate not found');
    }
    return certificate;
  }
}

module.exports = CertificateService;
