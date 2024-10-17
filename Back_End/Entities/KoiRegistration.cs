﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KoiBet.Entities
{
    public class KoiRegistration
    {
        [Key]
        [Column("registration_id")]
        [MaxLength(50)]
        public string RegistrationId { get; set; } = string.Empty;

        [Column("koi_id")]
        [MaxLength(50)]
        public string koi_id { get; set; } = string.Empty;

        [Column("competition_id")]
        [MaxLength(50)]
        public string competition_id { get; set; } = string.Empty;

        [Column("status_registration")]
        public bool StatusRegistration { get; set; }

        [Column("category_id")] 
        [MaxLength(50)]
        public string CategoryId { get; set; } = string.Empty;

        [Column("slot_registration")]
        public int SlotRegistration { get; set; }

        [Column("start_dates")]
        public DateTime? StartDates { get; set; }

        [Column("end_dates")]
        public DateTime? EndDates { get; set; }

        [Column("registration_fee")]
        [DataType(DataType.Currency)]
        public decimal RegistrationFee { get; set; }

        [ForeignKey("KoiId")]
        public virtual FishKoi FishKoi { get; set; }

        [ForeignKey("CompetitionId")]
        public virtual CompetitionKoi CompetitionKoi { get; set; }

        [ForeignKey("CategoryId")]
        public virtual KoiCategory KoiCategory { get; set; }

        public virtual ICollection<BetKoi> Bets { get; set; } = new List<BetKoi>();
    }
}
