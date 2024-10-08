using KoiBet.Data;
using KoiBet.DTO.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using KoiBet.Entities;

namespace KoiBet.Service
{
    public interface IUserService
    {
        //CRUD for User ( - Role Admin + Staff can check)
        public Task<IActionResult> HandleCreate(ManagerDTO managerDTO);
        public Task<IActionResult> HandleUpdate(ManagerDTO managerDTO);
        public Task<IActionResult> HandleDelete(ManagerDTO managerDTO);
        public Task<IActionResult> HandlePost(ManagerDTO managerDTO);
    }

    public class UserSerive : ControllerBase, IUserService
    {
        private readonly ApplicationDbContext _context;
        public UserSerive(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task<IActionResult> HandleCreate(ManagerDTO _managerDTO)
        {
          //Check role exsit
          var roleExsits = await _context.Roles.AnyAsync(r => r.role_id == _managerDTO.role_id);

            if (!roleExsits)
            {
                throw new ArgumentException("User is not Exsit");
            }

            var newUser = new Users
            {
                user_id = Guid.NewGuid().ToString(),
                Username = _managerDTO.user_name,
                full_name = _managerDTO.full_name,
                Password = _managerDTO.password,
                Email = _managerDTO.email,
                Phone = _managerDTO.phone,
                role_id = _managerDTO.role_id,
                Balance = 0
            };
            return Ok(newUser);
        }

        public async Task<IActionResult> HandleDeleteByID(string user_id, ManagerDTO managerDTO)
        {
            if (string.IsNullOrEmpty(user_id) || !Guid.TryParse(user_id, out var userIdGuid)) {
                throw new ArgumentException("Invaild ID or ID doesn't exsit");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.user_id == userIdGuid.ToString());

            if (user == null) 
            {
                throw new KeyNotFoundException(user_id.ToString());   
            }

            _context.Users.Remove(user);
            return Ok("Delete user succcessfully");

        }

        public async Task<IActionResult> HandleGetUser(string user_id, string user_name, ManagerDTO managerDTO)
        {
            if (string.IsNullOrEmpty(user_id) || string.IsNullOrEmpty(user_name)){
                throw new ArgumentException("ID or Username doesn't exsit");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == user_name);
            if (user == null)
            {
                throw new ArgumentException("Username not founded");
            }

            var ValidId = BCrypt.Net.BCrypt.Verify(user_id, user.user_id);

            if (!ValidId)
            {
                return BadRequest(new { message = "ID doesn't match" });
            }

            return Ok(new
            {
                message = "User Found",
                user = new
                {
                    Username = user.Username,
                    FullName = user.full_name,
                    Email = user.Email,
                    Phone = user.Phone,
                    RoleId = user.role_id,
                    RoleName = user.role_name,
                }
            }





            
        }

        public Task<IActionResult> HandleUpdate(ManagerDTO managerDTO)
        {

        }
    }

}
