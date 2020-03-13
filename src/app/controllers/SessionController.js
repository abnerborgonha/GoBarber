import jwt from 'jsonwebtoken';

/* Importando o model do Usuario para coletar os dados e fazer a verificação
 para gerar  token */

import User from '../models/User';

// Importando configiração da autenticação via token
import AuthConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // Email e senha passado no corpo da requisição
    const { email, password } = req.body;

    // Verificar se existe um email na tabela de usuarios
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'User nor found' });
    }

    // Verifica se a senha existe
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
