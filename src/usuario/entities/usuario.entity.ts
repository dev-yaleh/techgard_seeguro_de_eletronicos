import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seguro } from '../../seguro/entities/seguro.entity';

@Entity({ name: 'tb_usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 100, nullable: false })
  @ApiProperty()
  tipo: string;

  @Column({ length: 2000, nullable: true })
  @ApiProperty()
  foto: string;



  @ApiProperty({type:()=> Seguro})
  @OneToMany(() => Seguro, (seguro) => seguro.usuario)
  seguro: Seguro[]

}

