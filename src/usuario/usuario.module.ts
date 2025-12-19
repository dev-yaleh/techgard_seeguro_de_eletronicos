import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioController } from "./controller/usuario.controller";
import { UsuarioService } from "./service/usuario.service";


@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [TypeOrmModule, UsuarioService],
})

export class UsuarioModule { }