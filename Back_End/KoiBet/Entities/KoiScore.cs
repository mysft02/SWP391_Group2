using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KoiBet.Entities
{
    public class KoiScore
    {
        [Key]
        [Column("score_id")]
        [MaxLength(50)]
        public string ScoreId { get; set; } = string.Empty;

        [Column("koi_id")]
        [MaxLength(50)]
        public string KoiId { get; set; } = string.Empty;

        [Column("referee_id")]
        [MaxLength(50)]
        public string RefereeId { get; set; } = string.Empty;

        [Column("match_id")]
        [MaxLength(50)]
        public string MatchId { get; set; } = string.Empty;

        [Column("score_koi")]
        [DataType(DataType.Currency)]
        public decimal ScoreKoi { get; set; }

        // Navigation properties
        [ForeignKey("KoiId")]
        public virtual FishKoi FishKoi { get; set; }

        [ForeignKey("RefereeId")]
        public virtual Referee Referee { get; set; }

        [ForeignKey("MatchId")]
        public virtual CompetitionMatch CompetitionMatch { get; set; }
    }
}
