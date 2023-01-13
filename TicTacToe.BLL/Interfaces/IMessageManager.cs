using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.DAL.Models.Entities;

namespace TicTacToe.BLL.Interfaces
{
    public interface IMessageManager
    {
        Task PostMessage(Message message);
    }
}
