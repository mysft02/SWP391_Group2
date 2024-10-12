using Microsoft.AspNetCore.Mvc;
using KoiBet.Data;
using KoiBet.Entities;
using KoiBet.DTO.KoiCategory;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using KoiBet.DTO.KoiStandard;
using DTO.KoiFish;

namespace Service.IKoiCategoryService
{
    public interface IKoiCategoryService
    {
        Task<IActionResult> HandleGetAllKoiCategories();
        Task<IActionResult> HandleCreateKoiCategory(CreateKoiCategoryDTO createKoiCategoryDto);
        Task<IActionResult> HandleUpdateKoiCategory(UpdateKoiCategoryDTO updateKoiCategoryDto);
        Task<IActionResult> HandleDeleteKoiCategory(string categoryId);
        Task<IActionResult> HandleGetKoiCategory(string categoryId);
    }

    public class KoiCategoryService : ControllerBase, IKoiCategoryService
    {
        private readonly ApplicationDbContext _context;

        public KoiCategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all Koi Categories
        public async Task<IActionResult> HandleGetAllKoiCategories()
        {
            try
            {
                var categories = await _context.KoiCategories
                    .Select(category => new KoiCategoryDTO
                    {
                        category_id = category.category_id,
                        category_name = category.category_name,
                        standard_id = category.standard_id,
                        koi_id = category.koi_id,
                        Standard = new KoiStandardDTO
                        {
                        },
                        Koi = new KoiFishDTO
                        {
                        }
                    })
                    .ToListAsync();

                if (!categories.Any())
                {
                    return NotFound("No koi categories found!");
                }

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Create a new Koi Category
        public async Task<IActionResult> HandleCreateKoiCategory(CreateKoiCategoryDTO createKoiCategoryDto)
        {
            try
            {
                var newCategory = new KoiCategory
                {
                    category_name = createKoiCategoryDto.category_name,
                    standard_id = createKoiCategoryDto.standard_id,
                    koi_id = createKoiCategoryDto.koi_id
                };

                _context.KoiCategories.Add(newCategory);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to create new koi category!");
                }

                return Ok(newCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Update an existing Koi Category
        public async Task<IActionResult> HandleUpdateKoiCategory(UpdateKoiCategoryDTO updateKoiCategoryDto)
        {
            try
            {
                var category = await _context.KoiCategories
                    .FirstOrDefaultAsync(c => c.category_id == updateKoiCategoryDto.category_id);

                if (category == null)
                {
                    return NotFound("Koi category not found!");
                }

                if (!string.IsNullOrEmpty(updateKoiCategoryDto.category_name))
                {
                    category.category_name = updateKoiCategoryDto.category_name;
                }
                if (!string.IsNullOrEmpty(updateKoiCategoryDto.standard_id))
                {
                    category.standard_id = updateKoiCategoryDto.standard_id;
                }
                if (!string.IsNullOrEmpty(updateKoiCategoryDto.koi_id))
                {
                    category.koi_id = updateKoiCategoryDto.koi_id;
                }

                _context.KoiCategories.Update(category);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to update koi category!");
                }

                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Delete a Koi Category
        public async Task<IActionResult> HandleDeleteKoiCategory(string categoryId)
        {
            try
            {
                var category = await _context.KoiCategories
                    .FirstOrDefaultAsync(c => c.category_id == categoryId);

                if (category == null)
                {
                    return NotFound("Koi category not found!");
                }

                _context.KoiCategories.Remove(category);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to delete koi category!");
                }

                return Ok("Koi category deleted successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Get a specific Koi Category by ID
        public async Task<IActionResult> HandleGetKoiCategory(string categoryId)
        {
            try
            {
                var category = await _context.KoiCategories
                    .Select(c => new KoiCategoryDTO
                    {
                        category_id = c.category_id,
                        category_name = c.category_name,
                        standard_id = c.standard_id,
                        koi_id = c.koi_id,
                        Standard = new KoiStandardDTO
                        {
                            // Assuming you want to include standard details
                        },
                        Koi = new KoiFishDTO
                        {
                            // Assuming you want to include koi fish details
                        }
                    })
                    .FirstOrDefaultAsync(c => c.category_id == categoryId);

                if (category == null)
                {
                    return NotFound("Koi category not found!");
                }

                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
