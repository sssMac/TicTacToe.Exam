using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Models.View;
using TicTacToe.Server.Hubs;

namespace TicTacToe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameManager _gameManager;
        private readonly IHubContext<GameHub> _hubContext;
        public GameController(IGameManager gameManager)
        {
            _gameManager = gameManager;
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

        [HttpPost("roomstatus")]
        public async Task<IActionResult> ChangeRoomStatus(Guid roomId, string status)
        {

            return Ok();
        }
    }
}
