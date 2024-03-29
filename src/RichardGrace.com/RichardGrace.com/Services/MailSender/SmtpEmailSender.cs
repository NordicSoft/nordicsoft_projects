﻿using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using RichardGrace.com.Services.MailSender;

namespace RichardGrace.com.EmailSenders
{
    public class SmtpEmailSender : IEmailSender
    {

        private readonly ILogger<SmtpEmailSender> _logger;

        // Our private configuration variables
        private readonly string host;
        private readonly int port;
        private readonly bool enableSSL;
        private readonly string userName;
        private readonly string password;

        // Get our parameterized configuration
        public SmtpEmailSender(ILogger<SmtpEmailSender> logger)
        {
            this.host = Settings.EmailSender.Host;
            this.port = Settings.EmailSender.Port;
            this.enableSSL = Settings.EmailSender.EnableSSL;
            this.userName = Settings.EmailSender.UserName;
            this.password = Settings.EmailSender.Password;
            _logger = logger;
        }

        // Use our configuration to send the email by using SmtpClient
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(userName, password),
                EnableSsl = enableSSL
            };
            return client.SendMailAsync(new MailMessage(userName, email, subject, htmlMessage) { IsBodyHtml = true });
        }

    }
}