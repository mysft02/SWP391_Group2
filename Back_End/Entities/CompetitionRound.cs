using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KoiBet.Entities
{
    public class CompetitionRound
    {
        [Key]
        [Column("round_id")]
        [MaxLength(50)]
        public string RoundId { get; set; } = string.Empty;

        [Column("match")]
        public int Match { get; set; }

        [Column("competition_id")]
        [MaxLength(50)]
        public string CompetitionId { get; set; } = string.Empty;

        // Navigation property
        [ForeignKey("CompetitionId")]
        public virtual CompetitionKoi CompetitionKoi { get; set; }
    }
}
