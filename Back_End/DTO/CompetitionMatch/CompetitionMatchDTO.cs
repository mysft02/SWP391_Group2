using KoiBet.DTO.CompetitionRound;

namespace KoiBet.DTO.CompetitionMatch
{
    public class CompetitionMatchDTO
    {
        public string MatchId { get; set; }
        public string FirstKoi { get; set; }
        public string RoundId { get; set; }
        public string SecondKoi { get; set; }
        public string Result { get; set; }

        public CompetitionRoundDTO Round { get; set; }
    }

    public class CreateCompetitionMatchDTO
    {
        public string FirstKoi { get; set; }
        public string RoundId { get; set; }
        public string SecondKoi { get; set; }
        public string Result { get; set; }
    }

    public class UpdateCompetitionMatchDTO
    {
        public string MatchId { get; set; }
        public string FirstKoi { get; set; }
        public string RoundId { get; set; }
        public string SecondKoi { get; set; }
        public string Result { get; set; }
    }
}
