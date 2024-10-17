﻿using KoiBet.Data;
using KoiBet.DTO.Award;
using KoiBet.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace KoiBet.Service
{
    public interface IAwardService
    {
        Task<IActionResult> HandleGetAllAwards();
        Task<IActionResult> HandleCreateAward(CreateAwardDTO createAwardDTO);
        Task<IActionResult> HandleUpdateAward(string awardId, UpdateAwardDTO updateAwardDTO);
        Task<IActionResult> HandleDeleteAward(string awardId);
        Task<IActionResult> HandleGetAwardById(string awardId);
    }

    public class AwardService : ControllerBase, IAwardService
    {
        private readonly ApplicationDbContext _context;

        public AwardService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all Awards
        public async Task<IActionResult> HandleGetAllAwards()
        {
            try
            {
                var awards = await _context.Awards
                    .Select(a => new AwardDTO
                    {
                        award_id = a.award_id,
                        award_name = a.award_name,
                        quantity = a.quantity
                    })
                    .ToListAsync();

                if (!awards.Any())
                {
                    return NotFound("No awards found!");
                }

                return Ok(awards);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving awards: {ex.Message}");
            }
        }

        // Create a new Award
        public async Task<IActionResult> HandleCreateAward(CreateAwardDTO createAwardDTO)
        {
            try
            {
                var lastAward = await _context.Awards
                    .OrderByDescending(a => a.award_id)
                    .FirstOrDefaultAsync();

                int newIdNumber = 1; // Default ID starts at 1 if no records exist

                if (lastAward != null)
                {
                    var lastId = lastAward.award_id;
                    if (lastId.StartsWith("AWD_"))
                    {
                        int.TryParse(lastId.Substring(4), out newIdNumber); // Increment the ID number after 'AWD_'
                        newIdNumber++;
                    }
                }

                var newAward = new Award
                {
                    award_id = $"AWD_{newIdNumber}",
                    award_name = createAwardDTO.award_name,
                    quantity = createAwardDTO.quantity
                };

                _context.Awards.Add(newAward);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to create new award!");
                }

                return Ok(newAward);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating award: {ex.Message}");
            }
        }

        // Update an existing Award
        public async Task<IActionResult> HandleUpdateAward(string awardId , UpdateAwardDTO updateAwardDTO)
        {
                var existingAward = await _context.Awards
                    .FirstOrDefaultAsync(a => a.award_id == awardId);

                if (existingAward == null)
                {
                    return NotFound("Award not found!");
                }

                existingAward.award_name = updateAwardDTO.award_name ?? existingAward.award_name;
                existingAward.quantity = updateAwardDTO.quantity;

                await _context.SaveChangesAsync();    

                return Ok(existingAward);
        }

        // Delete an Award
        public async Task<IActionResult> HandleDeleteAward(string awardId)
        {
            try
            {
                var existingAward = await _context.Awards
                    .FirstOrDefaultAsync(a => a.award_id == awardId);

                if (existingAward == null)
                {
                    return NotFound("Award not found!");
                }

                _context.Awards.Remove(existingAward);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to delete award!");
                }

                return Ok("Award deleted successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting award: {ex.Message}");
            }
        }

        // Get a specific Award by ID
        public async Task<IActionResult> HandleGetAwardById(string awardId)
        {
            try
            {
                var award = await _context.Awards
                    .Select(a => new AwardDTO
                    {
                        award_id = a.award_id,
                        award_name = a.award_name,
                        quantity = a.quantity
                    })
                    .FirstOrDefaultAsync(a => a.award_id == awardId);

                if (award == null)
                {
                    return NotFound("Award not found!");
                }

                return Ok(award);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving award: {ex.Message}");
            }
        }
    }
}
