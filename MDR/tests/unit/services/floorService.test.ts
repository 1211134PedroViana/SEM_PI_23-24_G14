import sinon from 'sinon';
import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import FloorRepo from '../../../src/repos/floorRepo';
import BuildingRepo from '../../../src/repos/buildingRepo';
import FloorService from '../../../src/services/floorService';
import FloorSchema from '../../../src/persistence/schemas/floorSchema';
import BuildingSchema from '../../../src/persistence/schemas/buildingSchema';
import IFloorDTO from '../../../src/dto/IFloorDTO';
import { BuildingCode } from '../../../src/domain/valueObjects/buildingCode';
import { Description } from '../../../src/domain/valueObjects/description';
import { Building } from '../../../src/domain/building';
import { SinonStub, stub } from 'sinon';
import { Floor } from '../../../src/domain/floor';

describe("Floor service", () => {

    describe("Create Floor", () => {
        let floorRepo : FloorRepo;
        let buildingRepo: BuildingRepo;
        let service : FloorService;

        let stub1, stub2;

        before(() => {
            floorRepo = new FloorRepo(FloorSchema);
            buildingRepo = new BuildingRepo(BuildingSchema);
            stub1 = sinon.stub(buildingRepo, "findByObjectId");
            stub2 = sinon.stub(floorRepo, "save");
            service = new FloorService(floorRepo, buildingRepo);
        })

        after(() => {
            stub1.restore();
            stub2.restore();
        })

        it("Should create Floor with success", async () => {
            const floorDTO = {
                buildingId: "653cdb20bdfbb9dcbdcd24bd",
                floorNumber: 2,
                description: "Departamento de Testes"
            } as IFloorDTO;

            stub1.withArgs(floorDTO.buildingId).resolves({ id: floorDTO.buildingId }); // Replace with your mock data


            try {
                const done = await service.createFloor(floorDTO);
                
                expect(done.isSuccess).to.equal(true);
                expect(done.getValue().buildingId).to.be.equal(floorDTO.buildingId);
                expect(done.getValue().floorNumber).to.be.equal(floorDTO.floorNumber);
                expect(done.getValue().description).to.be.equal(floorDTO.description);

            } catch (error) {
                throw error;
            }
        });

        it('Should return result fail when creating a Floor with no existing Building', async () => {
            const floorDTO = {
                buildingId: "653cdb20bdfbb9dcbdcd24bd",
                floorNumber: 2,
                description: "Departamento de Testes"
            } as IFloorDTO;

            stub1.withArgs(floorDTO.buildingId).resolves(null); // Replace with your mock data


            try {
                const done = await service.createFloor(floorDTO);
                
                expect(done.isSuccess).to.equal(false); // Check if it's not a success
                expect(done.isFailure).to.equal(true); // Check if it's a failure
                //expect(done.errorValue()).to.equal('Invalid Building Code!');

            } catch (error) {
                throw error;
            }

        });

        
    });

    describe("Edit floors", () => {

        let floorRepo : FloorRepo;
        let buildingRepo: BuildingRepo;
        let service : FloorService;

        let stub1, stub2;

        before(() => {
            floorRepo = new FloorRepo(FloorSchema);
            buildingRepo = new BuildingRepo(BuildingSchema);
            stub1 = sinon.stub(floorRepo, "findByDomainId");
            stub2 = sinon.stub(floorRepo, "save");
            service = new FloorService(floorRepo, buildingRepo);
        })

        after(() => {
            stub1.restore();
            stub2.restore();
        })

        it("Should edit floors with success", async () => {

            const floorDTO = {
                buildingId: "653cdb20bdfbb9dcbdcd24bd",
                floorNumber: 2,
                description: "Departamento de Testes"
            } as IFloorDTO;

            const updatedFloorDTO = {
                id: "06760ac1-21df-402a-8a44-8b960bba1875",
                floorNumber: 5,
                description: "Departamento de Testes 2.0"
            } as IFloorDTO;

            const floorOriginal = Floor.create(floorDTO, new UniqueEntityID);

            const updatedFloor = Floor.create(updatedFloorDTO, floorOriginal.getValue().id);

            stub2.resolves(floorOriginal.getValue());
            stub1.resolves(floorOriginal.getValue());

            try {

                const done = await service.updateFloor(updatedFloorDTO);

                expect(done.isSuccess).to.equal(true);
                expect(done.getValue().description).to.be.equal(updatedFloorDTO.description);
                expect(done.getValue().floorNumber).to.be.equal(updatedFloorDTO.floorNumber);

            } catch(error) {
                throw error;
            }
        })

        it("Should return fail when updating a Floor that dont exist", async () => {
            const floorDTO = {
                id: "653d10ec9e8ca901b3d01770",
                buildingId: "653cdb20bdfbb9dcbdcd24bd",
                floorNumber: 2,
                description: "Departamento de Testes"
            } as IFloorDTO;

            stub1.resolves(null);

            try {

                const done = await service.updateFloor(floorDTO);
                expect(done.isFailure).to.equal(true);
                //expect(done.errorValue()).to.equal("Floor not found with id:" + floorDTO.id);

            } catch(error) {
                throw error;
            }
        })
    })
    
})