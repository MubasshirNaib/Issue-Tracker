using Microsoft.EntityFrameworkCore;

namespace CRUDWebAPI.Models
{
    public class AppDbContext : DbContext
    {
       
        public AppDbContext(DbContextOptions options): base(options)
        {
                
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<User>()
        //        .HasOne(u => u.UserProfile)
        //        .WithOne(up => up.User)
        //        .HasForeignKey<UserProfile>(up => up.UserId);

        //    base.OnModelCreating(modelBuilder);
        //}


    }
}
