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
        Task<Room> AddRoom(string hostName, int mingRating);
        Task<string> GetConnectionId(string userId);
        Task<string> GetUserId(string connectionId);
        Task<bool> AddToGroup(string userName, string groupName);
        Task<bool> RemoveFromGroup(string userName, string groupName);
        Task<List<GameGroup>> GetGroups(string userName);
    }
}
