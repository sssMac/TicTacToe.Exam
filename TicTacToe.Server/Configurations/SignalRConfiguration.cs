using TicTacToe.Server.Hubs;

namespace TicTacToe.Server.Configurations
{
    public static class SignalRConfiguration
    {
        
        public static WebApplication ConfigureSignalR(this WebApplication app)
        {
            app.MapHub<GameHub>("/hub");
            return app;
        }
    }
}
