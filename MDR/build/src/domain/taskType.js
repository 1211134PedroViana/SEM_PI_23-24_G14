"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskType = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const taskTypeId_1 = require("./valueObjects/taskTypeId");
class TaskType extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get taskTypeId() {
        return new taskTypeId_1.TaskTypeId(this.taskTypeId.toValue());
    }
    get name() {
        return this.props.name;
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
    static create(props, id) {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'brand' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide a TaskType name and a description');
        }
        else {
            const taskType = new TaskType({ name: props.name, description: props.description }, id);
            return Result_1.Result.ok(taskType);
        }
    }
}
exports.TaskType = TaskType;
//# sourceMappingURL=taskType.js.map