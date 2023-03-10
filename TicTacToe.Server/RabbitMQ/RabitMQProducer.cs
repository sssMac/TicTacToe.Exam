using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace TicTacToe.Server.RabbitMQ
{
    public class RabitMQProducer : IRabitMQProducer
    {
        private readonly IConfiguration _config;

        public RabitMQProducer(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendProductMessage<T>(T message)
        {
            var factory = new ConnectionFactory
            {
                HostName = _config["Rabbit:HostName"],
                Port = Convert.ToInt32(_config["Rabbit:Port"]),

            };
            var connection = factory.CreateConnection();
            using
            var channel = connection.CreateModel();

            channel.ExchangeDeclare(exchange: "exam.fanout",
                                   type: ExchangeType.Fanout);

            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);
            channel.BasicPublish(exchange: "exam.fanout",
                                routingKey: "",
                                body: body);

        }
    }
}
