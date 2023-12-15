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
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const SystemUserMap_1 = require("../mappers/SystemUserMap");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
let SystemUserRepo = class SystemUserRepo {
    constructor(systemUserSchema) {
        this.systemUserSchema = systemUserSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(systemUser) {
        try {
            const idX = systemUser.id instanceof UniqueEntityID_1.UniqueEntityID ? systemUser.id.toValue() : systemUser.id;
            const query = { domainId: idX };
            const systemUserDocument = await this.systemUserSchema.findOne(query);
            return !!systemUserDocument;
        }
        catch (error) {
            console.error('Error checking existence of SystemUser:', error);
            return false;
        }
    }
    async save(systemUser) {
        const query = { domainId: systemUser.id };
        const systemUserDocument = await this.systemUserSchema.findOne(query);
        try {
            if (systemUserDocument === null) {
                const rawBuilding = SystemUserMap_1.SystemUserMap.toPersistence(systemUser);
                const systemUserCreated = await this.systemUserSchema.create(rawBuilding);
                return SystemUserMap_1.SystemUserMap.toDomain(systemUserCreated);
            }
            else {
                if (systemUser.role === undefined || systemUser.role === '') {
                    systemUserDocument.email = systemUser.email;
                }
                else if (systemUser.email === undefined || systemUser.email === '') {
                    systemUserDocument.role = systemUser.role;
                }
                else {
                    systemUserDocument.role = systemUser.role;
                    systemUserDocument.email = systemUser.email;
                }
                await systemUserDocument.save();
                return systemUser;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(systemUserId) {
        try {
            const query = { domainId: systemUserId };
            const systemUserRecord = await this.systemUserSchema.findOne(query);
            return systemUserRecord ? SystemUserMap_1.SystemUserMap.toDomain(systemUserRecord) : null;
        }
        catch (error) {
            console.error('Error finding Building by domainId:', error);
            throw error; // ou retorne null ou outro valor padrão dependendo da sua lógica
        }
    }
    async findByEmail(email) {
        try {
            const query = { email: email };
            const systemUserRecord = await this.systemUserSchema.findOne(query);
            return systemUserRecord ? SystemUserMap_1.SystemUserMap.toDomain(systemUserRecord) : null;
        }
        catch (error) {
            console.error('Error finding SystemUser by email:', error);
            throw error; // ou retorne null ou outro valor padrão dependendo da sua lógica
        }
    }
};
SystemUserRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('buildingSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SystemUserRepo);
exports.default = SystemUserRepo;
//# sourceMappingURL=systemUserRepo.js.map