using Microsoft.AspNetCore.Identity;

namespace TicTacToe.DAL.Models.Entities
{
    public class User : IdentityUser
    {
        public double Rating { get; set; }
        
    }
}
