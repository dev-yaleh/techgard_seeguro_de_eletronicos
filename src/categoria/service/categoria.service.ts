import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) { }

    async criar(categoria: Categoria): Promise<Categoria> {
        ;
        return await this.categoriaRepository.save(categoria);
    }

    async listarTodos(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            order: { id: 'ASC' },
            relations: {
                seguro: true
            }
        });
    }

    async buscarPorId(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                seguro: true
            }
        });

        if (!categoria) {
            throw new NotFoundException('Categoria não encontrada');
        }

        return categoria;
    }

    async buscarPorDescricao(descricao: string): Promise<Categoria | null> {
        return await this.categoriaRepository.findOne({
            where: {
                descricao: ILike(`%${descricao}%`),
            },
            relations: {
                seguro: true
            }
        });
    }

    async atualizar(categoria: Categoria): Promise<Categoria> {
        let categoriaUpdate: Categoria = await this.buscarPorId(categoria.id)
        let categoriaBusca = await this.buscarPorDescricao(categoria.descricao)

        if (!categoriaUpdate) {
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        }

        return await this.categoriaRepository.save(categoria);
    }

    async excluir(id: number): Promise<DeleteResult> {
        let buscaCategoria = await this.buscarPorId(id);

        if (!buscaCategoria) {
            throw new HttpException("Categoria não encontrado!", HttpStatus.NOT_FOUND);
        }

        return await this.categoriaRepository.delete(id);


    }
}
