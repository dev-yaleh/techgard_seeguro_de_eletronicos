import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { SeguroModule } from './seguro/seguro.module';
import { Seguro } from './seguro/entities/seguro.entity';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { AuthModule } from './auth/auth.module'; // ✅ import do AuthModule
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_techguard',
      entities: [Usuario, Seguro, Categoria],
      synchronize: true,
    }),
    UsuarioModule,
    SeguroModule,
    CategoriaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
