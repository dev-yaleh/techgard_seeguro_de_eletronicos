import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) { }

  async validateUser(email: string, senha: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(email);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(senha, buscaUsuario.senha);

    if (matchPassword) {
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }
    return null;
  }
  async login(usuarioLogin: UsuarioLogin) {

    const payload = { sub: usuarioLogin.email };

    const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.email);

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      email: usuarioLogin.email,
      senha: '',
      foto: buscaUsuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
