using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe.DAL.Models.View
{
    public class SetWinner
    {
       public string UserName {get;set;}
       public string GroupName {get;set;}
       public Guid RoomId { get; set; }
    }
}
