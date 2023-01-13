using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe.DAL.Models.View
{
    public class GameGroup
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string PlayerStatus { get; set; }
        public string Group { get; set; }
    }
}
