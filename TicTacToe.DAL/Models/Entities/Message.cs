using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe.DAL.Models.Entities
{
    public class Message
    {
        public Guid MessageId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Text { get; set; }
        public long PublishDate { get; set; }

    }
}
