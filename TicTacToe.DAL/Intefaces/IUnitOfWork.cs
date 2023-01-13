using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Repository;

namespace TicTacToe.DAL.Intefaces
{
    public interface IUnitOfWork
    {
        public GenericRepository<Message> MessageRepository { get; }
        public GenericRepository<Room> RoomRepository { get; }

        public Task Save();
        public void Dispose();
    }
}
