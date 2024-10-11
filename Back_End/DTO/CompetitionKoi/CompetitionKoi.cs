using KoiBet.DTO.KoiCategory;
using KoiBet.DTO.KoiFish;
using KoiBet.DTO.Referee;
using KoiBet.DTO.Award;
using DTO.KoiFish;

namespace KoiBet.DTO.Competition
{
    public class CompetitionDTO
    {
        public string CompetitionId { get; init; }

        public string CompetitionName { get; init; }

        public string? CompetitionDescription { get; init; }

        public DateTime? StartTime { get; init; }

        public DateTime? EndTime { get; init; }

        public bool? StatusCompetition { get; init; } 

        public string? Round { get; init; }

        public string? KoiCategoryId { get; init; }

        public string? KoiFishId { get; init; }

        public string? RefereeId { get; init; }

        public string? AwardId { get; init; }

        public KoiCategoryDTO? KoiCategory { get; init; }

        public KoiFishDTO? KoiFish { get; init; }

        public RefereeDTO? Referee { get; init; }

        public AwardDTO? Award { get; init; } 

        public string? CompetitionImg { get; init; } 
    }
}
