using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KoiBet.Entities
{
    public class Transactions
    {
        [Key]
        public int transactions_id { get; set; }

        [Required]
        public int users_id { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime transactions_time { get; set; }

        // Foreign key to the User table
        [ForeignKey("users_id")]
        public virtual Users User { get; set; }

    }
}