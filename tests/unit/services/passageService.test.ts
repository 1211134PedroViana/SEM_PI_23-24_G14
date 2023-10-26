import sinon from 'sinon';
import { expect } from 'chai';
import PassageRepo from '../../../src/repos/passageRepo';
import FloorRepo from '../../../src/repos/floorRepo';
import PassageService from '../../../src/services/passageService';
import PassageSchema from '../../../src/persistence/schemas/passageSchema';
import FloorSchema from '../../../src/persistence/schemas/floorSchema';

describe("Passage service", () => {

    describe("Create Passage", () => {
        let passageRepo : PassageRepo;
        let floorRepo: FloorRepo;
        let service : PassageService;

        let stub1, stub2;

        before(() => {
            passageRepo = new PassageRepo(PassageSchema);
            floorRepo = new FloorRepo(FloorSchema);
            stub1 = sinon.stub(passageRepo, "save");
            service = new PassageService(passageRepo, floorRepo);
        })

        after(() => {
            stub1.restore();
        })

    });

});