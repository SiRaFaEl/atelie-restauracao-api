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
exports.CreateAtelieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAtelieDto {
    especialidadeEra;
    dataFundacao;
    equipadoCompleto;
    areaOficinaM2;
}
exports.CreateAtelieDto = CreateAtelieDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: 'especialidadeEra deve ser um texto.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'especialidadeEra é obrigatório.' }),
    __metadata("design:type", String)
], CreateAtelieDto.prototype, "especialidadeEra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)({}, { message: 'dataFundacao deve ser uma data válida.' }),
    __metadata("design:type", String)
], CreateAtelieDto.prototype, "dataFundacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)({ message: 'equipadoCompleto deve ser verdadeiro ou falso.' }),
    __metadata("design:type", Boolean)
], CreateAtelieDto.prototype, "equipadoCompleto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)({}, { message: 'areaOficinaM2 deve ser um número.' }),
    __metadata("design:type", Number)
], CreateAtelieDto.prototype, "areaOficinaM2", void 0);
//# sourceMappingURL=create-atelie.dto.js.map