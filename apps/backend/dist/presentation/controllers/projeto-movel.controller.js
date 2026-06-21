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
exports.ProjetoMovelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projeto_movel_service_1 = require("../../application/services/projeto-movel.service");
const create_projeto_movel_dto_1 = require("../dtos/create-projeto-movel.dto");
const update_projeto_movel_dto_1 = require("../dtos/update-projeto-movel.dto");
const jwt_auth_guard_1 = require("../../infrastructure/auth/jwt-auth.guard");
let ProjetoMovelController = class ProjetoMovelController {
    projetoService;
    constructor(projetoService) {
        this.projetoService = projetoService;
    }
    create(dto) {
        return this.projetoService.create(dto);
    }
    findAll() {
        return this.projetoService.findAll();
    }
    findById(id) {
        return this.projetoService.findById(id);
    }
    update(id, dto) {
        return this.projetoService.update(id, dto);
    }
    delete(id) {
        return this.projetoService.delete(id);
    }
};
exports.ProjetoMovelController = ProjetoMovelController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar projeto de móvel' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_projeto_movel_dto_1.CreateProjetoMovelDto]),
    __metadata("design:returntype", void 0)
], ProjetoMovelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar projetos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjetoMovelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar projeto por id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjetoMovelController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar projeto' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_projeto_movel_dto_1.UpdateProjetoMovelDto]),
    __metadata("design:returntype", void 0)
], ProjetoMovelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar projeto' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjetoMovelController.prototype, "delete", null);
exports.ProjetoMovelController = ProjetoMovelController = __decorate([
    (0, swagger_1.ApiTags)('Projetos'),
    (0, common_1.Controller)('projetos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [projeto_movel_service_1.ProjetoMovelService])
], ProjetoMovelController);
//# sourceMappingURL=projeto-movel.controller.js.map