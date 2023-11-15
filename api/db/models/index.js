const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { Categorie, CategorieSchema } = require('./categories.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { OrderProduct, OrderProductSchema } = require('./order-products.model');

  //------------------------- landing...

const { Certificate, CertificateSchema } = require('./certificates.model');
const { Portafolio, PortafolioSchema } = require('./portafolio.model');
const { Skill, SkillSchema } = require('./skills.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Categorie.init(CategorieSchema, Categorie.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //------------------------- landing...

  Certificate.init(CertificateSchema, Certificate.config(sequelize));
  Portafolio.init(PortafolioSchema, Portafolio.config(sequelize));
  Skill.init(SkillSchema, Skill.config(sequelize));

  Categorie.associate(sequelize.models);
  Product.associate(sequelize.models);
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);

  //------------------------- landing...

  Certificate.associate(sequelize.models);
  Portafolio.associate(sequelize.models);
  Skill.associate(sequelize.models);

}

module.exports = setupModels;
