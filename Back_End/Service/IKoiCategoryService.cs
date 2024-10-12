using Microsoft.AspNetCore.Mvc;
using KoiBet.Data;
using KoiBet.Entities;
using KoiBet.DTO.KoiCategory;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
                        category_id = category.CategoryId,
                        category_name = category.CategoryName,
                        standard_id = category.StandardId,
                        koi_id = category.KoiId,
                        Standard = new KoiStandardDTO
                        {
                            // Assuming you want to include standard details
                        },
                        Koi = new KoiFishDTO
                        {
                            // Assuming you want to include koi fish details
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
                    CategoryName = createKoiCategoryDto.category_name,
                    StandardId = createKoiCategoryDto.standard_id,
                    KoiId = createKoiCategoryDto.koi_id
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
                    .FirstOrDefaultAsync(c => c.CategoryId == updateKoiCategoryDto.category_id);

                if (category == null)
                {
                    return NotFound("Koi category not found!");
                }

                if (!string.IsNullOrEmpty(updateKoiCategoryDto.category_name))
                {
                    category.CategoryName = updateKoiCategoryDto.category_name;
                }
                if (!string.IsNullOrEmpty(updateKoiCategoryDto.standard_id))
                {
                    category.StandardId = updateKoiCategoryDto.standard_id;
                }
                if (!string.IsNullOrEmpty(updateKoiCategoryDto.koi_id))
                {
                    category.KoiId = updateKoiCategoryDto.koi_id;
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
                    .FirstOrDefaultAsync(c => c.CategoryId == categoryId);

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
                        category_id = c.CategoryId,
                        category_name = c.CategoryName,
                        standard_id = c.StandardId,
                        koi_id = c.KoiId,
                        Standard = new KoiStandardDTO
                        {
                            // Assuming you want to include standard details
                        },
                        Koi = new KoiFishDTO
                        {
                            // Assuming you want to include koi fish details
                        }
                    })
                    .FirstOrDefaultAsync(c => c.CategoryId == categoryId);

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
