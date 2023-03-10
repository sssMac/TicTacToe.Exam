using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Models.View;

namespace TicTacToe.BLL.Interfaces
{
    public interface IGameManager
    {
        Task<List<Room>> GetRooms();
        Task<Room> AddRoom(string hostName, int mingRating);
        Task<bool> SetDraw(Guid roomId);
        Task SetWinner(string winnerName, Guid roomId);
        Task<bool> AddToGroup(string userName, string groupName);
        Task<bool> RemoveFromGroup(string userName, string groupName);
        Task<List<GameGroup>> GetGroups(string userName);
        Task<OnlineUser> AddOnlineUser(string userName, string connectionId);
        Task<List<OnlineUser>> GetOnlineUsers();
        Task<string> GetConnectionId(string userId);


    }
}
