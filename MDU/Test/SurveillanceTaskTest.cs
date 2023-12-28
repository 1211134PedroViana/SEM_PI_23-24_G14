using System;
using System.Threading.Tasks;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Test;

[TestClass]
public class SurveillanceTaskTest
{
    
    // Create a new SurveillanceTask with valid parameters
[TestMethod]
public void CreateNewSurveillanceTaskWithValidParameters()
{
    // Arrange
    string buildingId = "123";
    string floorId = "1";
    string startPlace = "Entrance";
    string endPlace = "Exit";
    string phoneNumber = "1234567890";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act
    SurveillanceTask surveillanceTask = new SurveillanceTask(buildingId, floorId, startPlace, endPlace, phoneNumber, userId);

    // Assert
    Assert.IsNotNull(surveillanceTask);
    Assert.AreEqual(buildingId, surveillanceTask.BuildingId);
    Assert.AreEqual(floorId, surveillanceTask.FloorId);
    Assert.AreEqual(startPlace, surveillanceTask.StartPlace);
    Assert.AreEqual(endPlace, surveillanceTask.EndPlace);
    Assert.AreEqual(phoneNumber, surveillanceTask.PhoneNumber);
    Assert.AreEqual(TasksStatus.Pending, surveillanceTask.Status);
    Assert.AreEqual(userId, surveillanceTask.UserId);
}

    // Get the BuildingId of an existing SurveillanceTask
[TestMethod]
public void GetBuildingIdOfExistingSurveillanceTask()
{
    // Arrange
    string buildingId = "123";
    string floorId = "1";
    string startPlace = "Entrance";
    string endPlace = "Exit";
    string phoneNumber = "1234567890";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());
    SurveillanceTask surveillanceTask = new SurveillanceTask(buildingId, floorId, startPlace, endPlace, phoneNumber, userId);

    // Act
    string result = surveillanceTask.BuildingId;

    // Assert
    Assert.AreEqual(buildingId, result);
}

    // Get the UserId of an existing SurveillanceTask
[TestMethod]
public void GetUserIdOfExistingSurveillanceTask()
{
    // Arrange
    string buildingId = "123";
    string floorId = "1";
    string startPlace = "Entrance";
    string endPlace = "Exit";
    string phoneNumber = "1234567890";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());
    SurveillanceTask surveillanceTask = new SurveillanceTask(buildingId, floorId, startPlace, endPlace, phoneNumber, userId);

    // Act
    SystemUserId result = surveillanceTask.UserId;

    // Assert
    Assert.AreEqual(userId, result);
}

    // Create a new SurveillanceTask with empty BuildingId
[TestMethod]
public void CreateNewSurveillanceTaskWithEmptyBuildingId()
{
    // Arrange
    string buildingId = "";
    string floorId = "1";
    string startPlace = "Entrance";
    string endPlace = "Exit";
    string phoneNumber = "1234567890";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act and Assert
    Assert.ThrowsException<BusinessRuleValidationException>(() => new SurveillanceTask(buildingId, floorId, startPlace, endPlace, phoneNumber, userId));
}

    // Create a new SurveillanceTask with empty StartPlace
[TestMethod]
public void CreateNewSurveillanceTaskWithEmptyStartPlace()
{
    // Arrange
    string buildingId = "123";
    string floorId = "1";
    string startPlace = "";
    string endPlace = "Exit";
    string phoneNumber = "1234567890";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act and Assert
    Assert.ThrowsException<BusinessRuleValidationException>(() => new SurveillanceTask(buildingId, floorId, startPlace, endPlace, phoneNumber, userId));
}

    // Create a new SurveillanceTask with empty EndPlace
[TestMethod]
public void CreateNewSurveillanceTaskWithEmptyEndPlace()
{
    // Arrange
    string buildingId = "123";
    string floorId = "1";
    string startPlace = "Entrance";
    string endPlace = "";
    string phoneNumber = "1234567890";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act and Assert
    Assert.ThrowsException<BusinessRuleValidationException>(() => new SurveillanceTask(buildingId, floorId, startPlace, endPlace, phoneNumber, userId));
}

}