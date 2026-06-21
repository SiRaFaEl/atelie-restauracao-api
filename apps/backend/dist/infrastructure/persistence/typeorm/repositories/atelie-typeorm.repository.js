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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtelieTypeOrmRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const atelie_restauracao_orm_entity_1 = require("../entities/atelie-restauracao.orm-entity");
let AtelieTypeOrmRepository = class AtelieTypeOrmRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async findAll() {
        return this.repository.find();
    }
    async findById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async findByIdWithProjects(id) {
        return this.repository.findOne({
            where: { id },
            relations: ['projetos'],
        });
    }
    async update(id, data) {
        const existing = await this.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException('Ateliê não encontrado.');
        }
        Object.assign(existing, data);
        return this.repository.save(existing);
    }
    async delete(id) {
        const existing = await this.findById(id);
        if (!existing) {
            throw new common_1.NotFoundException('Ateliê não encontrado.');
        }
        await this.repository.remove(existing);
    }
};
exports.AtelieTypeOrmRepository = AtelieTypeOrmRepository;
exports.AtelieTypeOrmRepository = AtelieTypeOrmRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(atelie_restauracao_orm_entity_1.AtelieRestauracaoOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AtelieTypeOrmRepository);
//# sourceMappingURL=atelie-typeorm.repository.js.map