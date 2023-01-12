#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TicTacToe.Server/TicTacToe.Server.csproj", "TicTacToe.Server/"]
COPY ["TicTacToe.BLL/TicTacToe.BLL.csproj", "TicTacToe.BLL/"]
COPY ["TicTacToe.DAL/TicTacToe.DAL.csproj", "TicTacToe.DAL/"]
RUN dotnet restore "TicTacToe.Server/TicTacToe.Server.csproj"
COPY . .
WORKDIR "/src/TicTacToe.Server"
RUN dotnet build "TicTacToe.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TicTacToe.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TicTacToe.Server.dll"]