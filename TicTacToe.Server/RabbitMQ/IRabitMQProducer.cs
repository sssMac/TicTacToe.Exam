namespace TicTacToe.Server.RabbitMQ
{
    public interface IRabitMQProducer
    {
        public Task SendProductMessage<T>(T message);
    }
}
