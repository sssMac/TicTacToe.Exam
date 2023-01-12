namespace TicTacToe.Server.Configurations
{
    public static class CorsConfiguration
    {
        public static IServiceCollection CorsRegister(this IServiceCollection services)
        {
            services.AddCors();

            return services;
        }
        public static WebApplication CorsConfigure(this WebApplication app)
        {
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials());


            return app;
        }
    }
}
