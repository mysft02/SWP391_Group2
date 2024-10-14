namespace KoiBet.DTO.Bet
{
    public class CreateBetDTO
    {
        public string UserId { get; set; }
        public string KoiFishId { get; set; }
        public decimal Amount { get; set; }
    }
}
