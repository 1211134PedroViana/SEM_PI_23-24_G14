"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const location_1 = require("./valueObjects/location");
const dimension_1 = require("./valueObjects/dimension");
const RoomCode_1 = require("./valueObjects/RoomCode");
const description_1 = require("./valueObjects/description");
class Room extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get code() {
        return this.props.code;
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get dimension() {
        return this.props.dimension;
    }
    get location() {
        return this.props.location;
    }
    get floorId() {
        return this.props.floorId;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(roomDTO, id) {
        const code = RoomCode_1.RoomCode.create(roomDTO.code);
        const description = description_1.Description.create(roomDTO.description);
        const dimension = dimension_1.Dimension.create({
            pos1: roomDTO.dimension.pos1,
            pos2: roomDTO.dimension.pos2,
            pos3: roomDTO.dimension.pos3,
            pos4: roomDTO.dimension.pos4,
        });
        const location = location_1.Location.create({
            positionX: roomDTO.location.positionX,
            positionY: roomDTO.location.positionY,
            direction: roomDTO.location.direction,
        });
        const guardedProps = [
            { argument: roomDTO.code, argumentName: 'code' },
            { argument: roomDTO.name, argumentName: 'name' },
            { argument: roomDTO.dimension, argumentName: 'dimension' },
            { argument: roomDTO.location, argumentName: 'location' },
            { argument: roomDTO.floorId, argumentName: 'floorId' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Failed to create a Room: ' + guardResult.message);
        }
        else {
            const room = new Room({
                code: code.getValue(),
                name: roomDTO.name,
                description: description.getValue(),
                dimension: dimension.getValue(),
                location: location.getValue(),
                floorId: roomDTO.floorId,
            }, id);
            return Result_1.Result.ok(room);
        }
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map