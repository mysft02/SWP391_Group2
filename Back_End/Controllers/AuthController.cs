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

        //[HttpGet]
        //public string GetRandomToken()
        //{
        //    var jwt = new JwtService(_config);
        //    var token = jwt.GenerateSecurityToken("fake@email.com");
        //    return token;
        //}
    }
}
