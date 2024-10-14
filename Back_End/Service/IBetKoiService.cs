//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using KoiBet.Data;
//using KoiBet.Entities;
//using Microsoft.EntityFrameworkCore;
//using System;
//using KoiBet.DTO.Bet;
//using KoiBet.DTO.BetKoi;
//using KoiBet.DTO.User;

//namespace Service.IBetKoiService
//{
//    // IBetKoiService Interface
//    public interface IBetKoiService
//    {
//        Task<IActionResult> HandlePlaceBet(CreateBetDTO createBetDto);
//        Task<IActionResult> HandleGetUserBets(string userId);
//        Task<IActionResult> HandleUpdateBet(UpdateBetDTO updateBetDto);
//        Task<IActionResult> HandleDeleteBet(string betId);
//        Task<IActionResult> HandleGetBet(string betId);
//    }

//    // BetKoiService Implementation
//    public class BetKoiService : ControllerBase, IBetKoiService
//    {
//        private readonly ApplicationDbContext _context;

//        public BetKoiService(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        // Place a bet on a Koi fish
//        public async Task<IActionResult> HandlePlaceBet(CreateBetDTO createBetDto)
//        {
//            try
//            {
//                var newBet = new BetKoiDTO
//                {
//                    bet_id = Guid.NewGuid().ToString(),
//                    user_id = new UserDTO { UserId = createBetDto.UserId }, // Assuming UserDTO maps to the User entity
//                };

//                _context.KoiBet.Add(newBet); // Make sure KoiBet is the right DbSet name for your table
//                var result = await _context.SaveChangesAsync();

//                if (result != 1)
//                {
//                    return BadRequest("Failed to place bet!");
//                }

//                return Ok(newBet);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }

//        // Get all bets placed by a user
//        public async Task<IActionResult> HandleGetUserBets(string userId)
//        {
//            try
//            {
//                var bets = await _context.KoiBet
//                    .Where(b => b.user_id.UserId == userId) // Adjust according to the entity relationships
//                    .ToListAsync();

//                if (!bets.Any())
//                {
//                    return NotFound("No bets found for the user.");
//                }

//                return Ok(bets);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }

//        // Update an existing bet
//        public async Task<IActionResult> HandleUpdateBet(UpdateBetDTO updateBetDto)
//        {
//            try
//            {
//                var bet = await _context.KoiBet
//                    .FirstOrDefaultAsync(b => b.bet_id == updateBetDto.BetId);

//                if (bet == null)
//                {
//                    return NotFound("Bet not found!");
//                }

//                // Update properties as needed
//                // bet.Amount = updateBetDto.Amount;

//                _context.KoiBet.Update(bet);
//                var result = await _context.SaveChangesAsync();

//                if (result != 1)
//                {
//                    return BadRequest("Failed to update bet!");
//                }

//                return Ok(bet);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }

//        // Delete a specific bet
//        public async Task<IActionResult> HandleDeleteBet(string betId)
//        {
//            try
//            {
//                var bet = await _context.KoiBet
//                    .FirstOrDefaultAsync(b => b.bet_id == betId);

//                if (bet == null)
//                {
//                    return NotFound("Bet not found!");
//                }

//                _context.KoiBet.Remove(bet);
//                var result = await _context.SaveChangesAsync();

//                if (result != 1)
//                {
//                    return BadRequest("Failed to delete bet!");
//                }

//                return Ok("Bet deleted successfully!");
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }

//        // Get a specific bet by ID
//        public async Task<IActionResult> HandleGetBet(string betId)
//        {
//            try
//            {
//                var bet = await _context.KoiBet
//                    .FirstOrDefaultAsync(b => b.bet_id == betId);

//                if (bet == null)
//                {
//                    return NotFound("Bet not found!");
//                }

//                return Ok(bet);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest(ex.Message);
//            }
//        }
//    }
//}
