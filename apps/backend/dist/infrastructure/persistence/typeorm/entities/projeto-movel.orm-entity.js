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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetoMovelOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const atelie_restauracao_orm_entity_1 = require("./atelie-restauracao.orm-entity");
let ProjetoMovelOrmEntity = class ProjetoMovelOrmEntity {
    id;
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
    atelie;
};
exports.ProjetoMovelOrmEntity = ProjetoMovelOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjetoMovelOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjetoMovelOrmEntity.prototype, "tipoMovel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], ProjetoMovelOrmEntity.prototype, "dataInicioTrab", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ProjetoMovelOrmEntity.prototype, "restaurado", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ProjetoMovelOrmEntity.prototype, "horasHomem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProjetoMovelOrmEntity.prototype, "atelieId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => atelie_restauracao_orm_entity_1.AtelieRestauracaoOrmEntity, (atelie) => atelie.projetos),
    (0, typeorm_1.JoinColumn)({ name: 'atelieId' }),
    __metadata("design:type", atelie_restauracao_orm_entity_1.AtelieRestauracaoOrmEntity)
], ProjetoMovelOrmEntity.prototype, "atelie", void 0);
exports.ProjetoMovelOrmEntity = ProjetoMovelOrmEntity = __decorate([
    (0, typeorm_1.Entity)('projetos_movel')
], ProjetoMovelOrmEntity);
//# sourceMappingURL=projeto-movel.orm-entity.js.map