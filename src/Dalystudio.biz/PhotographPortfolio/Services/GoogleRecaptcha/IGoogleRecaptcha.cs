using System.Threading.Tasks;

namespace PhotographPortfolio.Services.GoogleRecaptcha
{
    public interface IGoogleRecaptcha
    {
        Task<bool> IsCaptchaValid(string encodedResponse, string action);
    }
}
