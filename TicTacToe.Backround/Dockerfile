
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TicTacToe.Backround/TicTacToe.Backround.csproj", "TicTacToe.Backround/"]
COPY ["TicTacToe.BLL/TicTacToe.BLL.csproj", "TicTacToe.BLL/"]
COPY ["TicTacToe.DAL/TicTacToe.DAL.csproj", "TicTacToe.DAL/"]
RUN dotnet restore "TicTacToe.Backround/TicTacToe.Backround.csproj"
COPY . .
WORKDIR "/src/TicTacToe.Backround"
RUN dotnet build "TicTacToe.Backround.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TicTacToe.Backround.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TicTacToe.Backround.dll"]