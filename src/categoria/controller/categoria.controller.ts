import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../entities/categoria.entity';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Categorias')
@ApiBearerAuth()
@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiProperty()
  criar(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.criar(categoria);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiProperty()
  listarTodos() {
    return this.categoriaService.listarTodos();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiProperty()
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.buscarPorId(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  @ApiProperty()
  buscarPorDescricao(@Param('descricao') descricao: string) {
    return this.categoriaService.buscarPorDescricao(descricao);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiProperty()
  atualizar(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.atualizar(categoria);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiProperty()
  excluir(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.excluir(id);
  }
}
