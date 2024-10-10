using KoiBet.Data;
using KoiBet.DTO.User;
using KoiBet.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.Extensions.Configuration;
using Service.JwtService;
using Service.AuthService;
using Service.Payload;
using Microsoft.AspNetCore.Identity;
using KoiBet.Middleware;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly JwtService _jwtService;
        private readonly IAuthService _authService;

        public AuthController(ApplicationDbContext context, IConfiguration config, JwtService jwtService, IAuthService authService)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
            _authService = authService;
        }

        // POST: auth/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            return await _authService.HandleLogin(loginDTO);
        }

        // POST: auth/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            return await _authService.HandleRegister(registerDTO);
        }

        [HttpGet("Get Token")]
        public async Task<IActionResult> GetRandomToken([FromQuery] PayloadDTO payloadDTO)
        {
            return await _authService.HandleGetToken(payloadDTO);
        }

        [Protected]
        [HttpGet("Check Token")]
        public async Task<IActionResult> CheckToken([FromQuery] string token)
        {
            return await _authService.HandleCheckToken(token);
        }
    }
}
