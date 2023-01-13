using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe.DAL.Models.Entities
{
    public class Room
    {
        public Guid Id { get; set; }
        public int MinRating { get; set; }
        public string HostName { get; set; }
        public string Status { get; set; }
        public long CreateDate { get; set; }
    }
}
