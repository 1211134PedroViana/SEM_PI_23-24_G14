/*
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mpt.Controllers;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Test
{
    [TestClass]
    public class PickupAndDeliveryTasksControllerTest
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IPickupAndDeliveryTaskRepository> _repoMock;
        private Mock<ISystemUserRepository> _userRepoMock;
        private Mock<IPickupAndDeliveryTaskService> _taskServiceMock;
        private PickupAndDeliveryTasksController _taskController;
        private List<PickupAndDeliveryTaskDTO> expectedTasks;

        [TestInitialize]
        public void Setup()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _userRepoMock = new Mock<ISystemUserRepository>();
            _repoMock = new Mock<IPickupAndDeliveryTaskRepository>();
            _taskServiceMock = new Mock<IPickupAndDeliveryTaskService>();
            _taskController = new PickupAndDeliveryTasksController(_taskServiceMock.Object);

            expectedTasks = new List<PickupAndDeliveryTaskDTO> {
                new PickupAndDeliveryTaskDTO(Guid.NewGuid(), "Code1", "Pickup1", "Delivery1", "Person1", "123456789", "Person2", "987654321", "Description1", "ConfirmationCode1", TasksStatus.Pending, new SystemUserId(Guid.NewGuid())),
            };
        }

        [TestMethod]
        public async Task Test_Get_All_Pickup_And_Delivery_Tasks()
        {
            _taskServiceMock.Setup(s => s.GetAllAsync()).ReturnsAsync(expectedTasks);

            // Act
            var result = await _taskController.GetAll();

            // Assert
            Assert.AreEqual(expectedTasks, result.Value);
        }


        [TestMethod]
        public async Task Test_Get_Task_By_Invalid_Id()
        {
            var invalidId = Guid.NewGuid();

            PickupAndDeliveryTaskDTO expectedTask = null;

            _taskServiceMock.Setup(s => s.GetByIdAsync(It.IsAny<PickupAndDeliveryTaskId>())).ReturnsAsync(expectedTask);

            // Act
            var result = await _taskController.GetGetById(invalidId);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

    }
}
*/
