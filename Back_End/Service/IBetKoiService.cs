using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KoiBet.Data;
using KoiBet.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Service.IBetKoiService
{
    // IBetKoiService Interface
    public interface IBetKoiService
    {
        Task<IActionResult> HandlePlaceBet(CreateBetDTO createBetDto);
        Task<IActionResult> HandleGetUserBets(string userId);
        Task<IActionResult> HandleUpdateBet(UpdateBetDTO updateBetDto);
        Task<IActionResult> HandleDeleteBet(string betId);
        Task<IActionResult> HandleGetBet(string betId);
    }

    // BetKoiService Implementation
    public class BetKoiService : ControllerBase, IBetKoiService
    {
        private readonly ApplicationDbContext _context;

        public BetKoiService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Place a bet on a Koi fish
        public async Task<IActionResult> HandlePlaceBet(CreateBetDTO createBetDto)
        {
            try
            {
                var newBet = new Bet
                {
                    BetId = Guid.NewGuid().ToString(),
                    UserId = createBetDto.UserId,
                    KoiFishId = createBetDto.KoiFishId,
                    Amount = createBetDto.Amount,
                    BetTime = DateTime.UtcNow
                };

                _context.Bets.Add(newBet);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to place bet!");
                }

                return Ok(newBet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Get all bets placed by a user
        public async Task<IActionResult> HandleGetUserBets(string userId)
        {
            try
            {
                var bets = await _context.Bets
                    .Where(b => b.UserId == userId)
                    .ToListAsync();

                if (!bets.Any())
                {
                    return NotFound("No bets found for the user.");
                }

                return Ok(bets);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Update an existing bet
        public async Task<IActionResult> HandleUpdateBet(UpdateBetDTO updateBetDto)
        {
            try
            {
                var bet = await _context.Bets
                    .FirstOrDefaultAsync(b => b.BetId == updateBetDto.BetId);

                if (bet == null)
                {
                    return NotFound("Bet not found!");
                }

                bet.Amount = updateBetDto.Amount;

                _context.Bets.Update(bet);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to update bet!");
                }

                return Ok(bet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Delete a specific bet
        public async Task<IActionResult> HandleDeleteBet(string betId)
        {
            try
            {
                var bet = await _context.Bets
                    .FirstOrDefaultAsync(b => b.BetId == betId);

                if (bet == null)
                {
                    return NotFound("Bet not found!");
                }

                _context.Bets.Remove(bet);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to delete bet!");
                }

                return Ok("Bet deleted successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Get a specific bet by ID
        public async Task<IActionResult> HandleGetBet(string betId)
        {
            try
            {
                var bet = await _context.Bets
                    .FirstOrDefaultAsync(b => b.BetId == betId);

                if (bet == null)
                {
                    return NotFound("Bet not found!");
                }

                return Ok(bet);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

