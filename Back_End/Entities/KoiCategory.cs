using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KoiBet.Entities
{
    public class KoiCategory
    {
        [Key]
        public string category_id { get; set; }

        public string category_name { get; set; }

        [Required]
        [Column("standard_id")]
        public string standard_id { get; set; }

        [JsonIgnore]
        public virtual KoiStandard koi_standard { get; set; }
    }
}