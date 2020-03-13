import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
/*
  Classe da tabela usuario, onde vamos editar, atualizar no banco.
  Utilizando o metodo estatico inti para inicializar toda vez que chama-lo.
*/

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Hooks são ações de condigos que são efetuadas de forma automatican (Evento)
    this.addHook('beforeSave', async user => {
      // Verifica se foi informado uma senha e criptografa atravez do bcrypt
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    // Retorna o model que foi inicializado
    return this;
  }

  /* Metodo que vai ser acessado atrvez do
     controller SessionController para fazer a verificação da
    existencia da senha */

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
