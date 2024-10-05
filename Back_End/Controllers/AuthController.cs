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

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly JwtService _jwtService;

        public AuthController(ApplicationDbContext context, IConfiguration config, JwtService jwtService)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
        }

        // POST: auth/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            // Kiểm tra xem người dùng có tồn tại không
            var user = await _context.Users
                .Include(u => u.Role) // Bao gồm thông tin vai trò
                .FirstOrDefaultAsync(u => u.Username == loginDTO.Username); // Chỉ tìm tên người dùng

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            // Lấy thông tin người dùng cùng với tên vai trò
            var userInfo = new
            {
                user.user_id,
                user.Username,
                user.full_name,
                user.Email,
                user.Phone,
                RoleId = user.Role.role_id,
                RoleName = user.Role.role_name
            };

            return Ok(userInfo);
        }

        // POST: auth/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            // Kiểm tra xem vai trò đã tồn tại chưa
            var roleExists = await _context.Roles.AnyAsync(r => r.role_id == "R1");
            if (!roleExists)
            {
                // Thêm vai trò mặc định nếu chưa tồn tại
                var defaultRole = new Roles
                {
                    role_id = "R1",
                    role_name = "customer" // Đặt tên vai trò là customer
                };
                _context.Roles.Add(defaultRole);
                await _context.SaveChangesAsync();
            }

            var newUserId = Guid.NewGuid().ToString();
            var hashedUserId = BCrypt.Net.BCrypt.HashPassword(newUserId).Substring(0, 50);

            //Kiểm tra xem username có bị trùng lặp không
            var userNameExists = _context.Users.FirstOrDefault(u => u.Username == registerDTO.Username);
            if (userNameExists != null)
            {
                return BadRequest("User name is duplicated!");
            }

            // Tạo người dùng mới
            var newUser = new Users
            {
                user_id = hashedUserId, // Lưu hashed user_id vào cơ sở dữ liệu
                Username = registerDTO.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password), // Hash password
                full_name = registerDTO.fullName,
                Email = registerDTO.email,
                Phone = registerDTO.phone,
                role_id = "R1",
                Balance = 0,
            };

            // Thêm người dùng vào cơ sở dữ liệu
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // Trả về thông tin người dùng mới đã đăng ký
            return Ok(newUser);
        }

        [HttpGet]
        public string GetRandomToken()
        {
            var jwt = new JwtService(_config);
            var token = jwt.GenerateSecurityToken("fake@email.com");
            return token;
        }
    }
}
