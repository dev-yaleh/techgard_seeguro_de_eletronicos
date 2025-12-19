import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seguro } from "../../seguro/entities/seguro.entity";


@Entity({ name: "tb_categoria" })
export class Categoria {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    nomeCategoria: string

    @IsNotEmpty()
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    descricao: string

    @ApiProperty({type:()=> Seguro})
    @OneToMany(() => Seguro, (seguro) => seguro.categoria)
    seguro: Seguro[]


}