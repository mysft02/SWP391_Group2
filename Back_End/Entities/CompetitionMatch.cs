﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace KoiBet.Entities
{
    public class CompetitionMatch
    {
        [Key]
        public string match_id { get; set; } = string.Empty;

        public string first_koi { get; set; } = string.Empty;

        [ForeignKey("CompetitionRound")]
        public string round_id { get; set; } = string.Empty;

        public string second_koi { get; set; } = string.Empty;

        public string result { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual CompetitionRound Round { get; set; }

        public ICollection<KoiScore> Scores { get; set; }
    }
}
