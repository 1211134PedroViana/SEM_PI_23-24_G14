import sinon from 'sinon';
import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import BuildingRepo from '../../../src/repos/buildingRepo';
import BuildingService from '../../../src/services/buildingService';
import BuildingSchema from '../../../src/persistence/schemas/buildingSchema';
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import { BuildingCode } from '../../../src/domain/buildingCode';
import { Description } from '../../../src/domain/description';
import { Building } from '../../../src/domain/building';
import { SinonStub, stub } from 'sinon';

describe("Building service", () => {

    describe("Create Building", () => {
        let buildingRepo : BuildingRepo;
        let service : BuildingService;

        let stub1, stub2;

        before(() => {
            buildingRepo = new BuildingRepo(BuildingSchema);
            stub1 = sinon.stub(buildingRepo, "save");
            stub2 = sinon.stub(buildingRepo, "findByCode");
            service = new BuildingService(buildingRepo);
        })

        after(() => {
            stub1.restore();
            stub2.restore();
        })

        it("Should create Building with success", async () => {
            const buildingDTO = {
                code: "BBGER",
                description: "Departamento de Testes",
                name: "test"
            } as IBuildingDTO;

            try {
                const done = await service.createBuilding(buildingDTO);
                
                expect(done.isSuccess).to.equal(true);
                expect(done.getValue().code).to.be.equal(buildingDTO.code);
                expect(done.getValue().description).to.be.equal(buildingDTO.description);
                expect(done.getValue().name).to.be.equal(buildingDTO.name);

            } catch (error) {
                throw error;
            }
        });

        it('Should return result fail when creating a Building with invalid Code format', async () => {
            const buildingDTO = {
                id: new UniqueEntityID().toString(),
                code: "AD56J4",
                description: "Departamento de Testes",
                name: "test"
            } as IBuildingDTO;

            try {
                const done = await service.createBuilding(buildingDTO);
                
                expect(done.isSuccess).to.equal(false); // Check if it's not a success
                expect(done.isFailure).to.equal(true); // Check if it's a failure
                expect(done.errorValue()).to.equal('Invalid Building Code!');

            } catch (error) {
                throw error;
            }

        });

        
    });

    describe("Edit buildings", () => {

        let buildingRepo : BuildingRepo;
        let bService : BuildingService;

        let stub1, stub2;

        before(() => {
            buildingRepo = new BuildingRepo(BuildingSchema);
            stub1 = sinon.stub(buildingRepo, "save");
            stub2 = sinon.stub(buildingRepo, "findByDomainId");
            bService = new BuildingService(buildingRepo);
        })

        after(() => {
            stub1.restore();
            stub2.restore();
        })

        it("Should edit buildings with success", async () => {
            const code = BuildingCode.create("GGHF5");
            const description = Description.create("Departamento de Testes 1.0");
            const newDescription = Description.create("Departamento de Testes 2.0");

            const buildingOriginal = Building.create({
                code: code.getValue(),
                description: description.getValue(),
                name: "some building"
            }, new UniqueEntityID());

            const newBuilding = Building.create({
                code: code.getValue(),
                description: newDescription.getValue(),
                name: "some building 2.0"
            }, buildingOriginal.getValue().id);

            const buildingDTO = {
                id: buildingOriginal.getValue().id.toString(),
                description: newDescription.getValue().value,
                name: "some building 2.0"
            } as IBuildingDTO;

            stub1.resolves(buildingOriginal.getValue());
            stub2.resolves(newBuilding.getValue());

            try {

                const done = await bService.updateBuilding(buildingDTO);

                expect(done.isSuccess).to.equal(true);
                expect(done.getValue().description).to.be.equal(buildingDTO.description);
                expect(done.getValue().name).to.be.equal(buildingDTO.name);

            } catch(error) {
                throw error;
            }
        })

        it("Should not update buildings with invalid new attribute", async () => {
            const code = BuildingCode.create("GGHF5");
            const description = Description.create("Departamento de Testes");

            const buildingOriginal = Building.create({
                code: code.getValue(),
                description: description.getValue(),
                name: "some building"
            }, new UniqueEntityID());

            const buildingDTO = {
                id: buildingOriginal.getValue().id.toString(),
                description: "SJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJSJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ"
            } as IBuildingDTO;

            stub1.resolves(buildingOriginal.getValue());

            try {

                const done = await bService.updateBuilding(buildingDTO);
                expect(done.isFailure).to.equal(true);

            } catch(error) {
                throw error;
            }

        })

        it("Should return fail when updating a Building that dont exist", async () => {
            const buildingDTO = {
                id: "test",
                description: "test"
            } as IBuildingDTO;

            stub2.resolves(null);

            try {

                const done = await bService.updateBuilding(buildingDTO);
                expect(done.isFailure).to.equal(true);
                expect(done.errorValue()).to.equal("Building not found with id:" + buildingDTO.id);

            } catch(error) {
                throw error;
            }
        })
    })
    
})