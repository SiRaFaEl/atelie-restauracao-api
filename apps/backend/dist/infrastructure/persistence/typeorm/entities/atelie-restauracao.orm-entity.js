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
exports.AtelieRestauracaoOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const projeto_movel_orm_entity_1 = require("./projeto-movel.orm-entity");
let AtelieRestauracaoOrmEntity = class AtelieRestauracaoOrmEntity {
    id;
    especialidadeEra;
    dataFundacao;
    equipadoCompleto;
    areaOficinaM2;
    projetos;
};
exports.AtelieRestauracaoOrmEntity = AtelieRestauracaoOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AtelieRestauracaoOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AtelieRestauracaoOrmEntity.prototype, "especialidadeEra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AtelieRestauracaoOrmEntity.prototype, "dataFundacao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], AtelieRestauracaoOrmEntity.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], AtelieRestauracaoOrmEntity.prototype, "areaOficinaM2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => projeto_movel_orm_entity_1.ProjetoMovelOrmEntity, (projeto) => projeto.atelie),
    __metadata("design:type", Array)
], AtelieRestauracaoOrmEntity.prototype, "projetos", void 0);
exports.AtelieRestauracaoOrmEntity = AtelieRestauracaoOrmEntity = __decorate([
    (0, typeorm_1.Entity)('atelies_restauracao')
], AtelieRestauracaoOrmEntity);
//# sourceMappingURL=atelie-restauracao.orm-entity.js.map