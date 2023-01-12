namespace TicTacToe.Server.RabbitMQ
{
    public interface IRabitMQProducer
    {
        public void SendProductMessage<T>(T message);
    }
}
