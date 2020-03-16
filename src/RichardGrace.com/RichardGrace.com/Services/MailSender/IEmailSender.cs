using System.Threading.Tasks;

namespace RichardGrace.com.Services.MailSender
{
    public interface IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
