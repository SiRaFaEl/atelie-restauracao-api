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
var AtelieService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtelieService = void 0;
const common_1 = require("@nestjs/common");
let AtelieService = class AtelieService {
    static { AtelieService_1 = this; }
    atelieRepository;
    static MIN_AREA_OFICINA_M2 = 50;
    constructor(atelieRepository) {
        this.atelieRepository = atelieRepository;
    }
    async create(dto) {
        if (!dto.especialidadeEra || !dto.dataFundacao || dto.equipadoCompleto === undefined || dto.areaOficinaM2 === undefined) {
            throw new common_1.BadRequestException('Todos os campos do ateliê devem ser preenchidos.');
        }
        this.validateDataFundacao(dto.dataFundacao);
        this.validateAreaOficina(dto.areaOficinaM2);
        return this.atelieRepository.create(dto);
    }
    async findAll() {
        return this.atelieRepository.findAll();
    }
    async findById(id) {
        const atelie = await this.atelieRepository.findById(id);
        if (!atelie) {
            throw new common_1.NotFoundException('Ateliê não encontrado.');
        }
        return atelie;
    }
    async findByIdWithProjects(id) {
        const atelie = await this.atelieRepository.findByIdWithProjects(id);
        if (!atelie) {
            throw new common_1.NotFoundException('Ateliê não encontrado.');
        }
        return atelie;
    }
    async update(id, dto) {
        if (dto.dataFundacao) {
            this.validateDataFundacao(dto.dataFundacao);
        }
        if (dto.areaOficinaM2 !== undefined) {
            this.validateAreaOficina(dto.areaOficinaM2);
        }
        return this.atelieRepository.update(id, dto);
    }
    async delete(id) {
        await this.atelieRepository.delete(id);
    }
    validateDataFundacao(dataFundacao) {
        const data = new Date(dataFundacao);
        const hoje = new Date();
        if (data > hoje) {
            throw new common_1.BadRequestException('Data de fundação não pode ser no futuro.');
        }
    }
    validateAreaOficina(areaOficinaM2) {
        if (areaOficinaM2 < AtelieService_1.MIN_AREA_OFICINA_M2) {
            throw new common_1.BadRequestException(`A área da oficina deve ser maior ou igual a ${AtelieService_1.MIN_AREA_OFICINA_M2} m².`);
        }
    }
};
exports.AtelieService = AtelieService;
exports.AtelieService = AtelieService = AtelieService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AtelieRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], AtelieService);
//# sourceMappingURL=atelie.service.js.map