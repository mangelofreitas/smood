using Smood.DataLayer.Models;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

//using Microsoft.EntityFrameworkCore.Tools.DotNet;

namespace Smood.DataLayer.Context
{
    public static class DatabaseInitializer
    {
        public static void Initialize(DatabaseContext context)
        {
            context.Database.Migrate();

            SeedEvents(context);

            context.SaveChanges();
        }

        public static void SeedEvents(DatabaseContext context)
        {
            if (context.Events.Count() == 0)
            {
                context.Events.Add(new SmoodEvent
                {
                    Name = "Shift Appens",
                    StartDate = new DateTime(2018, 04, 20),
                    EndDate = new DateTime(2018, 04, 22, 23, 59, 59),
                    Description = "Random event",
                    Location = "Coimbra"
                });
            }
        }
    }
}
