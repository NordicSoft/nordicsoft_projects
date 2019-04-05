using System.Threading.Tasks;

namespace Dalystudio.biz.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
