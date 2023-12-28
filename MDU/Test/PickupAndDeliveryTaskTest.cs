using System;
using System.Threading.Tasks;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Test;

[TestClass]
public class PickupAndDeliveryTaskTest
{
    
    
    // Create a new PickupAndDeliveryTask with valid data
[TestMethod]
public void create_new_task_with_valid_data()
{
    // Arrange
    string pickupPlace = "Pickup Place";
    string deliveryPlace = "Delivery Place";
    string pickupPersonName = "John Doe";
    string pickupPersonPhoneNumber = "1234567890";
    string deliveryPersonName = "Jane Smith";
    string deliveryPersonPhoneNumber = "0987654321";
    string description = "Task description";
    string confirmationCode = "ABC123";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act
    PickupAndDeliveryTask task = new PickupAndDeliveryTask(pickupPlace, deliveryPlace, pickupPersonName, pickupPersonPhoneNumber, deliveryPersonName, deliveryPersonPhoneNumber, description, confirmationCode, userId);

    // Assert
    Assert.IsNotNull(task);
    Assert.AreEqual(pickupPlace, task.PickupPlace);
    Assert.AreEqual(deliveryPlace, task.DeliveryPlace);
    Assert.AreEqual(pickupPersonName, task.PickupPersonName);
    Assert.AreEqual(pickupPersonPhoneNumber, task.PickupPersonPhoneNumber);
    Assert.AreEqual(deliveryPersonName, task.DeliveryPersonName);
    Assert.AreEqual(deliveryPersonPhoneNumber, task.DeliveryPersonPhoneNumber);
    Assert.AreEqual(description, task.Description);
    Assert.AreEqual(confirmationCode, task.ConfirmationCode);
    Assert.AreEqual(TasksStatus.Pending, task.Status);
    Assert.AreEqual(userId, task.UserId);
}

    // Verify that the PickupAndDeliveryTask was created with the correct data
[TestMethod]
public void verify_task_created_with_correct_data()
{
    // Arrange
    string pickupPlace = "Pickup Place";
    string deliveryPlace = "Delivery Place";
    string pickupPersonName = "John Doe";
    string pickupPersonPhoneNumber = "1234567890";
    string deliveryPersonName = "Jane Smith";
    string deliveryPersonPhoneNumber = "0987654321";
    string description = "Task description";
    string confirmationCode = "ABC123";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act
    PickupAndDeliveryTask task = new PickupAndDeliveryTask(pickupPlace, deliveryPlace, pickupPersonName, pickupPersonPhoneNumber, deliveryPersonName, deliveryPersonPhoneNumber, description, confirmationCode, userId);

    // Assert
    Assert.IsNotNull(task);
    Assert.AreEqual(pickupPlace, task.PickupPlace);
    Assert.AreEqual(deliveryPlace, task.DeliveryPlace);
    Assert.AreEqual(pickupPersonName, task.PickupPersonName);
    Assert.AreEqual(pickupPersonPhoneNumber, task.PickupPersonPhoneNumber);
    Assert.AreEqual(deliveryPersonName, task.DeliveryPersonName);
    Assert.AreEqual(deliveryPersonPhoneNumber, task.DeliveryPersonPhoneNumber);
    Assert.AreEqual(description, task.Description);
    Assert.AreEqual(confirmationCode, task.ConfirmationCode);
    Assert.AreEqual(TasksStatus.Pending, task.Status);
    Assert.AreEqual(userId, task.UserId);
}

    // Update the PickupAndDeliveryTask with valid data
[TestMethod]
public void update_task_with_valid_data()
{
    // Arrange
    string pickupPlace = "Pickup Place";
    string deliveryPlace = "Delivery Place";
    string pickupPersonName = "John Doe";
    string pickupPersonPhoneNumber = "1234567890";
    string deliveryPersonName = "Jane Smith";
    string deliveryPersonPhoneNumber = "0987654321";
    string description = "Task description";
    string confirmationCode = "ABC123";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());
    PickupAndDeliveryTask task = new PickupAndDeliveryTask(pickupPlace, deliveryPlace, pickupPersonName, pickupPersonPhoneNumber, deliveryPersonName, deliveryPersonPhoneNumber, description, confirmationCode, userId);

    // Act
    string newPickupPlace = "New Pickup Place";
    string newDeliveryPlace = "New Delivery Place";
    string newPickupPersonName = "New John Doe";
    string newPickupPersonPhoneNumber = "9876543210";
    string newDeliveryPersonName = "New Jane Smith";
    string newDeliveryPersonPhoneNumber = "0123456789";
    string newDescription = "New Task description";
    string newConfirmationCode = "XYZ789";
    SystemUserId newUserId = new SystemUserId(Guid.NewGuid());

    task.PickupPlace = newPickupPlace;
    task.DeliveryPlace = newDeliveryPlace;
    task.PickupPersonName = newPickupPersonName;
    task.PickupPersonPhoneNumber = newPickupPersonPhoneNumber;
    task.DeliveryPersonName = newDeliveryPersonName;
    task.DeliveryPersonPhoneNumber = newDeliveryPersonPhoneNumber;
    task.Description = newDescription;
    task.ConfirmationCode = newConfirmationCode;
    task.UserId = newUserId;

    // Assert
    Assert.AreEqual(newPickupPlace, task.PickupPlace);
    Assert.AreEqual(newDeliveryPlace, task.DeliveryPlace);
    Assert.AreEqual(newPickupPersonName, task.PickupPersonName);
    Assert.AreEqual(newPickupPersonPhoneNumber, task.PickupPersonPhoneNumber);
    Assert.AreEqual(newDeliveryPersonName, task.DeliveryPersonName);
    Assert.AreEqual(newDeliveryPersonPhoneNumber, task.DeliveryPersonPhoneNumber);
    Assert.AreEqual(newDescription, task.Description);
    Assert.AreEqual(newConfirmationCode, task.ConfirmationCode);
    Assert.AreEqual(newUserId, task.UserId);
}

    // Create a new PickupAndDeliveryTask with empty pickupPlace
[TestMethod]
[ExpectedException(typeof(BusinessRuleValidationException))]
public void create_new_task_with_empty_pickup_place()
{
    // Arrange
    string pickupPlace = "";
    string deliveryPlace = "Delivery Place";
    string pickupPersonName = "John Doe";
    string pickupPersonPhoneNumber = "1234567890";
    string deliveryPersonName = "Jane Smith";
    string deliveryPersonPhoneNumber = "0987654321";
    string description = "Task description";
    string confirmationCode = "ABC123";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act
    PickupAndDeliveryTask task = new PickupAndDeliveryTask(pickupPlace, deliveryPlace, pickupPersonName, pickupPersonPhoneNumber, deliveryPersonName, deliveryPersonPhoneNumber, description, confirmationCode, userId);

    // Assert
    // Exception is expected to be thrown
}

    // Create a new PickupAndDeliveryTask with empty deliveryPlace
[TestMethod]
[ExpectedException(typeof(BusinessRuleValidationException))]
public void create_new_task_with_empty_delivery_place()
{
    // Arrange
    string pickupPlace = "Pickup Place";
    string deliveryPlace = "";
    string pickupPersonName = "John Doe";
    string pickupPersonPhoneNumber = "1234567890";
    string deliveryPersonName = "Jane Smith";
    string deliveryPersonPhoneNumber = "0987654321";
    string description = "Task description";
    string confirmationCode = "ABC123";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act
    PickupAndDeliveryTask task = new PickupAndDeliveryTask(pickupPlace, deliveryPlace, pickupPersonName, pickupPersonPhoneNumber, deliveryPersonName, deliveryPersonPhoneNumber, description, confirmationCode, userId);

    // Assert
    // Exception is expected to be thrown
}

    // Create a new PickupAndDeliveryTask with empty pickupPersonName
[TestMethod]
[ExpectedException(typeof(BusinessRuleValidationException))]
public void create_new_task_with_empty_pickup_person_name()
{
    // Arrange
    string pickupPlace = "Pickup Place";
    string deliveryPlace = "Delivery Place";
    string pickupPersonName = "";
    string pickupPersonPhoneNumber = "1234567890";
    string deliveryPersonName = "Jane Smith";
    string deliveryPersonPhoneNumber = "0987654321";
    string description = "Task description";
    string confirmationCode = "ABC123";
    SystemUserId userId = new SystemUserId(Guid.NewGuid());

    // Act
    PickupAndDeliveryTask task = new PickupAndDeliveryTask(pickupPlace, deliveryPlace, pickupPersonName, pickupPersonPhoneNumber, deliveryPersonName, deliveryPersonPhoneNumber, description, confirmationCode, userId);

    // Assert
    // Exception is expected to be thrown
}


}