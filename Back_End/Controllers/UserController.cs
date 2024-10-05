using KoiBet.Data;
using KoiBet.DTO.User;
using KoiBet.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("create")]
        [Authorize(Roles = "admin,staff")] // Chỉ cho phép admin và staff truy cập
        public async Task<IActionResult> CreateUser([FromBody] ManagerDTO _accountDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra xem role_id có hợp lệ không
            var roleExists = await _context.Roles.AnyAsync(r => r.role_id == _accountDTO.role_id);
            if (!roleExists)
            {
                return BadRequest(new { message = "Role does not exist" });
            }

            // Tạo đối tượng người dùng mới
            var newUser = new Users
            {
                user_id = Guid.NewGuid().ToString(), // Tạo ID mới cho người dùng
                full_name = _accountDTO.full_name,
                Email = _accountDTO.email,
                Phone = _accountDTO.phone,
                role_id = _accountDTO.role_id, // Chỉnh sửa role_id từ input
                Balance = 0 // Khởi tạo balance là 0
            };

            // Thêm người dùng vào cơ sở dữ liệu
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", user = newUser });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id) || !Guid.TryParse(id, out var userIdGuid))
            {
                return BadRequest(new { message = "Invalid ID format" });
            }

            // So sánh trực tiếp với user_id kiểu chuỗi
            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userIdGuid.ToString());

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }

        [Authorize]
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserDTO updateUserDTO)
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

            // Tìm kiếm người dùng
            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userId);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Cập nhật thông tin người dùng
            user.full_name = updateUserDTO.full_name ?? user.full_name;
            user.Email = updateUserDTO.email ?? user.Email;
            user.Phone = updateUserDTO.phone ?? user.Phone;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully", user = user });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (string.IsNullOrWhiteSpace(id) || !Guid.TryParse(id, out var userIdGuid))
            {
                return BadRequest(new { message = "Invalid ID format" });
            }

            // Tìm người dùng
            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userIdGuid.ToString());

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Xóa người dùng
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}
