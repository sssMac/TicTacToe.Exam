using Microsoft.EntityFrameworkCore;
using TicTacToe.BLL.Interfaces;
using TicTacToe.BLL.Services;
using TicTacToe.DAL;
using TicTacToe.DAL.Contexts;
using TicTacToe.DAL.Intefaces;
using TicTacToe.Server.RabbitMQ;

namespace TicTacToe.Server.Configurations
{
    public static class ServicesConfiguration
    {
        public static IServiceCollection ServicesRegister(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddAntiforgery(o => o.HeaderName = "X-XSRF-TOKEN");
            services.AddSignalR();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRabitMQProducer, RabitMQProducer>();
            services.AddScoped<IGameManager, GameManager>();
            services.AddScoped<JwtService>();

            return services;
        }
        public static WebApplication MigrateDatabase(this WebApplication webApp)
        {
            using (var scope = webApp.Services.CreateScope())
            {
                using (var appContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>())
                {
                    try
                    {
                        appContext.Database.Migrate();
                    }
                    catch (Exception ex)
                    {
                        //Log errors or do anything you think it's needed
                        throw;
                    }
                }
            }
            return webApp;
        }

    }
}
