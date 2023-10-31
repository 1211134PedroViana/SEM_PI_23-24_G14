import sinon from 'sinon';
import { expect } from 'chai';
import PassageRepo from '../../../src/repos/passageRepo';
import FloorRepo from '../../../src/repos/floorRepo';
import PassageService from '../../../src/services/passageService';
import PassageSchema from '../../../src/persistence/schemas/passageSchema';
import FloorSchema from '../../../src/persistence/schemas/floorSchema';
import IPassageDTO from '../../../src/dto/IPassageDTO';

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
            stub2 = sinon.stub(floorRepo, "findByObjectId");
            service = new PassageService(passageRepo, floorRepo);
        })

        after(() => {
            stub1.restore();
            stub2.restore();
        })

        it("Should create Passage with success", async () => {
            const passageDTO = {
                fromFloorId: "653a39fa63d09ff25a368334",
                toFloorId: "653a3a0a63d09ff25a368338",
                location: {
                    positionX:2,
                    positionY:3,
                    direction:"north"
                }
            } as IPassageDTO;

            stub2.withArgs(passageDTO.fromFloorId).resolves({ id: passageDTO.fromFloorId }); // Replace with your mock data
            stub2.withArgs(passageDTO.toFloorId).resolves({ id: passageDTO.toFloorId }); // Replace with your mock data

            try {
                const done = await service.createPassage(passageDTO);
                
                expect(done.isSuccess).to.equal(true);
                expect(done.getValue().fromFloorId).to.be.equal(passageDTO.fromFloorId);
                expect(done.getValue().toFloorId).to.be.equal(passageDTO.toFloorId);
                expect(done.getValue().location.positionX).to.be.equal(passageDTO.location.positionX);
                expect(done.getValue().location.positionY).to.be.equal(passageDTO.location.positionY);
                expect(done.getValue().location.direction).to.be.equal(passageDTO.location.direction);

            } catch (error) {
                throw error;
            }
        });

        it("Should return fail when creating a Passage with a Floor that dont exist", async () => {
            const passageDTO = {
                fromFloorId: "653a39fa63d09ff25a368330",
                toFloorId: "653a3a0a63d09ff25a368330",
                location: {
                    positionX:2,
                    positionY:3,
                    direction:"north"
                }
            } as IPassageDTO;

            stub2.withArgs(passageDTO.fromFloorId).resolves({ id: passageDTO.fromFloorId }); // Replace with your mock data
            stub2.withArgs(passageDTO.toFloorId).resolves(null); // Replace with your mock data

            try {
                const done = await service.createPassage(passageDTO);
                
                expect(done.isSuccess).to.equal(false);
                expect(done.errorValue()).to.equal('Floor with ID "' + passageDTO.toFloorId + '" not found');
            
            } catch (error) {
                throw error;
            }
        });


    });

});