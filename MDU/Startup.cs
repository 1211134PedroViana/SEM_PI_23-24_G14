using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Mpt.Infrastructure;
using Mpt.Infrastructure.Shared;
using Mpt.Infrastructure.Roles;
using Mpt.Infrastructure.SystemUsers;
using Mpt.Infrastructure.SurveillanceTasks;
using Mpt.Infrastructure.PickupAndDeliveryTasks;
using Mpt.Domain.Shared;
using Mpt.Domain.Roles;
using Mpt.Domain.SystemUsers;
using Mpt.Domain.SurveillanceTasks;
using Mpt.Domain.PickupAndDeliveryTasks;
using Microsoft.EntityFrameworkCore;


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

            app.UseCors("MyPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ISystemUserRepository, SystemUserRepository>();
            services.AddTransient<SystemUserService>();

            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<RoleService>();

            services.AddTransient<ISurveillanceTaskRepository, SurveillanceTaskRepository>();
            services.AddTransient<SurveillanceTaskService>();

            services.AddTransient<IPickupAndDeliveryTaskRepository, PickupAndDeliveryTaskRepository>();
            services.AddTransient<PickupAndDeliveryTaskService>();
        }
    }
}