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
exports.AtelieController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const atelie_service_1 = require("../../application/services/atelie.service");
const create_atelie_dto_1 = require("../dtos/create-atelie.dto");
const update_atelie_dto_1 = require("../dtos/update-atelie.dto");
const jwt_auth_guard_1 = require("../../infrastructure/auth/jwt-auth.guard");
let AtelieController = class AtelieController {
    atelieService;
    constructor(atelieService) {
        this.atelieService = atelieService;
    }
    create(dto) {
        return this.atelieService.create(dto);
    }
    findAll() {
        return this.atelieService.findAll();
    }
    findById(id) {
        return this.atelieService.findById(id);
    }
    findByIdWithProjects(id) {
        return this.atelieService.findByIdWithProjects(id);
    }
    update(id, dto) {
        return this.atelieService.update(id, dto);
    }
    delete(id) {
        return this.atelieService.delete(id);
    }
};
exports.AtelieController = AtelieController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar ateliê' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_atelie_dto_1.CreateAtelieDto]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ateliês' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar ateliê por id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/com-projetos'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar ateliê com projetos' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "findByIdWithProjects", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar ateliê' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_atelie_dto_1.UpdateAtelieDto]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar ateliê' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AtelieController.prototype, "delete", null);
exports.AtelieController = AtelieController = __decorate([
    (0, swagger_1.ApiTags)('Atelies'),
    (0, common_1.Controller)('atelies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [atelie_service_1.AtelieService])
], AtelieController);
//# sourceMappingURL=atelie.controller.js.map