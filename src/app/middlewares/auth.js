import jwt from 'jsonwebtoken';

// Biblioteca que tranforma uma função com callback em async/await
import { promisify } from 'util';

import authConfig from '../../config/auth';

// Middleware que vai fazer a verificação da existencia do token

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se xiste um token presente
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }

  // Tratando os dados do token
  const [, token] = authHeader.split(' ');

  try {
    // Decodifica a função para async/await, faz a verificação do toke e retorna se é verdadeiro ou falso
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
