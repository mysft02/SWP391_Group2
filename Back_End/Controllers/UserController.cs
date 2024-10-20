
using KoiBet.Data;
using KoiBet.DTO.User;
using KoiBet.Entities;
using KoiBet.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;

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
        [Authorize]
        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser([FromQuery] string userId)
        {
            var currentUser = HttpContext.User;
            var currentUserRole = currentUser.FindFirst(ClaimTypes.Role)?.Value;

            // Ki?m tra quy?n truy c?p
            if (currentUserRole != "admin")
            {
                return BadRequest(new { message = "Unauthorized!" });
            }

            return await _userService.HandleGetUser(userId);
        }

        // PUT: user/update-profile
        [Authorize]
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserDTO _updateUserDTO)
        {
            var currentUser = HttpContext.User;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            };
            return await _userService.HandleUpdateByUsername(currentUser, _updateUserDTO);
        }

        // DELETE: user/{id}
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id) || !Guid.TryParse(id, out var userIdGuid))
            {
                return BadRequest(new { message = "Invalid ID format" });
            }

            return await _userService.HandleDeleteByID(id);
        }

        [Authorize]
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            var currentUser = HttpContext.User;
            var currentUserRole = currentUser.FindFirst(ClaimTypes.Role)?.Value;

            // Ki?m tra quy?n truy c?p
            if (currentUserRole != "admin")
            {
                return BadRequest(new { message = "Unauthorized!" });
            }

            return await _userService.HandleGetAllUser();
        }

        [Authorize]
        [HttpGet("UpdateUserRole")]
        public async Task<IActionResult> UpdateUserRole([FromQuery] UpdateUserRoleDTO updateUserRoleDTO)
        {
            var currentUser = HttpContext.User;
            var currentUserRole = currentUser.FindFirst(ClaimTypes.Role)?.Value;

            // Ki?m tra quy?n truy c?p
            if (currentUserRole != "admin")
            {
                return BadRequest(new { message = "Unauthorized!" });
            }

            return await _userService.HandleUpdateUserRole(updateUserRoleDTO);
        }
    }
}
