using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using KoiBet.DTO.KoiCategory;
using Service.IKoiCategoryService;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiCategoryController : ControllerBase
    {
        private readonly IKoiCategoryService _KoiCategoryService;

        public KoiCategoryController(IKoiCategoryService KoiCategoryService)
        {
            _KoiCategoryService = KoiCategoryService;
        }

        [HttpGet("Get all KoiCategory")]
        public async Task<IActionResult> GetAllKoiCategory()
        {
            return await _KoiCategoryService.HandleGetAllKoiCategorys();
        }

        [HttpGet("Get KoiCategory")]
        public async Task<IActionResult> GetKoiCategory(string KoiCategoryId)
        {
            return await _KoiCategoryService.HandleGetKoiCategory(KoiCategoryId);
        }



        [HttpPost("Get KoiCategory")]
        public async Task<IActionResult> CreateKoiCategory([FromBody] CreateKoiCategoryDTO _createKoiCategory)
        {
            return await _KoiCategoryService.HandleCreateNewKoiCategory(_createKoiCategory);
        }

        [HttpPut("Update KoiCategory")]
        public async Task<IActionResult> UpdateKoiCategory([FromBody] UpdateKoiCategoryDTO _updateKoiCategory)
        {
            return await _KoiCategoryService.HandleUpdateKoiCategory(_updateKoiCategory);
        
        }

        [HttpDelete("Delete KoiCategory")]
        public async Task<IActionResult> DeleteKoiCategory(string KoiCategoryId)
        {
            return await _KoiCategoryService.HandleDeleteKoiCategory(KoiCategoryId);
        }
    }
}
