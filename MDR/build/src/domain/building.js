"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const buildingId_1 = require("./buildingId");
const buildingCode_1 = require("./valueObjects/buildingCode");
const description_1 = require("./valueObjects/description");
const Guard_1 = require("../core/logic/Guard");
class Building extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get buildingId() {
        return new buildingId_1.BuildingId(this.buildingId.toValue());
    }
    get code() {
        return this.props.code;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(buildingDTO, id) {
        const code = buildingCode_1.BuildingCode.create(buildingDTO.code).getValue();
        const description = description_1.Description.create(buildingDTO.description).getValue();
        const name = buildingDTO.name;
        const guardedProps = [
            { argument: buildingDTO.code, argumentName: 'code' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide a building code');
        }
        else {
            const building = new Building({ code: code, name: name, description: description }, id);
            return Result_1.Result.ok(building);
        }
    }
}
exports.Building = Building;
//# sourceMappingURL=building.js.map