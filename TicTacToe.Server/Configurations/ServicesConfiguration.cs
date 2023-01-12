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

            services.AddScoped<IRabitMQProducer, RabitMQProducer>();
            
            return services;
        }


    }
}
