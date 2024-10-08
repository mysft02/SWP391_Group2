using KoiBet.Data;
using KoiBet.DTO.User;
using KoiBet.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.UserService;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;

        public UserController(ApplicationDbContext context, IConfiguration config, IUserService userService)
        {
            _context = context;
            _config = config;
            _userService = userService;
        }

        // POST: user/create
        [Authorize(Roles = "admin,staff")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] ManagerDTO accountDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return await _userService.HandleCreate(accountDTO);
        }

        // GET: user/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id) || !Guid.TryParse(id, out var userIdGuid))
            {
                return BadRequest(new { message = "Invalid ID format" });
            }

            return await _userService.HandleGetUser(id, null);
        }

        // PUT: user/update-profile
        [Authorize]
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] ManagerDTO updateUserDTO)
        {
            var userId = User.FindFirst("user_id")?.Value;

            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            updateUserDTO.user_id = userId; // Thêm user_id vào DTO
            return await _userService.HandleUpdate(updateUserDTO);
        }

        // DELETE: user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id) || !Guid.TryParse(id, out var userIdGuid))
            {
                return BadRequest(new { message = "Invalid ID format" });
            }

            return await _userService.HandleDeleteByID(id);
        }
    }
}
