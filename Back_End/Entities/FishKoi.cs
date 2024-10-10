using System.ComponentModel.DataAnnotations;
using KoiBet.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KoiBet.Entities
{
    public class FishKoi
    {
        [Key]
        public string koi_id { get; set; } = string.Empty;

        [Column("koi_name")]
        public string koi_name { get; set; } = string.Empty;

        [Column("koi_variety")]
        public string koi_variety { get; set; } = string.Empty;

        [Column("koi_size")]
        public string koi_size { get; set; } = string.Empty;

        [Column("koi_age")]
        public string koi_age { get; set; } = string.Empty;

        [Required]
        [Column("users_id")]
        public string users_id { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual Users user { get; set; }
    }
}
