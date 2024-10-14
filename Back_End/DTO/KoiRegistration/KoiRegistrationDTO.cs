using KoiBet.DTO.KoiCategory;
using KoiBet.Entities;

namespace KoiBet.DTO.KoiRegistration
{
    public class KoiRegistrationDTO
    {
        public string RegistrationId { get; set; }

        public string KoiId { get; set; }

        public FishKoi? FishKoi { get; set; }

        public string CompetitionId { get; set; }

        public CompetitionKoi? CompetitionKoi { get; set; }

        public KoiCategoryDTO KoiCategory { get; set; }

        public bool StatusRegistration { get; set; }

        public string CategoryId { get; set; }

        public int SlotRegistration { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public decimal RegistrationFee { get; set; }
    }
}
