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
                var categories = await _context.KoiCategory
                    .Select(category => new KoiCategoryDTO
                    {
                        category_id = category.category_id,
                        category_name = category.category_name,
                        standard_id = category.standard_id,
                        Standard = new KoiStandardDTO
                        {
                        },
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
            if (ModelState.IsValid)
            {
                // Lấy số hiện tại lớn nhất từ CategoryId
                var lastCategory = _context.KoiCategory
                    .OrderByDescending(c => c.category_id)
                    .FirstOrDefault();

                int nextNumber = 1;

                if (lastCategory != null)
                {
                    var lastCategoryId = lastCategory.category_id;

                    // Kiểm tra nếu category_id bắt đầu bằng "Cate_"
                    if (lastCategoryId.StartsWith("Cate_"))
                    {
                        var lastNumberString = lastCategoryId.Substring(5); // Lấy phần sau "Cate_"

                        // Kiểm tra nếu phần sau "Cate_" là số hợp lệ
                        if (int.TryParse(lastNumberString, out int lastNumber))
                        {
                            nextNumber = lastNumber + 1;
                        }
                    }
                }

                // Tạo ID mới dạng Cate_x
                string newCategoryId = $"Cate_{nextNumber}";

                var newCategory = new KoiCategory
                {
                    category_id = newCategoryId,
                    category_name = createKoiCategoryDto.category_name,
                    standard_id = createKoiCategoryDto.standard_id
                };

                //if(newCategory.Competitions == null)
                //{
                //    newCategory.Competitions = new List<CompetitionKoi>();
                //}


                _context.KoiCategory.Add(newCategory);
                await _context.SaveChangesAsync();

                return Ok(newCategory);
            }

            return BadRequest(ModelState);

        }

        // Update an existing Koi Category
        public async Task<IActionResult> HandleUpdateKoiCategory(UpdateKoiCategoryDTO updateKoiCategoryDto)
        {
            try
            {
                var category = await _context.KoiCategory
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

                _context.KoiCategory.Update(category);
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
                var category = await _context.KoiCategory
                    .FirstOrDefaultAsync(c => c.category_id == categoryId);

                if (category == null)
                {
                    return NotFound("Koi category not found!");
                }

                _context.KoiCategory.Remove(category);
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
                var category = await _context.KoiCategory
                    .Select(c => new KoiCategoryDTO
                    {
                        category_id = c.category_id,
                        category_name = c.category_name,
                        standard_id = c.standard_id,
                        Standard = new KoiStandardDTO
                        {
                        },
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
