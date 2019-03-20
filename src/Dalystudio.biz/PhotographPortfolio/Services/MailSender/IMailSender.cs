using System.Threading.Tasks;

namespace PhotographPortfolio.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
