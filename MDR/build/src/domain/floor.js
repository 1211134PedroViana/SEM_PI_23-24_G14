"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const floorId_1 = require("./floorId");
const Guard_1 = require("../core/logic/Guard");
const description_1 = require("./valueObjects/description");
class Floor extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get floorId() {
        return new floorId_1.FloorId(this.floorId.toValue());
    }
    get buildingId() {
        return this.props.buildingId;
    }
    get floorNumber() {
        return this.props.floorNumber;
    }
    set floorNumber(value) {
        this.props.floorNumber = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(floorDTO, id) {
        const buildingId = floorDTO.buildingId;
        const floorNumber = floorDTO.floorNumber;
        const description = description_1.Description.create(floorDTO.description).getValue();
        const guardedProps = [
            { argument: floorDTO.buildingId, argumentName: 'buildingId' },
            { argument: floorDTO.floorNumber, argumentName: 'floorNumber' },
            { argument: floorDTO.description, argumentName: 'description' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide a Building ID and a Floor number');
        }
        else {
            const floor = new Floor({ buildingId: buildingId, floorNumber: floorNumber, description: description }, id);
            return Result_1.Result.ok(floor);
        }
    }
}
exports.Floor = Floor;
//# sourceMappingURL=floor.js.map