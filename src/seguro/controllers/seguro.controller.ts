import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SeguroService } from '../services/seguro.service';
import { Seguro } from '../entities/seguro.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('Seguros')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/seguros')
export class SeguroController {
  constructor(private readonly seguroService: SeguroService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista todos os seguros' })
  findAll(): Promise<Seguro[]> {
    return this.seguroService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista um seguro pelo id' })
  findById(@Param('id', ParseIntPipe) id: number): Promise<Seguro> {
    return this.seguroService.findById(id);
  }

  @Get('/nomeSeguro/:nomeSeguro')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lista um seguro pelo nome' })
  findByTitulo(@Param('nomeSeguro') nomeSeguro: string): Promise<Seguro[]> {
    return this.seguroService.findbyNome(nomeSeguro);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo seguro' })
  create(@Body() seguro: Seguro): Promise<Seguro> {
    return this.seguroService.create(seguro);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualiza um seguro' })
  update(@Body() seguro: Seguro): Promise<Seguro> {
    return this.seguroService.update(seguro);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um seguro' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.seguroService.delete(id);
  }
}
