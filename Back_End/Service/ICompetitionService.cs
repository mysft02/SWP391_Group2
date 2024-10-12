using Microsoft.AspNetCore.Mvc;
using KoiBet.Data;
using KoiBet.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using KoiBet.DTO.Competition;

namespace Service.ICompetitionService
{
    public interface ICompetitionService
    {
        Task<IActionResult> HandleGetAllCompetitions();
        Task<IActionResult> HandleCreateNewCompetition(CreateCompetitionDTO createCompetitionDto);
        Task<IActionResult> HandleUpdateCompetition(UpdateCompetitionDTO updateCompetitionDto);
        Task<IActionResult> HandleDeleteCompetition(string competitionId);
        Task<IActionResult> HandleGetCompetition(string competitionId);
    }

    public class CompetitionService : ControllerBase, ICompetitionService
    {
        private readonly ApplicationDbContext _context;

        public CompetitionService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all Competitions
        public async Task<IActionResult> HandleGetAllCompetitions()
        {
            try
            {
                var competitions = await _context.Competition
                    .Select(competition => new CompetitionDTO
                    {
                        CompetitionId = competition.competition_id,
                        CompetitionName = competition.competition_name,
                        CompetitionDescription = competition.competition_description,
                        StartTime = competition.start_time,
                        EndTime = competition.end_time,
                        StatusCompetition = competition.status_competition,
                        Round = competition.round,
                        category_id = competition.category_id,
                        koi_id = competition.koi_id,
                        referee_id = competition.referee_id,
                        award_id = competition.award_id,
                        CompetitionImg = competition.competition_img,
                    })
                    .ToListAsync();

                if (!competitions.Any())
                {
                    return NotFound("No competitions found!");
                }

                return Ok(competitions);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving competitions: {ex.Message}");
            }
        }

        // Create a new Competition
        public async Task<IActionResult> HandleCreateNewCompetition(CreateCompetitionDTO createCompetitionDto)
        {
            try
            {
                var lastCompetition = await _context.Competition
                    .OrderByDescending(c => c.competition_id)
                    .FirstOrDefaultAsync();

                int newIdNumber = 1; // Default ID starts at 1 if no records exist

                if (lastCompetition != null)
                {
                    var lastId = lastCompetition.competition_id;
                    if (lastId.StartsWith("CPT_"))
                    {
                        int.TryParse(lastId.Substring(4), out newIdNumber); // Increment the ID number after 'CPT_'
                        newIdNumber++;
                    }
                }

                var newCompetition = new CompetitionKoi
                {
                    competition_id = $"CPT_{newIdNumber}",
                    competition_name = createCompetitionDto.competition_name,
                    competition_description = createCompetitionDto.competition_description,
                    start_time = createCompetitionDto.start_time,
                    end_time = createCompetitionDto.end_time,
                    status_competition = createCompetitionDto.status_competition.ToString(),
                    round = createCompetitionDto.round,
                    category_id = createCompetitionDto.category_id,
                    koi_id = createCompetitionDto.koi_id,
                    referee_id = createCompetitionDto.referee_id,
                    award_id = createCompetitionDto.award_id,
                    competition_img = createCompetitionDto.competition_img
                };

                _context.Competition.Add(newCompetition);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to create new competition!");
                }

                return Ok(newCompetition);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating competition: {ex.Message}");
            }
        }

        // Update an existing Competition
        public async Task<IActionResult> HandleUpdateCompetition(UpdateCompetitionDTO updateCompetitionDto)
        {
            try
            {
                var competition = await _context.Competition
                    .FirstOrDefaultAsync(c => c.competition_id == updateCompetitionDto.CompetitionId);

                if (competition == null)
                {
                    return NotFound("Competition not found!");
                }

                competition.competition_name = updateCompetitionDto.CompetitionName;
                competition.competition_description = updateCompetitionDto.CompetitionDescription;
                DateTime startTime = competition.start_time;
                DateTime endTime = competition.end_time;
                competition.status_competition = updateCompetitionDto.StatusCompetition.ToString();
                competition.round = updateCompetitionDto.Round;
                competition.category_id = updateCompetitionDto.KoiCategoryId;
                competition.koi_id = updateCompetitionDto.KoiFishId;
                competition.referee_id = updateCompetitionDto.RefereeId;
                competition.award_id = updateCompetitionDto.AwardId;
                competition.competition_img = updateCompetitionDto.CompetitionImg;

                _context.Competition.Update(competition);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to update competition!");
                }

                return Ok(competition);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating competition: {ex.Message}");
            }
        }

        // Delete a Competition
        public async Task<IActionResult> HandleDeleteCompetition(string competitionId)
        {
            try
            {
                var competition = await _context.Competition
                    .FirstOrDefaultAsync(c => c.competition_id == competitionId);

                if (competition == null)
                {
                    return NotFound("Competition not found!");
                }

                _context.Competition.Remove(competition);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to delete competition!");
                }

                return Ok("Competition deleted successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting competition: {ex.Message}");
            }
        }

        // Get a specific Competition by ID
        public async Task<IActionResult> HandleGetCompetition(string competitionId)
        {
            try
            {
                var competition = await _context.Competition
                    .Select(c => new CompetitionDTO
                    {
                        CompetitionId = c.competition_id,
                        CompetitionName = c.competition_name,
                        CompetitionDescription = c.competition_description,
                        StartTime = c.start_time,
                        EndTime = c.end_time,
                        StatusCompetition = c.status_competition,
                        Round = c.round,
                        category_id = c.category_id,
                        koi_id = c.koi_id,
                        referee_id = c.referee_id,
                        award_id = c.award_id,
                        CompetitionImg = c.competition_img
                    })
                    .FirstOrDefaultAsync(c => c.CompetitionId == competitionId);

                if (competition == null)
                {
                    return NotFound("Competition not found!");
                }

                return Ok(competition);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving competition: {ex.Message}");
            }
        }
    }
}
