using System.ComponentModel.DataAnnotations;
using KoiBet.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KoiBet.Entities
{
    public class BetKoi
    {
        [Key]
        public string bet_id { get; set; } = string.Empty;

        [Required]
        [Column("users_id")]
        public string users_id { get; set; } = string.Empty;

        [Required]
        [Column("registraion_id")]
        public string registration_id { get; set; } = string.Empty;

        [Required]
        [Column("competition_id")]
        public string competition_id { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual Users user { get; set; }

        [JsonIgnore]
        public virtual KoiRegistration koiRegistration { get; set; }

        [JsonIgnore]
        public virtual CompetitionKoi competitionKoi { get; set; }
    }
}
