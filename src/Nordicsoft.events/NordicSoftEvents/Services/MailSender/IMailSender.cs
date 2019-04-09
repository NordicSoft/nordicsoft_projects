using System.Threading.Tasks;

namespace NordicSoftEvents.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
