using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace TicTacToe.Backround.Consumers
{
    public class RabbitConsumer : BackgroundService
    {
        private ConnectionFactory _factory;
        private readonly IConfiguration _config;
        private IConnection _connection;
        private IModel _channel;
        private string? _queueName;
        public RabbitConsumer(IConfiguration config)
        {
            _config = config;
            _factory = new ConnectionFactory() { 
                HostName = _config["Rabbit:HostName"] ,
                Port = Convert.ToInt32(_config["Rabbit:Port"]),
            };
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "exam.fanout", type: ExchangeType.Fanout);
            _queueName = "exam";
            _channel.QueueDeclare(
                queue: _queueName,
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);
            _channel.QueueBind(queue: _queueName,
                                      exchange: "exam.fanout",
                                      routingKey: string.Empty);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Console.WriteLine("==== Consumer start ====");
            if (stoppingToken.IsCancellationRequested)
            {
                _channel.Dispose();
                _connection.Dispose();
                return Task.CompletedTask;
            }

            var consumer = new EventingBasicConsumer(_channel);
           
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);
                Task.Run(() =>
                {
                    // CRUD
                });
            };

            _channel.BasicConsume(queue: "exam", autoAck: true, consumer: consumer);

            return Task.CompletedTask;
        }
    }
}

