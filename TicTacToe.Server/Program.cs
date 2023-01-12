using TicTacToe.Server.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.DataBaseRegister(builder.Configuration);
builder.Services.ServicesRegister();
builder.Services.SwaggerRegister();
builder.Services.CorsRegister();

var app = builder.Build();

app.SwaggereConfigure();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.CorsConfigure();

app.Run();
