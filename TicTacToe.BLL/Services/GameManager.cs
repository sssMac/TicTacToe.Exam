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
        private IUnitOfWork _unitOfWork;
        public GameManager(
            List<GameGroup> groups,
            IUnitOfWork unitOfWork)
        {
            _groups = groups;
            _unitOfWork = unitOfWork;
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

                var gameGroup = new GameGroup
                {
                    Id = Guid.NewGuid(),
                    UserName = hostName,
                    Group = hostName,
                    PlayerStatus = Consts.UserStatus.Player
                };
                return newRoom;
            };

            return room;
        }
        public async Task ChangeRoomStatus(Guid id, string status)
        {
            var room = await _unitOfWork.RoomRepository.GetByID(id);

            room.Status = status;

            await _unitOfWork.Save();
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

            if (group.Where(g => g.PlayerStatus == Consts.UserStatus.Player).Count() == 2)
            {
                gameGroup.PlayerStatus = Consts.UserStatus.Spectator;
            }
            else
            {
                gameGroup.PlayerStatus = Consts.UserStatus.Player;
            }

            return true;
        }

        public Task<string> GetConnectionId(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<GameGroup>> GetGroups(string userName)
        {
            return _groups.Where(u => u.UserName == userName).ToList();
        }

        public Task<string> GetUserId(string connectionId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> RemoveFromGroup(string userName, string groupName)
        {
            _groups.Remove(_groups.FirstOrDefault(u => u.UserName == userName && u.Group == groupName));
            return true;
        }
    }
}
