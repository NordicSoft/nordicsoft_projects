using System.Threading.Tasks;

namespace AndrewHelen.com.Services.GoogleRecaptcha
{
    public interface IGoogleRecaptcha
    {
        Task<bool> IsCaptchaValid(string encodedResponse, string action);
    }
}
