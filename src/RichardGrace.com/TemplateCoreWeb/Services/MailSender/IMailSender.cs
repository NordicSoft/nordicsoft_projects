using System.Threading.Tasks;

namespace WeddingInvitation.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
