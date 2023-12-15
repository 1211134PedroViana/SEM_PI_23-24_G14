"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTypeMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const taskType_1 = require("../domain/taskType");
class TaskTypeMap extends Mapper_1.Mapper {
    static toDTO(taskType) {
        return {
            id: taskType.id.toString(),
            name: taskType.name,
            description: taskType.description.value
        };
    }
    static toDomain(taskType) {
        const taskTypeOrError = taskType_1.TaskType.create(taskType, new UniqueEntityID_1.UniqueEntityID(taskType.domainId));
        taskTypeOrError.isFailure ? console.log(taskTypeOrError.error) : '';
        return taskTypeOrError.isSuccess ? taskTypeOrError.getValue() : null;
    }
    static toPersistence(taskType) {
        return {
            domainId: taskType.id.toString(),
            name: taskType.name,
            description: taskType.description.value
        };
    }
}
exports.TaskTypeMap = TaskTypeMap;
//# sourceMappingURL=TaskTypeMap.js.map