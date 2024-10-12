namespace KoiBet.DTO.Competition
{
    public class CreateCompetitionDTO
    {
        public string CompetitionName { get; init; }

        public string? CompetitionDescription { get; init; }

        public DateTime StartTime { get; init; }

        public DateTime EndTime { get; init; }

        public bool StatusCompetition { get; init; } 

        public string? Round { get; init; }

        public string KoiCategoryId { get; init; }

        public string KoiFishId { get; init; }

        public string RefereeId { get; init; }

        public string AwardId { get; init; }

        public string? CompetitionImg { get; init; }
    }
}
