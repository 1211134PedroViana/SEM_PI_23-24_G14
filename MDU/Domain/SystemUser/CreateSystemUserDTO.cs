namespace DDDSample1.Domain.SystemUsers
{
    public class SystemUserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Contribuinte { get; set; }

        public static SystemUserDto FromDomain(SystemUser user)
        {
            return new SystemUserDto
            {
                Id = user.Id.ToString(),
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                PhoneNumber = user.PhoneNumber,
                Contribuinte = user.Contribuinte
            };
        }
    }
}
