using KoiBet.Data;
using KoiBet.DTO.User;
using KoiBet.Entities;
using KoiBet.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserDTO _updateUserDTO)
        {
            var userName = User.FindFirst("Username")?.Value;

            if (userName == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            };
            return await _userService.HandleUpdateByUsername(userName, _updateUserDTO);
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
