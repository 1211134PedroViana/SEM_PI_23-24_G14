namespace DDDSample1.Domain.SystemUsers
{
    public class CreateSystemUserDTO
    {
        public string? Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int PhoneNumber { get; set; }
        public int Contribuinte { get; set; }
        
        public CreateSystemUserDTO(string id, string email, string password, string role, int phoneNumber, int contribuinte)
        {
            Id = id;
            Email = email;
            Password = password;
            Role = role;
            PhoneNumber = phoneNumber;
            Contribuinte = contribuinte;
        }
    }
}
