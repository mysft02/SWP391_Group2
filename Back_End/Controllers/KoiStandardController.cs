using Microsoft.AspNetCore.Mvc;
using KoiBet.DTO.KoiStandard;
using Service.KoiStandardService;

namespace KoiBet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoiStandardController : ControllerBase
    {
        private readonly IKoiStandardService _koiStandardService;

        public KoiStandardController(IKoiStandardService koiStandardService)
        {
            _koiStandardService = koiStandardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllKoiStandards()
        {
            return await _koiStandardService.HandleGetAllKoiStandards();
        }

        [HttpGet("{standardId}")]
        public async Task<IActionResult> GetKoiStandard(string standardId)
        {
            return await _koiStandardService.HandleGetKoiStandard(standardId);
        }


        [HttpPut("{standardId}")]
        public async Task<IActionResult> UpdateKoiStandard(string standardId, [FromBody] UpdateKoiStandardDTO updateKoiStandardDto)
        {
            if (standardId != updateKoiStandardDto.standard_id)
            {
                return BadRequest("Standard ID mismatch.");
            }

            return await _koiStandardService.HandleUpdateKoiStandard(updateKoiStandardDto);
        }

        [HttpDelete("{standardId}")]
        public async Task<IActionResult> DeleteKoiStandard(string standardId)
        {
            return await _koiStandardService.HandleDeleteKoiStandard(standardId);
        }
    }
}
