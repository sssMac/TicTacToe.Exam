using Microsoft.AspNetCore.SignalR;

namespace TicTacToe.Server.Hubs
{
    public class GameHub : Hub
    {
        public override async Task OnConnectedAsync()
        {

        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            
        }
    }
}
