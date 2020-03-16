using System.Threading.Tasks;

namespace RichardGrace.com.Services.GoogleRecaptcha
{
    public interface IGoogleRecaptcha
    {
        Task<bool> IsCaptchaValid(string encodedResponse, string action);
    }
}
