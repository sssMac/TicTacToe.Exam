using TicTacToe.Backround.Consumers;
using TicTacToe.BLL.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.DataBaseRegister(builder.Configuration);

builder.Services.AddHostedService<RabbitConsumer>();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.Run();

