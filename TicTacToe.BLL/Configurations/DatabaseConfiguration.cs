using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TicTacToe.DAL.Contexts;

namespace TicTacToe.BLL.Configurations
{
    public static class DatabaseConfiguration
    {
        public static IServiceCollection DataBaseRegister(this IServiceCollection services, IConfiguration config)
        {

            services.AddDbContext<ApplicationContext>(options =>
                options.UseNpgsql(config["ConnectionStrings:DefaultConnection"]));

            return services;
        }


    }
}
