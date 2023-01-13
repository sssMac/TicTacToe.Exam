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

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var user = (await _gameManager.GetOnlineUsers()).FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);

            var groups = await _gameManager.GetGroups(Context.ConnectionId);

            foreach (var group in groups)
            {
                await _gameManager.RemoveFromGroup(user.UserName, group.Group);
            }
        }
        public async Task LeaveRoom(Guid roomId)
        {
            var user = (await _gameManager.GetOnlineUsers()).FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            var group = (await _gameManager.GetGroups(Context.ConnectionId)).FirstOrDefault(g => g.Id == roomId);

            await _gameManager.RemoveFromGroup(user.UserName, group.Group);

        }

        public async Task OnlineStatus(string userName)
        {
            await _gameManager.AddOnlineUser(userName, Context.ConnectionId);

        }
    }
}
