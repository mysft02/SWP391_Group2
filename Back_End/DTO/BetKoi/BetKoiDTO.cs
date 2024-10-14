using KoiBet.DTO.User;
using KoiBet.DTO.Competition;
using KoiBet.DTO.KoiRegistration;
using KoiBet.Entities;

namespace KoiBet.DTO.BetKoi
{
    public class BetKoiDTO
    {
        public string BetId { get; set; }

        public UserDTO? User { get; set; } 

        public KoiRegistrationDTO? KoiRegistration { get; set; } 

        public CompetitionKoi? CompetitionKoi { get; set; } 
    }
}
