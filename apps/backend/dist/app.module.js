"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_config_1 = require("./shared/database/typeorm.config");
const atelie_restauracao_orm_entity_1 = require("./infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity");
const projeto_movel_orm_entity_1 = require("./infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity");
const user_orm_entity_1 = require("./infrastructure/persistence/typeorm/entities/user.orm-entity");
const atelie_controller_1 = require("./presentation/controllers/atelie.controller");
const atelie_service_1 = require("./application/services/atelie.service");
const atelie_typeorm_repository_1 = require("./infrastructure/persistence/typeorm/repositories/atelie-typeorm.repository");
const projeto_movel_controller_1 = require("./presentation/controllers/projeto-movel.controller");
const projeto_movel_service_1 = require("./application/services/projeto-movel.service");
const projeto_movel_typeorm_repository_1 = require("./infrastructure/persistence/typeorm/repositories/projeto-movel-typeorm.repository");
const auth_module_1 = require("./auth/auth.module");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            typeorm_1.TypeOrmModule.forFeature([
                atelie_restauracao_orm_entity_1.AtelieRestauracaoOrmEntity,
                projeto_movel_orm_entity_1.ProjetoMovelOrmEntity,
                user_orm_entity_1.UserOrmEntity,
            ]),
            auth_module_1.AuthModule,
            shared_module_1.SharedModule,
        ],
        controllers: [app_controller_1.AppController, atelie_controller_1.AtelieController, projeto_movel_controller_1.ProjetoMovelController],
        providers: [
            app_service_1.AppService,
            atelie_service_1.AtelieService,
            projeto_movel_service_1.ProjetoMovelService,
            {
                provide: 'AtelieRepositoryPort',
                useClass: atelie_typeorm_repository_1.AtelieTypeOrmRepository,
            },
            {
                provide: 'ProjetoMovelRepositoryPort',
                useClass: projeto_movel_typeorm_repository_1.ProjetoMovelTypeOrmRepository,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map