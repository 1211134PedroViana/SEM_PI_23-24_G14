import RobotRepo from '../../../src/repos/robotRepo';
import RobotService from '../../../src/services/robotService';
import RobotSchema from '../../../src/persistence/schemas/robotSchema';
import { SinonStub, stub } from 'sinon';
import sinon from 'sinon';
import IRobotDTO from '../../../src/dto/IRobotDTO';
import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import robotSchema from '../../../src/persistence/schemas/robotSchema';
import { RobotCode } from '../../../src/domain/robotCode';

describe("Robot service", () => {
    describe("Create robot", () => {
        let robotRepo : RobotRepo;
        let service : RobotService;
        
        let stub1, stub2;

        before (() => {
            robotRepo = new RobotRepo(RobotSchema);
            stub1 = sinon.stub(robotRepo, "save");
            stub2 = sinon.stub(robotRepo, "findByCode");
            service = new RobotService(robotRepo);
        })

        after(() => {
            stub1.restore();
            stub2.restore();
        })

        it("Should create Robot with success", async () => { 
            const robotDTO = {
                code: "ABCD",
                nickname: "TestRobot",
                robotType: "robot",
                serialNumber: 123456789,
                description: "Isto e um teste",
                status: "Online"
            } as IRobotDTO;

            try {
                const done = await service.createRobot(robotDTO);

                expect(done.isSuccess).to.equal(true);
                expect(done.getValue().code).to.be.equal(robotDTO.code);
                expect(done.getValue().nickname).to.be.equal(robotDTO.nickname);
                expect(done.getValue().robotType).to.be.equal(robotDTO.robotType);
                expect(done.getValue().serialNumber).to.be.equal(robotDTO.serialNumber);
                expect(done.getValue().description).to.be.equal(robotDTO.description);
                expect(done.getValue().status).to.be.equal(robotDTO.status);

            } catch (e) {
                throw e;
            }
        });

        it('Should rerturn fail when creating a robot with invalid code format', async () => {
            const robotDTO = {
                id: new UniqueEntityID().toString(),
                code: "DEFG",
                nickname: "TestRobot",
                robotType: "robot",
                serialNumber: 123456789,
                description: "Isto e um teste",
                status: "Online"
            } as IRobotDTO;

            try {
                const done = await service.createRobot(robotDTO);

                expect(done.isSuccess).to.equal(false); //check if it's not a success
                expect(done.isFailure).to.equal(true);  //check if it's not a failure
                expect(done.errorValue()).to.equal('Invalid robot code!');

            } catch (e) {
                throw e;
            }

        });

        describe("Edit robot", () => {
            let robotRepo : RobotRepo;
            let rService : RobotService;

            let stub1;
            let stub2;

            before(() => {
                robotRepo = new RobotRepo(robotSchema);
                stub1 = sinon.stub(robotRepo, "save");
                stub2 = sinon.stub(robotRepo, "findByDomainId");
                rService = new RobotService(robotRepo);
            })

            after(() => {
                stub1.restore();
                stub2.restore();
            })
            
            /*
            it ("Shoud edit robots with success", async () => {
                const code = RobotCode.create("GRGG2");
                const des
            })
            */
        })

        
    })

})