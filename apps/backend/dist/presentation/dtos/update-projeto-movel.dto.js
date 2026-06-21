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
exports.UpdateProjetoMovelDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProjetoMovelDto {
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
}
exports.UpdateProjetoMovelDto = UpdateProjetoMovelDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'tipoMovel deve ser um texto.' }),
    __metadata("design:type", String)
], UpdateProjetoMovelDto.prototype, "tipoMovel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'dataInicioTrab deve ser uma data válida.' }),
    __metadata("design:type", String)
], UpdateProjetoMovelDto.prototype, "dataInicioTrab", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'restaurado deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], UpdateProjetoMovelDto.prototype, "restaurado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'horasHomem deve ser um número.' }),
    __metadata("design:type", Number)
], UpdateProjetoMovelDto.prototype, "horasHomem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'atelieId deve ser um número.' }),
    __metadata("design:type", Number)
], UpdateProjetoMovelDto.prototype, "atelieId", void 0);
//# sourceMappingURL=update-projeto-movel.dto.js.map