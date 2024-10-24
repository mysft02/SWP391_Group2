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

        public string? StatusCompetition { get; init; }

        public string? Round { get; init; }
        public string? category_id { get; set; }
        public string? koi_id { get; set; }
        public string? referee_id { get; set; }
        public string? award_id { get; set; }

        public KoiCategoryDTO? KoiCategory { get; set; }

        public KoiFishDTO? KoiFish { get; set; }

        public RefereeDTO? Referee { get; set; }

        public AwardDTO? Award { get; set; }

        public string? CompetitionImg { get; set; }
    }
}
