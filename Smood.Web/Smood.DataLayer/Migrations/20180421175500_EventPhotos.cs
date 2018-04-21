using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Smood.DataLayer.Migrations
{
    public partial class EventPhotos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventPhotos",
                columns: table => new
                {
                    EventPhotoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EventId = table.Column<int>(nullable: false),
                    FileName = table.Column<string>(nullable: true),
                    FilePath = table.Column<string>(nullable: true),
                    FileType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventPhotos", x => x.EventPhotoId);
                    table.ForeignKey(
                        name: "FK_EventPhotos_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventPhotos_EventId",
                table: "EventPhotos",
                column: "EventId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventPhotos");
        }
    }
}
