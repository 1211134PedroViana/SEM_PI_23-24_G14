using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore;
using Mpt.Infrastructure;
using Mpt.Infrastructure.Shared;
using Mpt.Infrastructure.Roles;
using Mpt.Infrastructure.SystemUsers;
using Mpt.Infrastructure.SurveillanceTasks;
using Mpt.Infrastructure.PickupAndDeliveryTasks;
using Mpt.Infrastructure.Registers;
using Mpt.Domain.Shared;
using Mpt.Domain.Roles;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.PickupAndDeliveryTasks;
using Mpt.Domain.Authentication;
using Mpt.Domain.Registers;
using System.Text;


namespace Mpt
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            // Load environment variables from .env file
            DotNetEnv.Env.Load();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<MptDbContext>(opt => opt.UseSqlServer(connectionString)
                  .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);

            services.AddControllers().AddNewtonsoftJson();

            var secret = Configuration.GetValue<string>("AppSettings:Secret");
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization(); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Enable CORS
            app.UseCors(
                builder => builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseMiddleware<JwtMiddleware>();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<AuthService>();

            services.AddTransient<ISystemUserRepository, SystemUserRepository>();
            services.AddTransient<SystemUserService>();

            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<RoleService>();

            services.AddTransient<ISurveillanceTaskRepository, SurveillanceTaskRepository>();
            services.AddTransient<SurveillanceTaskService>();

            services.AddTransient<IPickupAndDeliveryTaskRepository, PickupAndDeliveryTaskRepository>();
            services.AddTransient<PickupAndDeliveryTaskService>();

            services.AddTransient<IRegisterRepository, RegisterRepository>();
            services.AddTransient<RegisterService>();
        }
    }
}