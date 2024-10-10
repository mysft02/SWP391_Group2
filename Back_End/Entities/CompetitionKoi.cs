using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KoiBet.Entities
{
    public class CompetitionKoi
    {
        [Key]
        public string competition_id { get; set; }

        public string competition_name { get; set; }

        public string competition_description {  get; set; }

        public DateTime start_time { get; set; }

        public DateTime end_time { get; set; }

        public string status_competition {  get; set; }

        public string round {  get; set; }

        [ForeignKey(nameof(KoiCategory))]
        public virtual KoiCategory category_id { get; set; }

        [ForeignKey(nameof(FishKoi))]
        public virtual FishKoi koi_id { get; set; }

        [ForeignKey(nameof(Referee))]
        public virtual Referee referee_id { get; set; }
        
        [ForeignKey(nameof(Award))]
        public virtual Award award_id { get; set; }

    }
}
