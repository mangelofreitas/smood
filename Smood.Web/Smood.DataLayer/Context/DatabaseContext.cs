using Microsoft.EntityFrameworkCore;
using Smood.DataLayer.Models;

namespace Smood.DataLayer.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<SmoodEvent> Events { get; set; }
        public DbSet<EventPhoto> EventPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
