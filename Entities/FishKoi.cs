using System.ComponentModel.DataAnnotations;

namespace KoiBet.Entities
{
    public class FishKoi
    {
        [Key]
        public string koi_id { get; set; }

        public string koi_name { get; set; }

        public string koi_variety { get; set; }

        public string koi_size { get; set; }

        public string koi_age { get; set; } 

        public virtual Users user_id { get; set; }
    }
}
