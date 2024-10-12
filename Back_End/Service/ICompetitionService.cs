using Microsoft.AspNetCore.Mvc;
using KoiBet.Data;
using KoiBet.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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
                var competitions = await _context.Competitions
                    .Select(competition => new CompetitionDTO
                    {
                        CompetitionId = competition.CompetitionId,
                        CompetitionName = competition.CompetitionName,
                        CompetitionDescription = competition.CompetitionDescription,
                        StartTime = competition.StartTime,
                        EndTime = competition.EndTime,
                        StatusCompetition = competition.StatusCompetition,
                        Round = competition.Round,
                        KoiCategoryId = competition.KoiCategoryId,
                        KoiFishId = competition.KoiFishId,
                        RefereeId = competition.RefereeId,
                        AwardId = competition.AwardId,
                        CompetitionImg = competition.CompetitionImg
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
                return BadRequest(ex.Message);
            }
        }

        // Create a new Competition
        public async Task<IActionResult> HandleCreateNewCompetition(CreateCompetitionDTO createCompetitionDto)
        {
            try
            {
                var lastCompetition = await _context.Competitions
                    .OrderByDescending(c => c.CompetitionId)
                    .FirstOrDefaultAsync();

                int newIdNumber = 1; // Default ID starts at 1 if no records exist

                if (lastCompetition != null)
                {
                    var lastId = lastCompetition.CompetitionId;
                    if (lastId.StartsWith("CPT_"))
                    {
                        int.TryParse(lastId.Substring(4), out newIdNumber); // Increment the ID number after 'CPT_'
                        newIdNumber++;
                    }
                }

                var newCompetition = new Competition
                {
                    CompetitionId = $"CPT_{newIdNumber}",
                    CompetitionName = createCompetitionDto.CompetitionName,
                    CompetitionDescription = createCompetitionDto.CompetitionDescription,
                    StartTime = createCompetitionDto.StartTime,
                    EndTime = createCompetitionDto.EndTime,
                    StatusCompetition = createCompetitionDto.StatusCompetition,
                    Round = createCompetitionDto.Round,
                    KoiCategoryId = createCompetitionDto.KoiCategoryId,
                    KoiFishId = createCompetitionDto.KoiFishId,
                    RefereeId = createCompetitionDto.RefereeId,
                    AwardId = createCompetitionDto.AwardId,
                    CompetitionImg = createCompetitionDto.CompetitionImg
                };

                _context.Competitions.Add(newCompetition);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to create new competition!");
                }

                return Ok(newCompetition);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Update an existing Competition
        public async Task<IActionResult> HandleUpdateCompetition(UpdateCompetitionDTO updateCompetitionDto)
        {
            try
            {
                var competition = await _context.Competitions
                    .FirstOrDefaultAsync(c => c.CompetitionId == updateCompetitionDto.CompetitionId);

                if (competition == null)
                {
                    return NotFound("Competition not found!");
                }

                competition.CompetitionName = updateCompetitionDto.CompetitionName;
                competition.CompetitionDescription = updateCompetitionDto.CompetitionDescription;
                competition.StartTime = updateCompetitionDto.StartTime;
                competition.EndTime = updateCompetitionDto.EndTime;
                competition.StatusCompetition = updateCompetitionDto.StatusCompetition;
                competition.Round = updateCompetitionDto.Round;
                competition.KoiCategoryId = updateCompetitionDto.KoiCategoryId;
                competition.KoiFishId = updateCompetitionDto.KoiFishId;
                competition.RefereeId = updateCompetitionDto.RefereeId;
                competition.AwardId = updateCompetitionDto.AwardId;
                competition.CompetitionImg = updateCompetitionDto.CompetitionImg;

                _context.Competitions.Update(competition);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to update competition!");
                }

                return Ok(competition);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Delete a Competition
        public async Task<IActionResult> HandleDeleteCompetition(string competitionId)
        {
            try
            {
                var competition = await _context.Competitions
                    .FirstOrDefaultAsync(c => c.CompetitionId == competitionId);

                if (competition == null)
                {
                    return NotFound("Competition not found!");
                }

                _context.Competitions.Remove(competition);
                var result = await _context.SaveChangesAsync();

                if (result != 1)
                {
                    return BadRequest("Failed to delete competition!");
                }

                return Ok("Competition deleted successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Get a specific Competition by ID
        public async Task<IActionResult> HandleGetCompetition(string competitionId)
        {
            try
            {
                var competition = await _context.Competitions
                    .Select(c => new CompetitionDTO
                    {
                        CompetitionId = c.CompetitionId,
                        CompetitionName = c.CompetitionName,
                        CompetitionDescription = c.CompetitionDescription,
                        StartTime = c.StartTime,
                        EndTime = c.EndTime,
                        StatusCompetition = c.StatusCompetition,
                        Round = c.Round,
                        KoiCategoryId = c.KoiCategoryId,
                        KoiFishId = c.KoiFishId,
                        RefereeId = c.RefereeId,
                        AwardId = c.AwardId,
                        CompetitionImg = c.CompetitionImg
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
                return BadRequest(ex.Message);
            }
        }
    }
}
