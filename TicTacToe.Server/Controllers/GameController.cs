using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Models.View;
using TicTacToe.Server.Hubs;
using TicTacToe.BLL.Consts;

namespace TicTacToe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameManager _gameManager;
        private readonly IHubContext<GameHub> _hubContext;
        private readonly UserManager<User> _userManager;
        public GameController(IGameManager gameManager, 
            UserManager<User> userManager, 
            IHubContext<GameHub> hubContext)
        {
            _gameManager = gameManager;
            _userManager = userManager;
            _hubContext = hubContext;
        }

        [HttpPost("createroom")]
        public async Task<IActionResult> CreateRoom(string hostName, int minRating)
        {
            var res = await _gameManager.AddRoom(hostName, minRating);
            return Ok(res);
        }

        [HttpPost("makemove")]
        public async Task<IActionResult> MakeMove(int square, string symbol,string groupName)
        {
            var res = new MoveResponse
            {
                Square = square,
                Symbol = symbol
            };
            await _hubContext.Clients.Group(groupName).SendAsync("ReceiveMove", res);

            return Ok(res);
        }

        [HttpPost("setwinner")]
        public async Task<IActionResult> SetWinner(string userName, string groupName, Guid roomId)
        {

            await _gameManager.SetWinner(userName, roomId);
            await _hubContext.Clients.Group(groupName).SendAsync("ReceiveStatus", userName);

            return Ok("Winner winner chiken diner");
        }

        [HttpPost("setdraw")]
        public async Task<IActionResult> SetDraw(Guid roomId, string groupName)
        {
            var res = await _gameManager.SetDraw(roomId);

            await _hubContext.Clients.Group(groupName).SendAsync("ReceiveStatus", roomId);

            return Ok(res);
        }

    }
}
