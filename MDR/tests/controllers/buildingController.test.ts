import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../src/core/logic/Result';
import IBuildingDTO from '../../src/dto/IBuildingDTO';
import BuildingController from '../../src/controllers/buildingController';
import IBuildingService from '../../src/services/IServices/IBuildingService';
import BuildingRepo from '../../src/repos/buildingRepo';
import BuildingService from '../../src/services/buildingService';
import BuildingSchema from '../../src/persistence/schemas/buildingSchema';
import { SinonSpy } from 'sinon';
import { Building } from '../../src/domain/building';


describe('Building Controller', function () {

    let buildingRepo : BuildingRepo;
    let service : BuildingService;

	beforeEach(function() {
		buildingRepo = new BuildingRepo(BuildingSchema);
        service = new BuildingService(buildingRepo);
    });

	afterEach(function() {
		sinon.restore();
	});

    it('buildingController unit test using buildingService stub', async function () {
        
		// Arrange
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy() as SinonSpy<[any?]>
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(service, "createBuilding").resolves( Result.ok<IBuildingDTO>( {
            "id": "123",
            "code": req.body.code,
            "description": req.body.description,"name": req.body.name} 
        ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

        try {
            // Assert
		    sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
		    sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ 
                "id": "123",
                "code": req.body.code,
                "description": req.body.description,
				"name": req.body.name
            }));

        } catch(error) {
            throw error;
        }

		sinon.restore();
	});

    /*
    it('buildingController + buildingService integration test using buildingRepoistory and Building stubs', async function () {	
		// Arrange	
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy() as SinonSpy<[any?]>
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").resolves(Result.ok({
			"code": req.body.code,
			"description": req.body.description,
			"name": req.body.name
		}));

		 const saveStub = sinon.stub(buildingRepo, "save");
		 const building: any  = Building.create({
			"code": req.body.code,
			"description": req.body.description,
			"name": req.body.name
		  }).getValue();
		  
		  // Stub the save method to resolve with the expected Building instance
		  saveStub.resolves(building);

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		try {

			// Assert
		    sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
		    sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ 
				"code": req.body.code,
			    "description": req.body.description,
			    "name": req.body.name
		    }));

		} catch(error) {
			throw error;
		}
		sinon.restore();
	});
	*/


    it('buildingController + buildingService integration test using spy on buildingService', async function () {		
		// Arrange
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy() as SinonSpy<[any?]>
        };
		let next: Partial<NextFunction> = () => {};

		const buildingDTO = {
			code: req.body.code,
			description: req.body.description,
			name: req.body.name
		} as IBuildingDTO;

		sinon.stub(buildingRepo, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create(buildingDTO).getValue())
		}));

		const buildingServiceMock: IBuildingService = {

			createBuilding: async (buildingDTO: IBuildingDTO) => {
				const dummyResult: Result<IBuildingDTO> = Result.ok({
					"id": "123",
					"code": req.body.code,
                    "description": req.body.description,
				    "name": req.body.name
				});
				
				return Promise.resolve(dummyResult);
			},
			updateBuilding: async (buildingDTO: IBuildingDTO) => {
				const dummyResult: Result<IBuildingDTO> = Result.ok({
					"id": "123",
					"code": req.body.code,
                    "description": req.body.description,
				    "name": req.body.name
				});
				
				return Promise.resolve(dummyResult);
			},
			getAllBuildings: async () => {
				const buildingList: IBuildingDTO[] = [
					{
					  "id": "test1",
					  "code": "IDK01",
                      "description": "Departamento de testes",
				      "name": "stuff"
					},
					{
						"id": "test2",
						"code": "IDK02",
						"description": "Departamento de testes 2.0",
						"name": "stuff 2"
					},
					
				  ];
				  const result: Result<IBuildingDTO[]> = Result.ok(buildingList);
				
				  return Promise.resolve(result);
			},
		};

		const createBuildingSpy: SinonSpy = sinon.spy(buildingServiceMock, 'createBuilding');
		const updateBuildingSpy: SinonSpy = sinon.spy(buildingServiceMock, 'updateBuilding');
		const getAllBuildingsSpy: SinonSpy = sinon.spy(buildingServiceMock, 'getAllBuildings');

		const ctrl = new BuildingController(buildingServiceMock as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		try {

			// Assert
		    sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
		    sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ 
			    "code": "IDGAF",
			    "description": req.body.description,
				"id": "123",
			    "name": req.body.name
		    }));

		    sinon.assert.calledOnce(createBuildingSpy);
		    sinon.assert.calledWith(createBuildingSpy, sinon.match({
				code: req.body.code,
			    description: req.body.description,
			    name: req.body.name
		    }));

		} catch(error) {
			throw error;
		}
		sinon.restore();
	});

	/*
    it('buildingController unit test using buildingService mock', async function () {		
		// Arrange
        let body = { "code":'IDGAF', "description":'Departamento de Testos', "name":'somesing' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy() as SinonSpy<[any?]>
        };
		let next: Partial<NextFunction> = () => {};

		const buildingServiceSpy: SinonSpy = sinon.spy(service, "createBuilding");
		
		const buildingServiceMock = sinon.mock(buildingServiceSpy);
		buildingServiceMock.expects("createBuilding")
			.once()
			.withArgs(sinon.match({
				code: req.body.code,
				description: req.body.description,
				name: req.body.name
			}))
			.returns(Result.ok<IBuildingDTO>( {
				"id": "123",
				"code": req.body.code,
				"description": req.body.description,
				"name": req.body.name
			} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		try {

			buildingServiceMock.verify();
			sinon.assert.calledOnce(res.json as SinonSpy<[any?]>);
			sinon.assert.calledWith(res.json as SinonSpy<[any?]>, sinon.match({ 
				"id": "123",
			    "code": req.body.code,
			    "description": req.body.description,
			    "name": req.body.name
		    }));

		} catch(error) {
			throw error;
		}
		sinon.restore();
	});
    */
});
