"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUser = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
class SystemUser extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get email() {
        return this.props.email; // Usei o email como código, ajuste conforme necessário
    }
    get role() {
        return this.props.role;
    }
    set password(value) {
        this.props.password = value;
    }
    set role(value) {
        this.props.role = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(systemUserDTO, id) {
        const email = systemUserDTO.email;
        const password = systemUserDTO.password;
        const role = systemUserDTO.role;
        const guardedProps = [
            { argument: email, argumentName: 'email' },
            { argument: password, argumentName: 'password' },
            { argument: role, argumentName: 'role' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail('Must provide valid email, password, and role');
        }
        else {
            const systemUser = new SystemUser({ email, password, role }, id);
            return Result_1.Result.ok(systemUser);
        }
    }
}
exports.SystemUser = SystemUser;
//# sourceMappingURL=systemUser.js.map