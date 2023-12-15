"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorMapperz = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const floorMapperzId_1 = require("./floorMapperzId");
/*
 "map": [
            [3, 2, 2, 2, 2, 3, 2, 2, 1],
            [1, 0, 0, 0, 0, 2, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 2, 2, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 2],
            [1, 0, 0, 0, 0, 0, 1, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2]
        ],

        Walls of the Floor:
        0 -> no walls in the cell
        1 -> wall at west of the cell
        2 -> wall at north of the cell
        3 -> wall both at north and west of the cell

*/
// Class de Homenagem a 🔥'Ric Da Fazzerz' the one and only🔥
// #pinguins4ever
class FloorMapperz extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get floorMapperzId() {
        return new floorMapperzId_1.FloorMapperzId(this.floorMapperzId.toValue());
    }
    get floorId() {
        return this.props.floorId;
    }
    get fileUrl() {
        return this.props.fileUrl;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.fileUrl, argumentName: 'fileUrl' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide the File URL');
        }
        else {
            const floorMapperz = new FloorMapperz({ floorId: props.floorId, fileUrl: props.fileUrl }, id);
            return Result_1.Result.ok(floorMapperz);
        }
    }
}
exports.FloorMapperz = FloorMapperz;
//# sourceMappingURL=floorMapperz.js.map