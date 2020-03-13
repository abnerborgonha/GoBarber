// Classe do controller de usuario
import User from '../models/User';

class UserController {
  // Metodo para criação de cadastro, que vai ter a mesam cara de middleware
  async store(req, res) {
    // Verifica se existe um usuario com o mesmo e-mail
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Obtendo os dados de criação atrves do corpo da requisição
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    // Busca o usuario que possui o id do  token
    const user = await User.findByPk(req.userId);

    // Verifica se o email vai ser alterado e se é igual o anterior
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      // Verifica se o usuario existe
      if (userExists) {
        return res.status(400).json({ error: 'Use already exists' });
      }
    }

    if (!(await user.checkPassword(oldPassword))){
      return res.status(401).json({ 'Passwodr does not match' });

    }

    return res.json({ ok: true });
  }
}

export default new UserController();
