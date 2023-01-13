using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Intefaces;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Models.View;

namespace TicTacToe.BLL.Services
{
    public class GameManager : IGameManager
    {
        private List<GameGroup> _groups;
        private List<OnlineUser> _onlineUsers;
        private IUnitOfWork _unitOfWork;
        private UserManager<User> _userManager;
        public GameManager(
            IUnitOfWork unitOfWork, 
            UserManager<User> userManager)
        {
            _unitOfWork = unitOfWork;
            _groups = new List<GameGroup>();
            _onlineUsers = new List<OnlineUser>();
            _userManager = userManager;
        }

        public async Task<Room> AddRoom(string hostName, int mingRating)
        {
            var room = (await _unitOfWork.RoomRepository.Get()).Where(r => r.HostName == hostName).FirstOrDefault();
            if (room == null)
            {
                var newRoom = new Room
                {
                    Id = Guid.NewGuid(),
                    MinRating = mingRating,
                    HostName = hostName,
                    Status = Consts.RoomStatus.Open,
                    CreateDate = DateTimeOffset.Now.ToUnixTimeMilliseconds(),
                };
                await _unitOfWork.RoomRepository.Insert(newRoom);
                await _unitOfWork.Save();
                var gameGroup = new GameGroup
                {
                    Id = newRoom.Id,
                    UserName = hostName,
                    Group = hostName,
                    PlayerStatus = Consts.UserStatus.Player
                };

                return newRoom;

            };

            return room;
        }
        public async Task<bool> SetDraw(Guid roomId)
        {
            var room = await _unitOfWork.RoomRepository.GetByID(roomId);

            room.Status = Consts.RoomStatus.Completed;

            await _unitOfWork.Save();

            return true;
        }
        public async Task<bool> AddToGroup(string userName, string groupName)
        {
            var group = _groups.Where(g => g.Group == groupName);
            var gameGroup = new GameGroup
            {
                Id = Guid.NewGuid(),
                UserName = userName,
                Group = groupName,
            };

            gameGroup.PlayerStatus = group.Where(g => g.PlayerStatus == Consts.UserStatus.Player).Count() == 2 ?
                Consts.UserStatus.Spectator : 
                Consts.UserStatus.Player;
            

            return true;
        }
        public async Task SetWinner(string winnerName, Guid roomId)
        {
            var winner = await _userManager.FindByNameAsync(winnerName);

            var loser = await _userManager.FindByNameAsync(
                _groups.FirstOrDefault(g => g.Id == roomId &&
                g.PlayerStatus == Consts.UserStatus.Player &&
                g.UserName != winnerName)?.UserName);

            winner.Rating += 3;
            loser.Rating -= 1;

            var room = await _unitOfWork.RoomRepository.GetByID(roomId);
            room.Status = Consts.RoomStatus.Completed;

            await _unitOfWork.Save();
        }
        public async Task<List<GameGroup>> GetGroups(string connectionId)
        {
            var user = _onlineUsers.FirstOrDefault(u => u.ConnectionId == connectionId);
            return _groups.Where(u => u.UserName == user.UserName).ToList();
        }
        public async Task<bool> RemoveFromGroup(string userName, string groupName)
        {
            _groups.Remove(_groups.FirstOrDefault(u => u.UserName == userName && u.Group == groupName));
            return true;
        }
        public async Task<OnlineUser> AddOnlineUser(string userName, string connectionId)
        {
            var usr = _onlineUsers.Where(usr => usr.UserName == userName).FirstOrDefault();
            if (usr != null)
            {
                _onlineUsers.Remove(usr);
            }

            var newUsr = new OnlineUser
            {
                UserName = userName,
                ConnectionId = connectionId,
            };

            _onlineUsers.Add(newUsr);
            return newUsr;
        }
        public async Task<List<OnlineUser>> GetOnlineUsers()
        {
            return _onlineUsers;
        }
        public async Task<string> GetConnectionId(string userName)
        {
            return _onlineUsers
               .Where(usr => userName == usr.UserName)
               .Select(usr => usr.ConnectionId)
               .FirstOrDefault();
        }


    }
}
