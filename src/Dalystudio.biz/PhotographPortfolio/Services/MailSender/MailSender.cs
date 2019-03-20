using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using Microsoft.Extensions.Logging;

namespace PhotographPortfolio.Services.MailSender
{
    public class MailSender : IMailSender
    {
        private readonly IAmazonSimpleEmailService _client;
        private readonly ILogger<MailSender> _logger;

        public MailSender(IAmazonSimpleEmailService client, ILogger<MailSender> logger)
        {
            _client = client;
            _logger = logger;
        }

        public async Task<bool> SendEmailAsync(IMail mail)
        {
            try
            {
                    var sendRequest = new SendEmailRequest
                    {
                        Source = mail.SenderAddress,
                        Destination = new Destination
                        {
                            ToAddresses =
                                new List<string> { mail.ReceiverAddress }
                        },
                        Message = new Message
                        {
                            Subject = new Content(mail.Subject),
                            Body = new Body
                            {
                                Html = new Content
                                {
                                    Charset = "UTF-8",
                                    Data = mail.HtmlBody
                                },
                                Text = new Content
                                {
                                    Charset = "UTF-8",
                                    Data = mail.TextBody
                                }
                            }
                        },
                        // If you are not using a configuration set, comment
                        // or remove the following line 
                        //ConfigurationSetName = _options.ConfigSet
                    };
                    try
                    {
                        var response = await _client.SendEmailAsync(sendRequest);
                    }
                    catch (Exception ex)
                    {
                        _logger.Log(LogLevel.Error, ex, "mail send failed");
                        return false;
                    }
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex, "error in mail setting");

                return false;
            }
            return true;
        }
    }
}
