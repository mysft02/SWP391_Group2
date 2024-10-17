using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace KoiBet.Entities
{
    public class Referee
    {
        [Key]
        public string referee_id { get; set; }

        [Column("referee_name")]
        public string referee_name { get; set; } = string.Empty;

        [Column("exp_judge")]
        public string exp_judge { get; set; } = string.Empty;

        [Required]
        [Column("users_id")]
        [ForeignKey(nameof(users_id))]
        public string users_id { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual Users User { get; set; }

        public ICollection<CompetitionKoi> Competitions { get; set; } = new List<CompetitionKoi>();
        public virtual ICollection<KoiScore> Scores { get; set; } = new List<KoiScore>();
    }
}