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
//        public async Task<IActionResult> HandlePlaceBet(CreateBetDTO _createBetDTO)
//        {
//            try
//            {
//                // Check if the user exists
//                var user = await _context.Users
//                    .FirstOrDefaultAsync(u => u.user_id == _createBetDTO.UserId);

//                if (user == null)
//                {
//                    return NotFound("User not found.");
//                }

//                // Fetch the last bet to get the highest number in the current BetId format
//                var lastBet = await _context.BetKoi
//                    .OrderByDescending(b => b.bet_id)
//                    .FirstOrDefaultAsync();

//                int lastNumber = 0;
//                if (lastBet != null && lastBet.bet_id.StartsWith("BET_"))
//                {
//                    var numberPart = lastBet.bet_id.Substring(4); // Get the numeric part after "BET_"
//                    if (int.TryParse(numberPart, out int parsedNumber))
//                    {
//                        lastNumber = parsedNumber;
//                    }
//                }

//                // Increment the number for the new BetId
//                string newBetId = $"BET_{lastNumber + 1}";

//                // Ensure BetId does not already exist
//                while (await _context.BetKoi.AnyAsync(b => b.bet_id == newBetId))
//                {
//                    lastNumber++;
//                    newBetId = $"BET_{lastNumber + 1}";
//                }

//                // Create a new BetKoi entity (not DTO)
//                var newBet = new BetKoi
//                {
//                    bet_id = newBetId,
//                    users_id = user.user_id,
//                    registration_id = _createBetDTO
//                    competition_id = _createBetDTO
//                };

//                // Add the BetKoi entity to the DbSet
//                _context.BetKoi.Add(newBet);
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
//    }
//}
