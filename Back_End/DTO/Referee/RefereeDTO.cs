using KoiBet.DTO.User;

namespace KoiBet.DTO.Referee
{
    public class RefereeDTO
    {
        public string referee_id { get; set; }

        public string referee_name { get; set; }

        public string exp_judge {  get; set; }

        public string? Username { get; set; }

        public UserDTO User {get; set; }
    }

    public class CreatRefereeDTO
    {
        private string referee_id { get; set; }

        public string referee_name { get; set; }

        public string exp_judge { get; set; }

        private string? Username { get; set; }

        public UserDTO User { get; set; }
    }

    public class UpdateRefereeDTO { 
        private string referee_id { get; set;  }

        public string referee_name { get; set; }

        public string exp_judge { get; set; }

        public string? Username { get; set;}

        public UserDTO User { get; set; }
    }

}
