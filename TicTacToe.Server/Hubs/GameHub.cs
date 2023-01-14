using Microsoft.AspNetCore.SignalR;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Intefaces;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Models.View;

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
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, group.Group);
                await _gameManager.RemoveFromGroup(user.UserName, group.Group);
            }
        }
        public async Task LeaveRoom(Guid roomId)
        {
            var user = (await _gameManager.GetOnlineUsers()).FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            var group = (await _gameManager.GetGroups(Context.ConnectionId)).FirstOrDefault(g => g.Id == roomId);

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, group.Group);
            await _gameManager.RemoveFromGroup(user.UserName, group.Group);

        }

        public async Task OnlineStatus(string userName)
        {
            await _gameManager.AddOnlineUser(userName, Context.ConnectionId);

        }

        public async Task JoinGroup(string userName, string host)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, host);
            await _gameManager.AddToGroup(userName, host);

        }

        public async Task MakeMove(int square, string symbol, string groupName)
        {
            
            var res = new MoveResponse
            {
                Square = square,
                Symbol = symbol
            };
            await Clients.Group(groupName).SendAsync("ReceiveMove", res);

        }

        public async Task GetStatus(string groupName, string player)
        {
            var group = (await _gameManager.GetGroups(player)).First(g => g.Group == groupName);
            await Clients.Caller.SendAsync("ReceivePlayerStatus", group.PlayerStatus);
        }

        public async Task SendMessage(string message, string host)
        {
            var mess = new Message
            {
                MessageId = Guid.NewGuid(),
                From = "SERVER",
                To = "koyash",
                Text = message,
                PublishDate = DateTimeOffset.Now.ToUnixTimeMilliseconds()
            };
            await Clients.Group(host).SendAsync("ReceiveGroupMessage", mess);
        }
    }
}