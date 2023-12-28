using System;
using Newtonsoft.Json;
using Mpt.Domain.Roles;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Registers
{
    public class RegisterDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; }

        [JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
        public TasksStatus Status { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public RegisterDTO(Guid id, string email, TasksStatus status, string phoneNumber, string contribuinte)
        {
            this.Id = id;
            this.Email = email;
            this.Status = status;
            this.PhoneNumber = phoneNumber;
            this.Contribuinte = contribuinte;
        }
    }
}
