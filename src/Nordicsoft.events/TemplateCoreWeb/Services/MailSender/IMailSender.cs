using System.Threading.Tasks;

namespace Event.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
