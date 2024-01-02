using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mpt.Controllers;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Test
{
    [TestClass]
    public class RolesControllerTest
    {
        private Mock<RoleService> _serviceMock;
        private RolesController _controller;
        private List<RoleDTO> expectedRoles;

        [TestInitialize]
        public void Setup()
        {
            _serviceMock = new Mock<RoleService>();
            _controller = new RolesController(_serviceMock.Object);

            expectedRoles = new List<RoleDTO>
            {
                new RoleDTO(Guid.NewGuid(), "Admin"),
                new RoleDTO(Guid.NewGuid(), "User"),
                new RoleDTO(Guid.NewGuid(), "Guest")
            };
        }

        [TestMethod]
        public async Task Test_GetAll_Roles()
        {
            // Arrange
            _serviceMock.Setup(s => s.GetAllAsync()).ReturnsAsync(expectedRoles);

            // Act
            var result = await _controller.GetAll();

            // Assert
            CollectionAssert.AreEqual(expectedRoles, result.Value);
        }

        [TestMethod]
        public async Task Test_GetRoleById()
        {
            // Arrange
            var roleId = Guid.NewGuid();
            _serviceMock.Setup(s => s.GetByIdAsync(It.IsAny<RoleId>())).ReturnsAsync(expectedRoles[0]);

            // Act
            var result = await _controller.GetGetById(roleId);

            // Assert
            Assert.AreEqual(expectedRoles[0], result.Value);
        }

        [TestMethod]
        public async Task Test_CreateRole()
        {
            // Arrange
            var createRoleDTO = new CreateRoleDTO { Name = "Moderator" };
            var createdRole = new RoleDTO(Guid.NewGuid(), createRoleDTO.Name);
            _serviceMock.Setup(s => s.AddAsync(createRoleDTO)).ReturnsAsync(createdRole);

            // Act
            var result = await _controller.Create(createRoleDTO);

            // Assert
            Assert.IsInstanceOfType(result.Result, typeof(CreatedAtActionResult));
            var createdResult = (CreatedAtActionResult)result.Result;
            Assert.AreEqual("GetGetById", createdResult.ActionName);
            Assert.AreEqual(createdRole.Id, ((RoleDTO)createdResult.Value).Id);
        }

        [TestMethod]
        public async Task Test_UpdateRole()
        {
            // Arrange
            var roleId = Guid.NewGuid();
            var updateRoleDTO = new RoleDTO(roleId, "UpdatedRole");
            _serviceMock.Setup(s => s.UpdateAsync(updateRoleDTO)).ReturnsAsync(updateRoleDTO);

            // Act
            var result = await _controller.Update(roleId, updateRoleDTO);

            // Assert
            Assert.AreEqual(updateRoleDTO, result.Value);
        }

        [TestMethod]
        public async Task Test_HardDeleteRole()
        {
            // Arrange
            var roleId = Guid.NewGuid();
            _serviceMock.Setup(s => s.DeleteAsync(new RoleId(roleId))).ReturnsAsync(expectedRoles[0]);

            // Act
            var result = await _controller.HardDelete(roleId);

            // Assert
            Assert.AreEqual(expectedRoles[0], result.Value);
        }
    }
}
