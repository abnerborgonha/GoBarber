// Arquivo onde fica a conexão com o banco de dados
import Sequelize from 'sequelize';

// Importanto configiração da base de dados
import databaseConfig from '../config/database';

// Importando os models da Aplicaçao
import User from '../app/models/User';

// Array que recebe os models
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // Esse metodo faz a conexã com a base de dados e esportar nossos models
  init() {
    // Variavel que recebe a conexão do banco de dados
    this.connection = new Sequelize(databaseConfig);

    // Percorrendo o array de models, e iniciamdo a conexão atraves do parametro
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
