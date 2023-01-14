using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe.DAL.Models.View
{
    public class MoveRequest
    {
        public int Square {get;set;}
        public string Symbol {get;set;}
        public string GroupName { get; set; }
    }
}
