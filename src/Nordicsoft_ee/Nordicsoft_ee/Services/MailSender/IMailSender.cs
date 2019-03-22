using System.Threading.Tasks;

namespace Nordicsoft_ee.Web.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
