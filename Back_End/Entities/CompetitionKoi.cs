﻿    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    namespace KoiBet.Entities
    {
        public class CompetitionKoi
        {
            [Key]
            public string competition_id { get; set; }

            public string competition_name { get; set; }

            public string competition_description { get; set; }

            public DateTime start_time { get; set; }

            public DateTime end_time { get; set; }

            public bool? status_competition { get; set; }

            [Required]
            [Column("category_id")]
            public string category_id { get; set; }

            [Required]
            [Column("koi_id")]
            public string koi_id { get; set; }

            [Required]
            [Column("referee_id")]
            public string referee_id { get; set; }

            [Required]
            [Column("award_id")]
            public string award_id { get; set; }

            [JsonPropertyName("rounds")]
            public string rounds { get; set; }

            public string competition_img { get; set; }

            [JsonIgnore]
            public virtual KoiCategory Category { get; set; }

            [JsonIgnore]
            public virtual FishKoi Koi { get; set; }

            [JsonIgnore]
            public virtual Referee Referee { get; set; }

            [JsonIgnore]
            public virtual Award Award { get; set; }

            public virtual ICollection<KoiRegistration> KoiRegistrations { get; set; }
            public virtual ICollection<BetKoi> Bets { get; set; }
        }
    }
