using Microsoft.AspNetCore.SignalR;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Intefaces;

namespace TicTacToe.Server.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameManager _gameManager;

        public GameHub(IGameManager gameManager)
        {
            _gameManager = gameManager;
        }

        public override async Task OnConnectedAsync()
        {

        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            
        }

        public async Task MakeMove(int square, string symbol)
        {
            
            await Clients.All.SendAsync("ReceiveJoinUser", true);

        }
    }
}
