using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.DAL.Contexts;
using TicTacToe.DAL.Intefaces;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Repository;

namespace TicTacToe.DAL
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApplicationContext _context;
        private GenericRepository<Message> _messageRepository;
        private GenericRepository<Room> _roomRepository;


        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
        }

        public GenericRepository<Message> MessageRepository
        {
            get
            {
                if (this._messageRepository == null)
                {
                    this._messageRepository = new GenericRepository<Message>(_context);
                }
                return _messageRepository;
            }
        }
        public GenericRepository<Room> RoomRepository
        {
            get
            {
                if (this._roomRepository == null)
                {
                    this._roomRepository = new GenericRepository<Room>(_context);
                }
                return _roomRepository;
            }
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.DisposeAsync();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
