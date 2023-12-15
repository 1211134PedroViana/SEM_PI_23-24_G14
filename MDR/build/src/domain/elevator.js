"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const elevatorCode_1 = require("./valueObjects/elevatorCode");
const Guard_1 = require("../core/logic/Guard");
const location_1 = require("./valueObjects/location");
const description_1 = require("./valueObjects/description");
class Elevator extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get code() {
        return this.props.code;
    }
    get location() {
        return this.props.location;
    }
    get buildingId() {
        return this.props.buildingId;
    }
    get floorList() {
        return this.props.floorList;
    }
    get brand() {
        return this.props.brand;
    }
    get model() {
        return this.props.model;
    }
    get serialNumber() {
        return this.props.serialNumber;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    set code(value) {
        this.props.code = value;
    }
    set location(value) {
        this.props.location = value;
    }
    set buildingId(value) {
        this.props.buildingId = value;
    }
    set brand(value) {
        this.props.brand = value;
    }
    set model(value) {
        this.props.model = value;
    }
    set serialNumber(value) {
        this.props.serialNumber = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(elevatorDTO, id) {
        const code = elevatorCode_1.ElevatorCode.create(elevatorDTO.code);
        const location = location_1.Location.create({
            positionX: elevatorDTO.location.positionX,
            positionY: elevatorDTO.location.positionY,
            direction: elevatorDTO.location.direction,
        });
        const description = description_1.Description.create(elevatorDTO.description);
        const guardedProps = [
            { argument: elevatorDTO.code, argumentName: 'code' },
            { argument: elevatorDTO.location, argumentName: 'location' },
            { argument: elevatorDTO.buildingId, argumentName: 'buildingId' },
            { argument: elevatorDTO.floorList, argumentName: 'floorList' },
            { argument: elevatorDTO.brand, argumentName: 'brand' },
            { argument: elevatorDTO.model, argumentName: 'model' },
            { argument: elevatorDTO.serialNumber, argumentName: 'serialNumber' },
            { argument: elevatorDTO.description, argumentName: 'description' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(' ');
        }
        else {
            const elevator = new Elevator({
                code: code.getValue(),
                location: location.getValue(),
                buildingId: elevatorDTO.buildingId,
                floorList: elevatorDTO.floorList,
                brand: elevatorDTO.brand,
                model: elevatorDTO.model,
                serialNumber: elevatorDTO.serialNumber,
                description: description.getValue(),
            }, id);
            return Result_1.Result.ok(elevator);
        }
    }
}
exports.Elevator = Elevator;
//# sourceMappingURL=elevator.js.map