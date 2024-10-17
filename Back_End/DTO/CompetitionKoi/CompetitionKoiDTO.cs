using KoiBet.DTO.KoiCategory;
using DTO.KoiFish;
using KoiBet.DTO.Referee;
using KoiBet.DTO.Award;
using DTO.KoiFish;
using System.ComponentModel.DataAnnotations;

namespace KoiBet.DTO.Competition
{
    public class CompetitionKoiDTO
    {
        [Key]
        public string CompetitionId { get; init; }

        public string CompetitionName { get; init; }

        public string? CompetitionDescription { get; init; }

        public DateTime? StartTime { get; init; }

        public DateTime? EndTime { get; init; }

        public bool? StatusCompetition { get; init; } 

        public string? Round { get; init; }
        public string? category_id { get; set; }
        public string? koi_id { get; set; }
        public string? referee_id { get; set; }
        public string? award_id { get; set; }

        public KoiCategoryDTO? KoiCategory { get; init; }

        public KoiFishDTO? KoiFish { get; init; }

        public RefereeDTO? Referee { get; init; }

        public AwardDTO? Award { get; init; } 

        public string? CompetitionImg { get; init; } 
    }
}
