using System;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Cryptography;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISystemUserRepository _repo;
        private readonly IConfiguration _config;

        public AuthService(IUnitOfWork unitOfWork, ISystemUserRepository repo, IConfiguration config)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._config = config;
        }

        public async Task<SystemUser> Login(string Email, string Password, HttpResponse Response)
        {
        
            SystemUser user = await _repo.Login(Email);

            if (user == null) return null;

            string hashedPassword = HashPassword(user.Password, GenSalt());

            if (CheckPassword(Password, hashedPassword) == false) return null;

            return user;

        }

        public void Logout(HttpRequest request, HttpResponse response)
        {
            if (request.Cookies["token"] != null)
            {
                response.Cookies.Delete("token");
            }

            if (request.Cookies["tokenRefresh"] != null)
            {
                response.Cookies.Delete("tokenRefresh");
            }

        }

        public int ValidateTokenService(string token)
        {
            return ValidateToken(token) switch
            {
                EstadoToken.Valido => 200,
                EstadoToken.Expirado => 406,
                EstadoToken.Invalido => 401,
                _ => 401,
            };
        }



        public string GenerateJwtToken(SystemUser user, string role)
        {
            // generate token that is valid for 7 days
            var secret = _config.GetValue<string>("AppSettings:Secret");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, role)}),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshJwtToken(int UserId)
        {
            var secret = _config.GetValue<string>("AppSettings:Secret");
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.Name, UserId.ToString())}),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private EstadoToken ValidateToken(string token)
        {
            try
            {
                var secret = _config.GetValue<string>("AppSettings:Secret");
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

            }
            catch (Exception e)
            {
                Console.Write(e);
                if (e.Message.Contains("expired"))
                {
                    return EstadoToken.Expirado;
                }

                return EstadoToken.Invalido;

            }
            return EstadoToken.Valido;
        }

        private bool CheckPassword(string password, string passwordHash)
        {
            byte[] hashBytes = Convert.FromBase64String(passwordHash);
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(32); // Using 32 bytes for SHA-256
            // Use a constant-time comparison to mitigate timing attacks
            return ConstantTimeCompare(hashBytes, hash);
        }

        private byte[] GenSalt()
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            
            return salt;
        }

        private string HashPassword(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(32); // Using 32 bytes for SHA-256

            byte[] hashBytes = new byte[48]; // Adjust size for SHA-256
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 32); // Adjust size for SHA-256

            return Convert.ToBase64String(hashBytes);
        }

        private bool ConstantTimeCompare(byte[] a, byte[] b)
        {
            if (a.Length != b.Length)
            {
                return false;
            }
            
            int result = 0;
            for (int i = 0; i < a.Length; i++)
            {
                result |= a[i] ^ b[i];
            }
            
            return result == 0;
        }


        private enum EstadoToken
        {
            Expirado = 0,
            Valido = 1,
            Invalido = 2
        }
    }
}