import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ProjetoMovelRepositoryPort } from '../ports/projeto-movel-repository.port';
import type { AtelieRepositoryPort } from '../ports/atelie-repository.port';
import { CreateProjetoMovelDto } from '../../presentation/dtos/create-projeto-movel.dto';
import { UpdateProjetoMovelDto } from '../../presentation/dtos/update-projeto-movel.dto';

@Injectable()
export class ProjetoMovelService {
  private static readonly MIN_HORAS_HOMEM = 10;
  private static readonly MAX_HORAS_HOMEM = 1000;
  private static readonly MIN_HORAS_RESTAURADO = 40;

  constructor(
    @Inject('ProjetoMovelRepositoryPort')
    private readonly projetoRepository: ProjetoMovelRepositoryPort,

    @Inject('AtelieRepositoryPort')
    private readonly atelieRepository: AtelieRepositoryPort,
  ) {}

  async create(dto: CreateProjetoMovelDto) {
    this.validateCamposObrigatorios(dto);

    const atelie = await this.atelieRepository.findById(dto.atelieId);

    if (!atelie) {
      throw new NotFoundException('Ateliê não encontrado.');
    }

    this.validateDataInicio(dto.dataInicioTrab, atelie.dataFundacao);

    this.validateHorasHomem(dto.horasHomem, dto.restaurado);

    const duplicate = await this.projetoRepository.findDuplicateOpenProject(dto.atelieId, dto.tipoMovel);

    if (duplicate) {
      throw new ConflictException('Já existe um projeto em aberto para esse tipo de móvel neste ateliê.');
    }

    return this.projetoRepository.create(dto);
  }

  async findAll() {
    return this.projetoRepository.findAll();
  }

  async findById(id: number) {
    const projeto = await this.projetoRepository.findById(id);

    if (!projeto) {
      throw new NotFoundException('Projeto de móvel não encontrado.');
    }

    return projeto;
  }

  async update(id: number, dto: UpdateProjetoMovelDto) {
    const projetoAtual = await this.projetoRepository.findById(id);

    if (!projetoAtual) {
      throw new NotFoundException('Projeto de móvel não encontrado.');
    }

    const atelieId = dto.atelieId ?? projetoAtual.atelieId;
    const tipoMovel = dto.tipoMovel ?? projetoAtual.tipoMovel;
    const restaurado = dto.restaurado ?? projetoAtual.restaurado;
    const horasHomem = dto.horasHomem ?? projetoAtual.horasHomem;
    const dataInicioTrab = dto.dataInicioTrab ?? projetoAtual.dataInicioTrab;

    const atelie = await this.atelieRepository.findById(atelieId);

    if (!atelie) {
      throw new NotFoundException('Ateliê não encontrado.');
    }

    const dataInicio = new Date(dataInicioTrab);
    const dataFundacao = new Date(atelie.dataFundacao);

    if (dataInicio < dataFundacao) {
      throw new BadRequestException('A data de início do trabalho não pode ser anterior à fundação do ateliê.');
    }

    if (horasHomem < 10 || horasHomem > 1000) {
      throw new BadRequestException('As horas-homem devem estar entre 10 e 1000.');
    }

    if (restaurado === true && horasHomem < 40) {
      throw new BadRequestException('Se o projeto estiver restaurado, deve ter no mínimo 40 horas-homem.');
    }

    const duplicate = await this.projetoRepository.findDuplicateOpenProject(atelieId, tipoMovel);

    if (duplicate && duplicate.id !== id && restaurado === false) {
      throw new ConflictException('Já existe um projeto em aberto para esse tipo de móvel neste ateliê.');
    }

    return this.projetoRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.projetoRepository.delete(id);
  }

  private validateCamposObrigatorios(dto: CreateProjetoMovelDto): void {
    if (
      !dto.tipoMovel ||
      !dto.dataInicioTrab ||
      dto.restaurado === undefined ||
      dto.horasHomem === undefined ||
      dto.atelieId === undefined
    ) {
      throw new BadRequestException('Todos os campos do projeto devem ser preenchidos.');
    }
  }

  private validateHorasHomem(horasHomem: number, restaurado: boolean): void {
    if (horasHomem < ProjetoMovelService.MIN_HORAS_HOMEM || horasHomem > ProjetoMovelService.MAX_HORAS_HOMEM) {
      throw new BadRequestException(`As horas-homem devem estar entre ${ProjetoMovelService.MIN_HORAS_HOMEM} e ${ProjetoMovelService.MAX_HORAS_HOMEM}.`);
    }
    if (restaurado && horasHomem < ProjetoMovelService.MIN_HORAS_RESTAURADO) {
      throw new BadRequestException(`Se o projeto estiver restaurado, deve ter no mínimo ${ProjetoMovelService.MIN_HORAS_RESTAURADO} horas-homem.`);
    }
    if (!restaurado && horasHomem === 0) {
      throw new BadRequestException('Projeto em andamento não pode ter 0 horas-homem.');
    }
  }

  private validateDataInicio(dataInicio: string, dataFundacaoAtelie: string): void {
    const inicio = new Date(dataInicio);
    const fundacao = new Date(dataFundacaoAtelie);
    if (inicio < fundacao) {
      throw new BadRequestException('A data de início do trabalho não pode ser anterior à fundação do ateliê.');
    }
  }
}