using KoiBet.DTO.User;

namespace KoiBet.DTO.Referee
{
    public class RefereeDTO
    {
        public string referee_id { get; set; }

        public string referee_name { get; set; }

        public string exp_judge {  get; set; }

        public string? user_id { get; set; }

        public UserDTO User {get; set; }
    }
}
