using System.ComponentModel.DataAnnotations;

namespace KoiBet.Entities
{
    public class Award
    {
        [Key]
        public string award_id {get; set; }

        public string award_name {get; set; }

        public int quantity {get; set; }

        public ICollection<CompetitionKoi> Competitions { get; set; }
    }
}
