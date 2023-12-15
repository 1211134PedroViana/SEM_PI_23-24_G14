"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const cellId_1 = require("./cellId");
class Cell {
    get cellId() {
        return new cellId_1.CellId(this.cellId.toValue());
    }
    get buildingId() {
        return this.buildingId;
    }
    get floorId() {
        return this.floorId;
    }
    static create() {
    }
}
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map