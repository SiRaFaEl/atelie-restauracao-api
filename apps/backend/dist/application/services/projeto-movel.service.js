"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProjetoMovelService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetoMovelService = void 0;
const common_1 = require("@nestjs/common");
let ProjetoMovelService = class ProjetoMovelService {
    static { ProjetoMovelService_1 = this; }
    projetoRepository;
    atelieRepository;
    static MIN_HORAS_HOMEM = 10;
    static MAX_HORAS_HOMEM = 1000;
    static MIN_HORAS_RESTAURADO = 40;
    constructor(projetoRepository, atelieRepository) {
        this.projetoRepository = projetoRepository;
        this.atelieRepository = atelieRepository;
    }
    async create(dto) {
        this.validateCamposObrigatorios(dto);
        const atelie = await this.atelieRepository.findById(dto.atelieId);
        if (!atelie) {
            throw new common_1.NotFoundException('Ateliê não encontrado.');
        }
        this.validateDataInicio(dto.dataInicioTrab, atelie.dataFundacao);
        this.validateHorasHomem(dto.horasHomem, dto.restaurado);
        const duplicate = await this.projetoRepository.findDuplicateOpenProject(dto.atelieId, dto.tipoMovel);
        if (duplicate) {
            throw new common_1.ConflictException('Já existe um projeto em aberto para esse tipo de móvel neste ateliê.');
        }
        return this.projetoRepository.create(dto);
    }
    async findAll() {
        return this.projetoRepository.findAll();
    }
    async findById(id) {
        const projeto = await this.projetoRepository.findById(id);
        if (!projeto) {
            throw new common_1.NotFoundException('Projeto de móvel não encontrado.');
        }
        return projeto;
    }
    async update(id, dto) {
        const projetoAtual = await this.projetoRepository.findById(id);
        if (!projetoAtual) {
            throw new common_1.NotFoundException('Projeto de móvel não encontrado.');
        }
        const atelieId = dto.atelieId ?? projetoAtual.atelieId;
        const tipoMovel = dto.tipoMovel ?? projetoAtual.tipoMovel;
        const restaurado = dto.restaurado ?? projetoAtual.restaurado;
        const horasHomem = dto.horasHomem ?? projetoAtual.horasHomem;
        const dataInicioTrab = dto.dataInicioTrab ?? projetoAtual.dataInicioTrab;
        const atelie = await this.atelieRepository.findById(atelieId);
        if (!atelie) {
            throw new common_1.NotFoundException('Ateliê não encontrado.');
        }
        const dataInicio = new Date(dataInicioTrab);
        const dataFundacao = new Date(atelie.dataFundacao);
        if (dataInicio < dataFundacao) {
            throw new common_1.BadRequestException('A data de início do trabalho não pode ser anterior à fundação do ateliê.');
        }
        if (horasHomem < 10 || horasHomem > 1000) {
            throw new common_1.BadRequestException('As horas-homem devem estar entre 10 e 1000.');
        }
        if (restaurado === true && horasHomem < 40) {
            throw new common_1.BadRequestException('Se o projeto estiver restaurado, deve ter no mínimo 40 horas-homem.');
        }
        const duplicate = await this.projetoRepository.findDuplicateOpenProject(atelieId, tipoMovel);
        if (duplicate && duplicate.id !== id && restaurado === false) {
            throw new common_1.ConflictException('Já existe um projeto em aberto para esse tipo de móvel neste ateliê.');
        }
        return this.projetoRepository.update(id, dto);
    }
    async delete(id) {
        await this.projetoRepository.delete(id);
    }
    validateCamposObrigatorios(dto) {
        if (!dto.tipoMovel ||
            !dto.dataInicioTrab ||
            dto.restaurado === undefined ||
            dto.horasHomem === undefined ||
            dto.atelieId === undefined) {
            throw new common_1.BadRequestException('Todos os campos do projeto devem ser preenchidos.');
        }
    }
    validateHorasHomem(horasHomem, restaurado) {
        if (horasHomem < ProjetoMovelService_1.MIN_HORAS_HOMEM || horasHomem > ProjetoMovelService_1.MAX_HORAS_HOMEM) {
            throw new common_1.BadRequestException(`As horas-homem devem estar entre ${ProjetoMovelService_1.MIN_HORAS_HOMEM} e ${ProjetoMovelService_1.MAX_HORAS_HOMEM}.`);
        }
        if (restaurado && horasHomem < ProjetoMovelService_1.MIN_HORAS_RESTAURADO) {
            throw new common_1.BadRequestException(`Se o projeto estiver restaurado, deve ter no mínimo ${ProjetoMovelService_1.MIN_HORAS_RESTAURADO} horas-homem.`);
        }
        if (!restaurado && horasHomem === 0) {
            throw new common_1.BadRequestException('Projeto em andamento não pode ter 0 horas-homem.');
        }
    }
    validateDataInicio(dataInicio, dataFundacaoAtelie) {
        const inicio = new Date(dataInicio);
        const fundacao = new Date(dataFundacaoAtelie);
        if (inicio < fundacao) {
            throw new common_1.BadRequestException('A data de início do trabalho não pode ser anterior à fundação do ateliê.');
        }
    }
};
exports.ProjetoMovelService = ProjetoMovelService;
exports.ProjetoMovelService = ProjetoMovelService = ProjetoMovelService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProjetoMovelRepositoryPort')),
    __param(1, (0, common_1.Inject)('AtelieRepositoryPort')),
    __metadata("design:paramtypes", [Object, Object])
], ProjetoMovelService);
//# sourceMappingURL=projeto-movel.service.js.map