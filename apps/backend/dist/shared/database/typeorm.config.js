"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const atelie_restauracao_orm_entity_1 = require("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity");
const projeto_movel_orm_entity_1 = require("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity");
exports.typeOrmConfig = {
    type: 'sqlite',
    database: 'data/tema9.db',
    entities: [atelie_restauracao_orm_entity_1.AtelieRestauracaoOrmEntity, projeto_movel_orm_entity_1.ProjetoMovelOrmEntity],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map