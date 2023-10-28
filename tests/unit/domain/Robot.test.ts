/*
import { Description } from '../../../src/domain/description';
import { Robot } from '../../../src/domain/robot';
import { RobotCode } from '../../../src/domain/robotCode';
import { expect } from 'chai';
import 'mocha';


interface RobotProps {
    code: string;
    nickname: string;
    robotType: string;
    serialNumber: Number;
    description: Description;
    status: string;
}

describe("Robot domain", () => {
    beforeEach(function() {});
    
    it ('Should return result success when creating a Robot with valid arguments', () => {
        const robot = Robot.create(
        {
            code: RobotCode.create("AX57H").getValue(),
            nickname: "Nice robot",
            robotType: "robot",
            serialNumber: 12312323,
            description: Description.create("Nice description").getValue(),
            status: "Online"
        });
        expect(true).to.equal(robot.isSuccess);
        expect(false).to.equal(robot.isFailure);
    })

    
    it('Should create a valid instance of robot', () => {
        const validRobotProps: RobotProps = {
          code: 'R123',
          nickname: 'Robot123',
          robotType: 'Robot',
          serialNumber: 12345,
          description: Description.create("Nice description").getValue(),
          status: 'Online',
        };
    
        //Create a instance of robot
        const robot = Robot.create(validRobotProps);
    
        //Verifies if the instance was created successfully
        expect(robot.isSuccess).toBe(true);
    
        //Checks the robot instance
        const robotInstance = robot.getValue();
    
        //Checks if the properties are correct
        expect(robotInstance.code).toBe('R123');
        expect(robotInstance.nickname).toBe('Robot123');
        expect(robotInstance.robotType).toBe('Robot');
        expect(robotInstance.serialNumber).toBe(12345);
      });
    
      it('Should fail when creating a invalid instance of robot', () => {
        const invalidRobotProps: RobotProps = {
          code: '', //Invalid code
          nickname: 'Robot321',
          robotType: 'Drone',
          serialNumber: 123456789123456789123456789123456789123456789, //Invalid serial number
          description: Description.create("Nice description").getValue(),
          status: 'Online',
        };
    
        //Attempts to create a robot instance with invalid properties
        const robot = Robot.create(invalidRobotProps);
    
        //Checks if the instance creation is failed
        expect(robot.isFailure).toBe(true);
      });
})
*/
