import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { Seguro } from "../entities/seguro.entity";
import { CategoriaService } from "../../categoria/service/categoria.service";

@Injectable()
export class SeguroService {
    constructor(
        @InjectRepository(Seguro)
        private seguroRepository: Repository<Seguro>,
        // private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Seguro[]> {
        return await this.seguroRepository.find({
            relations: {
                categoria: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Seguro> {

        let seguro = await this.seguroRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria:true,
                usuario: true
            }
        });

        if(!seguro){
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        return seguro;
    }

    async findbyNome(nomeSeguro: string): Promise<Seguro[]> {
        return await this.seguroRepository.find({
            where:{
                nomeSeguro: ILike(`%${nomeSeguro}%`)
            },
            relations: {
                categoria:true,
                usuario: true
            }
        })
    }

    async create(seguro: Seguro): Promise<Seguro> {

        const anoAtual = new Date().getFullYear();
        const idadeDispositivo = anoAtual - seguro.anoDispositivo;

        // Aplica depreciação de 30% se tiver mais de 3 anos
        if (idadeDispositivo > 3) {
            seguro.valorSeguro = seguro.valorSeguro * 0.7; 
        }

        return await this.seguroRepository.save(seguro);
    }

    async update(seguro: Seguro): Promise<Seguro> {
        let seguroUpdate: Seguro = await this.findById(seguro.id)
        let seguroBusca = await this.findbyNome(seguro.nomeSeguro)

        if (!seguroUpdate) {
            throw new HttpException("Seguro não encontrado!", HttpStatus.NOT_FOUND);
        }
        
        const anoAtual = new Date().getFullYear();
        const idadeDispositivo = anoAtual - seguro.anoDispositivo;

        // Aplica depreciação de 30% se tiver mais de 3 anos
        if (idadeDispositivo > 3) {
            seguro.valorSeguro = seguro.valorSeguro * 0.7; 
        }

        return await this.seguroRepository.save(seguro);

    }

    async delete(id: number): Promise<DeleteResult> {

        let buscaSeguro = await this.findById(id);

        if(!buscaSeguro){
            throw new HttpException("Seguro não encontrado!", HttpStatus.NOT_FOUND);
        }

        return await this.seguroRepository.delete(id);
    }
}