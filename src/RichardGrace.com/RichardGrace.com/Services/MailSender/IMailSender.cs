using System.Threading.Tasks;

namespace RichardGrace.com.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
