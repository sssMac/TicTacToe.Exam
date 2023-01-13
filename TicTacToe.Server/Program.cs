using TicTacToe.BLL.Configurations;
using TicTacToe.Server.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.DataBaseRegister(builder.Configuration);
builder.Services.ServicesRegister();
builder.Services.SwaggerRegister();
builder.Services.CorsRegister();

var app = builder.Build();

app.SwaggereConfigure();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.ConfigureSignalR();
app.CorsConfigure();

app.Run();
