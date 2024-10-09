using KoiBet.Data;
using KoiBet.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KoiBet.Entities;
using System;
using System.Threading.Tasks;

namespace KoiBet.Service
{
    public interface IUserService
    {
        Task<IActionResult> HandleCreate(ManagerDTO managerDTO);
        Task<IActionResult> HandleUpdateByUsername(string username, UpdateUserDTO _updateDTO);
        Task<IActionResult> HandleDeleteByID(string user_id);
        Task<IActionResult> HandleGetUser(string user_id, string user_name);
    }

    public class UserService : ControllerBase, IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Tạo user mới
        public async Task<IActionResult> HandleCreate(ManagerDTO managerDTO)
        {
            var roleExists = await _context.Roles.AnyAsync(r => r.role_id == managerDTO.role_id);

            if (!roleExists)
            {
                return BadRequest("Role does not exist");
            }

            var newUser = new Users
            {
                user_id = Guid.NewGuid().ToString(), // Sử dụng Guid
                Username = managerDTO.user_name,
                full_name = managerDTO.full_name,
                Password = BCrypt.Net.BCrypt.HashPassword(managerDTO.password), // Hash mật khẩu
                Email = managerDTO.email,
                Phone = managerDTO.phone,
                role_id = managerDTO.role_id,
                Balance = 0
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        // Cập nhật user
        public async Task<IActionResult> HandleUpdateByUsername(string username, UpdateUserDTO updateDTO)
        {
            // Find the user by username
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Update user information only if the new value is provided
            if (!string.IsNullOrWhiteSpace(updateDTO.full_name))
            {
                user.full_name = updateDTO.full_name;
            }

            if (!string.IsNullOrWhiteSpace(updateDTO.email))
            {
                user.Email = updateDTO.email;
            }

            if (!string.IsNullOrWhiteSpace(updateDTO.phone))
            {
                user.Phone = updateDTO.phone;
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // Xóa user theo ID
        public async Task<IActionResult> HandleDeleteByID(string user_id)
        {
            if (string.IsNullOrEmpty(user_id) || !Guid.TryParse(user_id, out var userIdGuid))
            {
                return BadRequest("Invalid user ID");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userIdGuid.ToString());

            if (user == null)
            {
                return NotFound("User not found");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully");
        }

        // Lấy thông tin user theo ID hoặc Username
        public async Task<IActionResult> HandleGetUser(string user_id, string user_name)
        {
            if (string.IsNullOrEmpty(user_id) && string.IsNullOrEmpty(user_name))
            {
                return BadRequest("ID or Username must be provided");
            }

            Users user = null;

            if (!string.IsNullOrEmpty(user_id) && Guid.TryParse(user_id, out var userIdGuid))
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userIdGuid.ToString());
            }
            else if (!string.IsNullOrEmpty(user_name))
            {
                user = await _context.Users.FirstOrDefaultAsync(u => u.Username == user_name);
            }

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(new
            {
                Username = user.Username,
                FullName = user.full_name,
                Email = user.Email,
                Phone = user.Phone,
                RoleId = user.role_id,
                Balance = user.Balance
            });
        }
    }
}
