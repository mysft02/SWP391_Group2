using KoiBet.Data;
using KoiBet.DTO.User;
using KoiBet.Entities;
<<<<<<< Updated upstream
=======
using Microsoft.AspNetCore.Authorization;
>>>>>>> Stashed changes
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;

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
<<<<<<< Updated upstream
        public async Task<IActionResult> CreateUser([FromBody] UpdateUserDTO _userDTO)
=======
        // Function for admin/staff
        [Authorize(Roles = "admin,staff")] // Chỉ cho phép admin và staff truy cập
        public async Task<IActionResult> CreateUser([FromBody] ManagerDTO _accountDTO)
>>>>>>> Stashed changes
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

<<<<<<< Updated upstream
            var newUser = new Users
            {
                user_id = Guid.NewGuid().ToString(),
                full_name = _userDTO.full_name,
                Email = _userDTO.email,
                Phone = _userDTO.phone,
                role_id = _userDTO.role_id,
                Balance = 0
            };

=======
            // Kiểm tra xem role_id có hợp lệ không
            var roleExists = await _context.Roles.AnyAsync(r => r.role_id == _accountDTO.role_id);
            if (!roleExists)
            {
                return BadRequest(new { message = "Role does not exist" });
            }

            // Tạo đối tượng người dùng mới
            var newUser = new Users
            {
                user_id = _accountDTO.user_id, // Nếu có quy tắc nào cho user_id, bạn nên tạo id mới tại đây
                full_name = _accountDTO.full_name,
                Email = _accountDTO.email,
                Phone = _accountDTO.phone,
                role_id = _accountDTO.role_id, // Chỉnh sửa role_id từ input
                Balance = 0 // Khởi tạo balance là 0
            };

            // Thêm người dùng vào cơ sở dữ liệu
>>>>>>> Stashed changes
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", user = newUser });
        }

<<<<<<< Updated upstream
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
=======
        //Function for staff

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            if (!Guid.TryParse(id, out var userIdGuid))
            {
                return BadRequest(new { message = "Invalid ID format"});
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userIdGuid.ToString());
>>>>>>> Stashed changes

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }

<<<<<<< Updated upstream
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserDTO updateUserDTO)
        {
=======
        //function for users -> full_name, phone, email (password maybe)

        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserDTO updateUserDTO)
        {
            // Lấy JWT token từ header và giải mã để lấy user_id
            var userId = User.FindFirst("user_id")?.Value;

            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            // Kiểm tra tính hợp lệ của dữ liệu đầu vào
>>>>>>> Stashed changes
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

<<<<<<< Updated upstream
            var user = await _context.Users.FindAsync(id);
=======
            // Tìm kiếm người dùng trong cơ sở dữ liệu dựa trên user_id từ JWT token
            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userId);
>>>>>>> Stashed changes

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

<<<<<<< Updated upstream
            // Cập nhật thông tin
            user.full_name = updateUserDTO.full_name ?? user.full_name;
            user.Email = updateUserDTO.email ?? user.Email;
            user.Phone = updateUserDTO.phone ?? user.Phone;
            user.role_id = updateUserDTO.role_id ?? user.role_id;

=======
            // Cập nhật các trường full_name, email, phone
            user.full_name = updateUserDTO.full_name ?? user.full_name;
            user.Email = updateUserDTO.email ?? user.Email;
            user.Phone = updateUserDTO.phone ?? user.Phone;

            // Lưu lại thông tin đã thay đổi
>>>>>>> Stashed changes
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully", user = user });
        }

<<<<<<< Updated upstream
=======
        //Function for admin/ staff

>>>>>>> Stashed changes
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            // Tìm người dùng dựa trên user_id
            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == id);

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Xóa người dùng khỏi cơ sở dữ liệu
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully." });
        }
    }
}
