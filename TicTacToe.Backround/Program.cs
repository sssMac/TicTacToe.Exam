using TicTacToe.Backround.Consumers;
using TicTacToe.BLL.Configurations;
using TicTacToe.BLL.Interfaces;
using TicTacToe.BLL.Services;
using TicTacToe.DAL;
using TicTacToe.DAL.Intefaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.DataBaseRegister(builder.Configuration);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IMessageManager, ChatManager>();

builder.Services.AddHostedService<RabbitConsumer>();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.Run();

