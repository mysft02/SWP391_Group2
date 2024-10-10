using KoiBet.Data;
using DTO.KoiFish;
using KoiBet.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Service.KoiFishService;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiFishController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IKoiFishService _koiFishService;

        public KoiFishController(ApplicationDbContext context, IKoiFishService koiFishService)
        {
            _context = context;
            _koiFishService = koiFishService;
        }

        // POST: auth/login
        [HttpPost("Get All Koi Fishes")]
        public async Task<IActionResult> GetAllKoiFishes([FromBody] string userId)
        {
            return await _koiFishService.HandleGetAllKoiFishes(userId);
        }

        [HttpPost("Create New Koi Fish")]
        public async Task<IActionResult> CreateNewKoiFish([FromBody] CreateKoiFishDTO createKoiFishDto)
        {
            return await _koiFishService.HandleCreateNewKoiFish(createKoiFishDto);
        }

        [HttpPost("Update Koi Fish")]
        public async Task<IActionResult> UpdateKoiFish([FromBody] UpdateKoiFishDTO updateKoiFishDto)
        {
            return await _koiFishService.HandleUpdateKoiFish(updateKoiFishDto);
        }

        [HttpPost("Delete Koi Fish")]
        public async Task<IActionResult> DeleteKoiFish([FromBody] string koiId)
        {
            return await _koiFishService.HandleDeleteKoiFish(koiId);
        }
    }
}
