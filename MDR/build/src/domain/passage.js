"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passage = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const location_1 = require("./valueObjects/location");
const passageId_1 = require("./passageId");
const description_1 = require("./valueObjects/description");
class Passage extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get passageId() {
        return new passageId_1.PassageId(this.passageId.toValue());
    }
    get fromBuildingId() {
        return this.props.fromBuildingId;
    }
    get toBuildingId() {
        return this.props.toBuildingId;
    }
    get fromFloorId() {
        return this.props.fromFloorId;
    }
    get toFloorId() {
        return this.props.toFloorId;
    }
    get location() {
        return this.props.location;
    }
    get description() {
        return this.props.description;
    }
    set fromBuildingId(value) {
        this.fromBuildingId = value;
    }
    set toBuildingId(value) {
        this.toBuildingId = value;
    }
    set fromFloorId(value) {
        this.fromFloorId = value;
    }
    set toFloorId(value) {
        this.toFloorId = value;
    }
    set location(value) {
        this.location = value;
    }
    set description(value) {
        this.description = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(passageDTO, id) {
        const location = location_1.Location.create({
            positionX: passageDTO.location.positionX,
            positionY: passageDTO.location.positionY,
            direction: passageDTO.location.direction,
        });
        const description = description_1.Description.create(passageDTO.description);
        const guardedProps = [
            { argument: passageDTO.fromBuildingId, argumentName: 'fromBuildingId' },
            { argument: passageDTO.toBuildingId, argumentName: 'toBuildingId' },
            { argument: passageDTO.fromFloorId, argumentName: 'fromFloorId' },
            { argument: passageDTO.toFloorId, argumentName: 'toFloorId' },
            { argument: passageDTO.location, argumentName: 'location' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide the Floor IDs and the Location');
        }
        else {
            const passage = new Passage({ fromBuildingId: passageDTO.fromBuildingId, toBuildingId: passageDTO.toBuildingId, fromFloorId: passageDTO.fromFloorId, toFloorId: passageDTO.toFloorId, location: location.getValue(), description: description.getValue() }, id);
            return Result_1.Result.ok(passage);
        }
    }
}
exports.Passage = Passage;
//# sourceMappingURL=passage.js.map