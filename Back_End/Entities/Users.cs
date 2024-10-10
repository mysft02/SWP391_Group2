using KoiBet.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class Users
{
    [Key]
    [Column("users_id")]
    public string user_id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string full_name { get; set; } = string.Empty;

    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Phone]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [Column("role_id")]
    public string role_id { get; set; } = string.Empty;

    [Column("balance")]
    public double Balance { get; set; } = 0.0;

    [JsonIgnore]
    public virtual Roles Role { get; set; }

    [JsonIgnore]
    public virtual List<FishKoi> FishKoi { get; set; }
}
