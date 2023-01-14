using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.BLL.Interfaces;
using TicTacToe.DAL.Models.Entities;
using TicTacToe.DAL.Models.View;
using TicTacToe.Server.Hubs;
using TicTacToe.BLL.Consts;
using TicTacToe.Server.RabbitMQ;

namespace TicTacToe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameManager _gameManager;
        private readonly IHubContext<GameHub> _hubContext;
        private readonly UserManager<User> _userManager;
        private readonly IRabitMQProducer _rabbit;
        public GameController(IGameManager gameManager,
            UserManager<User> userManager,
            IHubContext<GameHub> hubContext,
            IRabitMQProducer rabbit)
        {
            _gameManager = gameManager;
            _userManager = userManager;
            _hubContext = hubContext;
            _rabbit = rabbit;
        }

        [HttpGet("rating")]
        public async Task<IActionResult> GetRating(string userName)
        {
            var res = (await _userManager.FindByNameAsync(userName)).Rating;
            return Ok(res);
        }

        [HttpGet("rooms")]
        public async Task<IActionResult> GetRooms()
        {
            var res = await _gameManager.GetRooms();
            return Ok(res);
        }

        [HttpPost("createroom")]
        public async Task<IActionResult> CreateRoom([FromForm]CreateRoom createRoom)
        {
            var res = await _gameManager.AddRoom(createRoom.HostName, createRoom.MinRating);
            return Ok(res);
        }

        [HttpPost("makemove")]
        public async Task<IActionResult> MakeMove([FromForm] MoveRequest model)
        {
            var res = new MoveResponse
            {
                Square = model.Square,
                Symbol = model.Symbol
            };
            await _hubContext.Clients.Group(model.GroupName).SendAsync("ReceiveMove", res);

            return Ok(res);
        }

        [HttpPost("setwinner")]
        public async Task<IActionResult> SetWinner([FromForm]SetWinner model)
        {

            await _gameManager.SetWinner(model.UserName, model.RoomId);
            await _hubContext.Clients.Group(model.GroupName).SendAsync("ReceiveStatus", model.UserName);

            return Ok("Winner winner chiken diner");
        }

        [HttpPost("setdraw")]
        public async Task<IActionResult> SetDraw([FromForm] SetDraw model)
        {
            var res = await _gameManager.SetDraw(model.RoomId);

            await _hubContext.Clients.Group(model.GroupName).SendAsync("ReceiveStatus", model.RoomId);

            return Ok(res);
        }

        [HttpPost("postmessage")]
        public async Task<IActionResult> PostMessage([FromForm] PostMessage postMessage)
        {
            var message = new Message
            {
                MessageId = Guid.NewGuid(),
                From = postMessage.From,
                To = "koyash",
                Text = postMessage.Message,
                PublishDate = DateTimeOffset.Now.ToUnixTimeMilliseconds()
            };
            await _rabbit.SendProductMessage(message);
            await _hubContext.Clients.Group(postMessage.Host).SendAsync("ReceiveGroupMessage", message);

            return Ok("Message send!");
        }

    }
}
