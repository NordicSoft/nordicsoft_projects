using System.Threading.Tasks;

namespace Nordicsoft_ee.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
