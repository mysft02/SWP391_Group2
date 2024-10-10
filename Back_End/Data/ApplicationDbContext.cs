using KoiBet.Entities;  
using Microsoft.EntityFrameworkCore;

namespace KoiBet.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { 
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<FishKoi> FishKoi { get; set; }
        public DbSet<KoiStandard> KoiStandards { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var decimalProps = modelBuilder.Model
                .GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(p => (System.Nullable.GetUnderlyingType(p.ClrType) ?? p.ClrType) == typeof(decimal));

            foreach (var property in decimalProps)
            {
                property.SetPrecision(10);
                property.SetScale(2);
            }

            modelBuilder.Entity<Users>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.role_id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FishKoi>()
                .HasOne(u => u.user)
                .WithMany(r => r.FishKoi)
                .HasForeignKey(u => u.users_id);
        }
    }
}
