using DTO.VNPay;
using KoiBet.Data;
using KoiBet.DTO.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.AuthService;
using Service.JwtService;
using Service.VNPayService;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VNPayController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IVNPayService _vnPayService;

        public VNPayController(IConfiguration config, IVNPayService vnPayService)
        {
            _config = config;
            _vnPayService = vnPayService;
        }

        // POST: auth/login
        [AllowAnonymous]
        [HttpPost("Get-Payment-Url")]
        public async Task<IActionResult> GetVNPayUrl([FromBody] VnPayRequestDTO vnPayRequestDTO)
        {
            return await _vnPayService.HandleCreateVNPayUrl(HttpContext, vnPayRequestDTO);
        }

        [AllowAnonymous]
        [HttpGet("{userId}&{requestUrl}")]
        public async Task<IActionResult> ProcessVNPay(/*[FromQuery] string paymentUrl*/)
        {
            return await _vnPayService.HandleVNPay(Request.Query);
        }
    }
}
