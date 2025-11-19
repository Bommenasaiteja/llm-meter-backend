/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const tracking_module_1 = __webpack_require__(5);
const analytics_module_1 = __webpack_require__(18);
const config_module_1 = __webpack_require__(22);
const websocket_module_1 = __webpack_require__(26);
const database_module_1 = __webpack_require__(30);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            database_module_1.DatabaseModule,
            tracking_module_1.TrackingModule,
            analytics_module_1.AnalyticsModule,
            config_module_1.ConfigurationModule,
            websocket_module_1.WebSocketModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackingModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const tracking_controller_1 = __webpack_require__(7);
const tracking_service_1 = __webpack_require__(8);
const usage_event_entity_1 = __webpack_require__(10);
const project_entity_1 = __webpack_require__(12);
const model_pricing_entity_1 = __webpack_require__(13);
let TrackingModule = class TrackingModule {
};
exports.TrackingModule = TrackingModule;
exports.TrackingModule = TrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                usage_event_entity_1.UsageEventEntity,
                project_entity_1.ProjectEntity,
                model_pricing_entity_1.ModelPricingEntity,
            ]),
        ],
        controllers: [tracking_controller_1.TrackingController],
        providers: [tracking_service_1.TrackingService],
        exports: [tracking_service_1.TrackingService],
    })
], TrackingModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackingController = void 0;
const common_1 = __webpack_require__(2);
const tracking_service_1 = __webpack_require__(8);
const track_usage_dto_1 = __webpack_require__(14);
const get_usage_dto_1 = __webpack_require__(17);
let TrackingController = class TrackingController {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async trackUsage(trackUsageDto) {
        const eventsProcessed = await this.trackingService.trackUsage(trackUsageDto.events);
        return {
            success: true,
            eventsProcessed,
        };
    }
    async getUsage(query) {
        return this.trackingService.getUsage(query);
    }
    async getRecentUsage(limit) {
        return this.trackingService.getRecentUsage(limit || 10);
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Post)('track'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof track_usage_dto_1.TrackUsageDto !== "undefined" && track_usage_dto_1.TrackUsageDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "trackUsage", null);
__decorate([
    (0, common_1.Get)('usage'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof get_usage_dto_1.GetUsageDto !== "undefined" && get_usage_dto_1.GetUsageDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getUsage", null);
__decorate([
    (0, common_1.Get)('recent'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getRecentUsage", null);
exports.TrackingController = TrackingController = __decorate([
    (0, common_1.Controller)('tracking'),
    __metadata("design:paramtypes", [typeof (_a = typeof tracking_service_1.TrackingService !== "undefined" && tracking_service_1.TrackingService) === "function" ? _a : Object])
], TrackingController);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackingService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(9);
const usage_event_entity_1 = __webpack_require__(10);
const project_entity_1 = __webpack_require__(12);
const model_pricing_entity_1 = __webpack_require__(13);
let TrackingService = class TrackingService {
    constructor(usageEventRepository, projectRepository, pricingRepository) {
        this.usageEventRepository = usageEventRepository;
        this.projectRepository = projectRepository;
        this.pricingRepository = pricingRepository;
    }
    async trackUsage(events) {
        const entities = await Promise.all(events.map(async (event) => {
            await this.ensureProjectExists(event.project);
            let cost = event.cost;
            if (!cost) {
                cost = await this.calculateCost(event.provider, event.model, event.inputTokens, event.outputTokens);
            }
            return this.usageEventRepository.create({
                ...event,
                cost,
                timestamp: new Date(event.timestamp),
            });
        }));
        await this.usageEventRepository.save(entities);
        return entities.length;
    }
    async getUsage(query) {
        const where = {};
        if (query.project) {
            where.project = query.project;
        }
        if (query.provider) {
            where.provider = query.provider;
        }
        if (query.model) {
            where.model = query.model;
        }
        if (query.startDate && query.endDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(query.startDate), new Date(query.endDate));
        }
        const [events, total] = await this.usageEventRepository.findAndCount({
            where,
            order: { timestamp: 'DESC' },
            take: query.limit || 50,
            skip: query.offset || 0,
        });
        return {
            events,
            total,
            page: Math.floor((query.offset || 0) / (query.limit || 50)) + 1,
            pageSize: query.limit || 50,
        };
    }
    async getRecentUsage(limit) {
        return this.usageEventRepository.find({
            order: { timestamp: 'DESC' },
            take: limit,
        });
    }
    async ensureProjectExists(projectName) {
        const existing = await this.projectRepository.findOne({
            where: { name: projectName },
        });
        if (!existing) {
            await this.projectRepository.save(this.projectRepository.create({ name: projectName }));
        }
    }
    async calculateCost(provider, model, inputTokens, outputTokens) {
        const pricing = await this.pricingRepository.findOne({
            where: { provider: provider, model },
        });
        if (!pricing) {
            return 0;
        }
        const inputCost = (inputTokens / 1000) * pricing.inputCostPer1k;
        const outputCost = (outputTokens / 1000) * pricing.outputCostPer1k;
        return inputCost + outputCost;
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usage_event_entity_1.UsageEventEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(model_pricing_entity_1.ModelPricingEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], TrackingService);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsageEventEntity = void 0;
const typeorm_1 = __webpack_require__(9);
const llm_types_1 = __webpack_require__(11);
let UsageEventEntity = class UsageEventEntity {
};
exports.UsageEventEntity = UsageEventEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsageEventEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UsageEventEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UsageEventEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", typeof (_b = typeof llm_types_1.LLMProvider !== "undefined" && llm_types_1.LLMProvider) === "function" ? _b : Object)
], UsageEventEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsageEventEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'function_name', nullable: true }),
    __metadata("design:type", String)
], UsageEventEntity.prototype, "functionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'input_tokens' }),
    __metadata("design:type", Number)
], UsageEventEntity.prototype, "inputTokens", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'output_tokens' }),
    __metadata("design:type", Number)
], UsageEventEntity.prototype, "outputTokens", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_tokens' }),
    __metadata("design:type", Number)
], UsageEventEntity.prototype, "totalTokens", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], UsageEventEntity.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'latency_ms' }),
    __metadata("design:type", Number)
], UsageEventEntity.prototype, "latencyMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prompt_preview', type: 'text', nullable: true }),
    __metadata("design:type", String)
], UsageEventEntity.prototype, "promptPreview", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_preview', type: 'text', nullable: true }),
    __metadata("design:type", String)
], UsageEventEntity.prototype, "responsePreview", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object)
], UsageEventEntity.prototype, "metadata", void 0);
exports.UsageEventEntity = UsageEventEntity = __decorate([
    (0, typeorm_1.Entity)('usage_events'),
    (0, typeorm_1.Index)(['project', 'timestamp']),
    (0, typeorm_1.Index)(['provider', 'model']),
    (0, typeorm_1.Index)(['functionName'])
], UsageEventEntity);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectEntity = void 0;
const typeorm_1 = __webpack_require__(9);
let ProjectEntity = class ProjectEntity {
};
exports.ProjectEntity = ProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ProjectEntity.prototype, "createdAt", void 0);
exports.ProjectEntity = ProjectEntity = __decorate([
    (0, typeorm_1.Entity)('projects')
], ProjectEntity);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelPricingEntity = void 0;
const typeorm_1 = __webpack_require__(9);
const llm_types_1 = __webpack_require__(11);
let ModelPricingEntity = class ModelPricingEntity {
};
exports.ModelPricingEntity = ModelPricingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ModelPricingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", typeof (_a = typeof llm_types_1.LLMProvider !== "undefined" && llm_types_1.LLMProvider) === "function" ? _a : Object)
], ModelPricingEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ModelPricingEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'input_cost_per_1k' }),
    __metadata("design:type", Number)
], ModelPricingEntity.prototype, "inputCostPer1k", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'output_cost_per_1k' }),
    __metadata("design:type", Number)
], ModelPricingEntity.prototype, "outputCostPer1k", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ModelPricingEntity.prototype, "updatedAt", void 0);
exports.ModelPricingEntity = ModelPricingEntity = __decorate([
    (0, typeorm_1.Entity)('model_pricing'),
    (0, typeorm_1.Index)(['provider', 'model'], { unique: true })
], ModelPricingEntity);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackUsageDto = exports.UsageEventDto = void 0;
const class_validator_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(16);
var Provider;
(function (Provider) {
    Provider["OPENAI"] = "openai";
    Provider["ANTHROPIC"] = "anthropic";
    Provider["OLLAMA"] = "ollama";
    Provider["GEMINI"] = "gemini";
    Provider["CUSTOM"] = "custom";
})(Provider || (Provider = {}));
class UsageEventDto {
}
exports.UsageEventDto = UsageEventDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UsageEventDto.prototype, "timestamp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsageEventDto.prototype, "project", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Provider),
    __metadata("design:type", String)
], UsageEventDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsageEventDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsageEventDto.prototype, "functionName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsageEventDto.prototype, "inputTokens", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsageEventDto.prototype, "outputTokens", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsageEventDto.prototype, "totalTokens", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsageEventDto.prototype, "cost", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsageEventDto.prototype, "latencyMs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsageEventDto.prototype, "promptPreview", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsageEventDto.prototype, "responsePreview", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], UsageEventDto.prototype, "metadata", void 0);
class TrackUsageDto {
}
exports.TrackUsageDto = TrackUsageDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UsageEventDto),
    __metadata("design:type", Array)
], TrackUsageDto.prototype, "events", void 0);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUsageDto = void 0;
const class_validator_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(16);
var Provider;
(function (Provider) {
    Provider["OPENAI"] = "openai";
    Provider["ANTHROPIC"] = "anthropic";
    Provider["OLLAMA"] = "ollama";
    Provider["GEMINI"] = "gemini";
    Provider["CUSTOM"] = "custom";
})(Provider || (Provider = {}));
class GetUsageDto {
}
exports.GetUsageDto = GetUsageDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUsageDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUsageDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUsageDto.prototype, "project", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Provider),
    __metadata("design:type", String)
], GetUsageDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUsageDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetUsageDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], GetUsageDto.prototype, "offset", void 0);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const analytics_controller_1 = __webpack_require__(19);
const analytics_service_1 = __webpack_require__(20);
const usage_event_entity_1 = __webpack_require__(10);
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([usage_event_entity_1.UsageEventEntity])],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
        exports: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsController = void 0;
const common_1 = __webpack_require__(2);
const analytics_service_1 = __webpack_require__(20);
const get_requests_dto_1 = __webpack_require__(21);
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getStats(startDate, endDate, project) {
        return this.analyticsService.getStats(startDate, endDate, project);
    }
    async getDailyStats(days, project) {
        return this.analyticsService.getDailyStats(days || 7, project);
    }
    async getModelStats(startDate, endDate, project) {
        return this.analyticsService.getModelStats(startDate, endDate, project);
    }
    async getProjectStats(startDate, endDate) {
        return this.analyticsService.getProjectStats(startDate, endDate);
    }
    async getRequests(filters) {
        return this.analyticsService.getRequests(filters);
    }
    async getRequestById(id) {
        const request = await this.analyticsService.getRequestById(parseInt(id));
        if (!request) {
            throw new common_1.NotFoundException(`Request with ID ${id} not found`);
        }
        return request;
    }
    async getFunctionStats(startDate, endDate, project) {
        return this.analyticsService.getFunctionStats(startDate, endDate, project);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('project')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('daily'),
    __param(0, (0, common_1.Query)('days')),
    __param(1, (0, common_1.Query)('project')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getDailyStats", null);
__decorate([
    (0, common_1.Get)('models'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('project')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getModelStats", null);
__decorate([
    (0, common_1.Get)('projects'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getProjectStats", null);
__decorate([
    (0, common_1.Get)('requests'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof get_requests_dto_1.GetRequestsDto !== "undefined" && get_requests_dto_1.GetRequestsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getRequests", null);
__decorate([
    (0, common_1.Get)('requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getRequestById", null);
__decorate([
    (0, common_1.Get)('functions'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Query)('project')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getFunctionStats", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [typeof (_a = typeof analytics_service_1.AnalyticsService !== "undefined" && analytics_service_1.AnalyticsService) === "function" ? _a : Object])
], AnalyticsController);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(9);
const usage_event_entity_1 = __webpack_require__(10);
let AnalyticsService = class AnalyticsService {
    constructor(usageEventRepository) {
        this.usageEventRepository = usageEventRepository;
    }
    async getStats(startDate, endDate, project) {
        const where = {};
        if (startDate && endDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(startDate), new Date(endDate));
        }
        if (project) {
            where.project = project;
        }
        const events = await this.usageEventRepository.find({ where });
        const totalTokens = events.reduce((sum, e) => sum + e.totalTokens, 0);
        const totalCost = events.reduce((sum, e) => sum + (e.cost || 0), 0);
        const totalRequests = events.length;
        const daily = await this.getDailyStats(7, project);
        const byModel = await this.getModelStats(startDate, endDate, project);
        const byProject = await this.getProjectStats(startDate, endDate);
        return {
            daily,
            byModel,
            byProject,
            totalCost,
            totalTokens,
            totalRequests,
        };
    }
    async getDailyStats(days, project) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const where = {
            timestamp: (0, typeorm_2.Between)(startDate, new Date()),
        };
        if (project) {
            where.project = project;
        }
        const events = await this.usageEventRepository.find({
            where,
            order: { timestamp: 'ASC' },
        });
        const dailyMap = new Map();
        events.forEach((event) => {
            const dateKey = event.timestamp.toISOString().split('T')[0];
            if (!dailyMap.has(dateKey)) {
                dailyMap.set(dateKey, {
                    date: dateKey,
                    totalTokens: 0,
                    inputTokens: 0,
                    outputTokens: 0,
                    totalCost: 0,
                    requestCount: 0,
                });
            }
            const stats = dailyMap.get(dateKey);
            stats.totalTokens += event.totalTokens;
            stats.inputTokens += event.inputTokens;
            stats.outputTokens += event.outputTokens;
            stats.totalCost += event.cost || 0;
            stats.requestCount += 1;
        });
        return Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    }
    async getModelStats(startDate, endDate, project) {
        const where = {};
        if (startDate && endDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(startDate), new Date(endDate));
        }
        if (project) {
            where.project = project;
        }
        const events = await this.usageEventRepository.find({ where });
        const modelMap = new Map();
        events.forEach((event) => {
            const key = `${event.provider}:${event.model}`;
            if (!modelMap.has(key)) {
                modelMap.set(key, {
                    model: event.model,
                    provider: event.provider,
                    totalTokens: 0,
                    totalCost: 0,
                    requestCount: 0,
                    avgLatencyMs: 0,
                });
            }
            const stats = modelMap.get(key);
            stats.totalTokens += event.totalTokens;
            stats.totalCost += event.cost || 0;
            stats.requestCount += 1;
            stats.avgLatencyMs =
                (stats.avgLatencyMs * (stats.requestCount - 1) + event.latencyMs) /
                    stats.requestCount;
        });
        return Array.from(modelMap.values()).sort((a, b) => b.totalCost - a.totalCost);
    }
    async getProjectStats(startDate, endDate) {
        const where = {};
        if (startDate && endDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(startDate), new Date(endDate));
        }
        const events = await this.usageEventRepository.find({ where });
        const projectMap = new Map();
        events.forEach((event) => {
            if (!projectMap.has(event.project)) {
                projectMap.set(event.project, {
                    project: event.project,
                    totalTokens: 0,
                    totalCost: 0,
                    requestCount: 0,
                    models: [],
                });
            }
            const stats = projectMap.get(event.project);
            stats.totalTokens += event.totalTokens;
            stats.totalCost += event.cost || 0;
            stats.requestCount += 1;
            if (!stats.models.includes(event.model)) {
                stats.models.push(event.model);
            }
        });
        return Array.from(projectMap.values()).sort((a, b) => b.totalCost - a.totalCost);
    }
    async getRequests(filters) {
        const { page = 1, limit = 50, sortOrder = 'desc', ...queryFilters } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (queryFilters.project) {
            where.project = queryFilters.project;
        }
        if (queryFilters.provider) {
            where.provider = queryFilters.provider;
        }
        if (queryFilters.model) {
            where.model = queryFilters.model;
        }
        if (queryFilters.startDate && queryFilters.endDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(queryFilters.startDate), new Date(queryFilters.endDate));
        }
        const [requests, total] = await this.usageEventRepository.findAndCount({
            where,
            order: { timestamp: sortOrder === 'desc' ? 'DESC' : 'ASC' },
            skip,
            take: limit,
        });
        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1,
            },
        };
    }
    async getRequestById(id) {
        const request = await this.usageEventRepository.findOne({
            where: { id },
        });
        if (!request) {
            return null;
        }
        return request;
    }
    async getFunctionStats(startDate, endDate, project) {
        const where = {};
        if (startDate && endDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(startDate), new Date(endDate));
        }
        if (project) {
            where.project = project;
        }
        const events = await this.usageEventRepository.find({ where });
        const functionMap = new Map();
        events.forEach((event) => {
            const functionName = event.functionName || 'unknown';
            if (!functionMap.has(functionName)) {
                functionMap.set(functionName, {
                    functionName,
                    totalTokens: 0,
                    inputTokens: 0,
                    outputTokens: 0,
                    totalCost: 0,
                    requestCount: 0,
                    avgLatencyMs: 0,
                });
            }
            const stats = functionMap.get(functionName);
            stats.totalTokens += event.totalTokens;
            stats.inputTokens += event.inputTokens;
            stats.outputTokens += event.outputTokens;
            stats.totalCost += event.cost || 0;
            stats.requestCount += 1;
            stats.avgLatencyMs =
                (stats.avgLatencyMs * (stats.requestCount - 1) + event.latencyMs) /
                    stats.requestCount;
        });
        return Array.from(functionMap.values()).sort((a, b) => b.totalCost - a.totalCost);
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usage_event_entity_1.UsageEventEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AnalyticsService);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRequestsDto = void 0;
const class_validator_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(16);
class GetRequestsDto {
    constructor() {
        this.page = 1;
        this.limit = 50;
        this.sortOrder = 'desc';
    }
}
exports.GetRequestsDto = GetRequestsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetRequestsDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetRequestsDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRequestsDto.prototype, "project", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRequestsDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRequestsDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRequestsDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetRequestsDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['asc', 'desc']),
    __metadata("design:type", String)
], GetRequestsDto.prototype, "sortOrder", void 0);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const config_controller_1 = __webpack_require__(23);
const config_service_1 = __webpack_require__(24);
const model_pricing_entity_1 = __webpack_require__(13);
const project_entity_1 = __webpack_require__(12);
let ConfigurationModule = class ConfigurationModule {
};
exports.ConfigurationModule = ConfigurationModule;
exports.ConfigurationModule = ConfigurationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([model_pricing_entity_1.ModelPricingEntity, project_entity_1.ProjectEntity])],
        controllers: [config_controller_1.ConfigController],
        providers: [config_service_1.ConfigService],
    })
], ConfigurationModule);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigController = void 0;
const common_1 = __webpack_require__(2);
const config_service_1 = __webpack_require__(24);
const pricing_dto_1 = __webpack_require__(25);
let ConfigController = class ConfigController {
    constructor(configService) {
        this.configService = configService;
    }
    async getAllPricing() {
        return this.configService.getAllPricing();
    }
    async createPricing(dto) {
        return this.configService.createOrUpdatePricing(dto);
    }
    async updatePricing(id, dto) {
        return this.configService.updatePricingById(id, dto);
    }
    async deletePricing(id) {
        await this.configService.deletePricing(id);
        return { success: true };
    }
    async getAllProjects() {
        return this.configService.getAllProjects();
    }
};
exports.ConfigController = ConfigController;
__decorate([
    (0, common_1.Get)('pricing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getAllPricing", null);
__decorate([
    (0, common_1.Post)('pricing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pricing_dto_1.CreatePricingDto !== "undefined" && pricing_dto_1.CreatePricingDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "createPricing", null);
__decorate([
    (0, common_1.Put)('pricing/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof pricing_dto_1.UpdatePricingDto !== "undefined" && pricing_dto_1.UpdatePricingDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "updatePricing", null);
__decorate([
    (0, common_1.Delete)('pricing/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "deletePricing", null);
__decorate([
    (0, common_1.Get)('projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConfigController.prototype, "getAllProjects", null);
exports.ConfigController = ConfigController = __decorate([
    (0, common_1.Controller)('config'),
    __metadata("design:paramtypes", [typeof (_a = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _a : Object])
], ConfigController);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(9);
const model_pricing_entity_1 = __webpack_require__(13);
const project_entity_1 = __webpack_require__(12);
let ConfigService = class ConfigService {
    constructor(pricingRepository, projectRepository) {
        this.pricingRepository = pricingRepository;
        this.projectRepository = projectRepository;
        this.seedDefaultPricing();
    }
    async getAllPricing() {
        return this.pricingRepository.find();
    }
    async createOrUpdatePricing(dto) {
        const existing = await this.pricingRepository.findOne({
            where: { provider: dto.provider, model: dto.model },
        });
        if (existing) {
            Object.assign(existing, dto);
            return this.pricingRepository.save(existing);
        }
        return this.pricingRepository.save(this.pricingRepository.create(dto));
    }
    async updatePricingById(id, dto) {
        await this.pricingRepository.update(id, dto);
        return this.pricingRepository.findOne({ where: { id } });
    }
    async deletePricing(id) {
        await this.pricingRepository.delete(id);
    }
    async getAllProjects() {
        return this.projectRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async seedDefaultPricing() {
        const count = await this.pricingRepository.count();
        if (count > 0)
            return;
        const defaultPricing = [
            {
                provider: 'openai',
                model: 'gpt-4',
                inputCostPer1k: 0.03,
                outputCostPer1k: 0.06,
            },
            {
                provider: 'openai',
                model: 'gpt-4-turbo',
                inputCostPer1k: 0.01,
                outputCostPer1k: 0.03,
            },
            {
                provider: 'openai',
                model: 'gpt-3.5-turbo',
                inputCostPer1k: 0.0005,
                outputCostPer1k: 0.0015,
            },
            {
                provider: 'anthropic',
                model: 'claude-3-opus-20240229',
                inputCostPer1k: 0.015,
                outputCostPer1k: 0.075,
            },
            {
                provider: 'anthropic',
                model: 'claude-3-sonnet-20240229',
                inputCostPer1k: 0.003,
                outputCostPer1k: 0.015,
            },
            {
                provider: 'anthropic',
                model: 'claude-3-haiku-20240307',
                inputCostPer1k: 0.00025,
                outputCostPer1k: 0.00125,
            },
            {
                provider: 'ollama',
                model: 'llama2',
                inputCostPer1k: 0,
                outputCostPer1k: 0,
            },
        ];
        await this.pricingRepository.save(defaultPricing);
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_pricing_entity_1.ModelPricingEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ConfigService);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePricingDto = exports.CreatePricingDto = void 0;
const class_validator_1 = __webpack_require__(15);
var Provider;
(function (Provider) {
    Provider["OPENAI"] = "openai";
    Provider["ANTHROPIC"] = "anthropic";
    Provider["OLLAMA"] = "ollama";
    Provider["GEMINI"] = "gemini";
    Provider["CUSTOM"] = "custom";
})(Provider || (Provider = {}));
class CreatePricingDto {
}
exports.CreatePricingDto = CreatePricingDto;
__decorate([
    (0, class_validator_1.IsEnum)(Provider),
    __metadata("design:type", String)
], CreatePricingDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePricingDto.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePricingDto.prototype, "inputCostPer1k", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePricingDto.prototype, "outputCostPer1k", void 0);
class UpdatePricingDto {
}
exports.UpdatePricingDto = UpdatePricingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdatePricingDto.prototype, "inputCostPer1k", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdatePricingDto.prototype, "outputCostPer1k", void 0);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebSocketModule = void 0;
const common_1 = __webpack_require__(2);
const usage_gateway_1 = __webpack_require__(27);
let WebSocketModule = class WebSocketModule {
};
exports.WebSocketModule = WebSocketModule;
exports.WebSocketModule = WebSocketModule = __decorate([
    (0, common_1.Module)({
        providers: [usage_gateway_1.UsageGateway],
        exports: [usage_gateway_1.UsageGateway],
    })
], WebSocketModule);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsageGateway = void 0;
const websockets_1 = __webpack_require__(28);
const socket_io_1 = __webpack_require__(29);
let UsageGateway = class UsageGateway {
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    broadcastUsageUpdate(event) {
        this.server.emit('usage_update', {
            type: 'usage_update',
            data: event,
        });
    }
    broadcastStatsUpdate(stats) {
        this.server.emit('stats_update', {
            type: 'stats_update',
            data: stats,
        });
    }
};
exports.UsageGateway = UsageGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], UsageGateway.prototype, "server", void 0);
exports.UsageGateway = UsageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
            credentials: true,
        },
    })
], UsageGateway);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const usage_event_entity_1 = __webpack_require__(10);
const model_pricing_entity_1 = __webpack_require__(13);
const project_entity_1 = __webpack_require__(12);
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: process.env.DATABASE_PATH || './data/llm-meter.db',
                entities: [usage_event_entity_1.UsageEventEntity, model_pricing_entity_1.ModelPricingEntity, project_entity_1.ProjectEntity],
                synchronize: true,
                logging: process.env.NODE_ENV === 'development',
            }),
        ],
    })
], DatabaseModule);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 LLM Meter Backend running on: http://localhost:${port}`);
    console.log(`📊 API available at: http://localhost:${port}/api`);
}
bootstrap();

})();

/******/ })()
;