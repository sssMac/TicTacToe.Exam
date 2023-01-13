using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Intefaces;
using TicTacToe.DAL.Models.Entities;

namespace TicTacToe.BLL.Services
{
    public class ChatManager : IMessageManager
    {
        private IUnitOfWork _unitOfWork;

        public ChatManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task PostMessage(Message message)
        {
            await _unitOfWork.MessageRepository.Insert(message);
            await _unitOfWork.Save();
        }
    }
}
