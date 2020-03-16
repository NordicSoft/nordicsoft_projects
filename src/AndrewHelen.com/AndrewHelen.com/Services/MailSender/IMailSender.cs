using System.Threading.Tasks;

namespace AndrewHelen.com.Services.MailSender
{
    public interface IMailSender
    {
        Task<bool> SendEmailAsync(IMail mail);
    }
}
