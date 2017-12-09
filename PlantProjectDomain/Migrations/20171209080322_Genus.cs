using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace PlantProjectDomain.Migrations
{
    public partial class Genus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Familias_FamiliaId",
                table: "Plants");

            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Phylums_PhylumId",
                table: "Plants");

            migrationBuilder.DropTable(
                name: "Familias");

            migrationBuilder.DropTable(
                name: "Phylums");

            migrationBuilder.DropIndex(
                name: "IX_Plants_FamiliaId",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "FamiliaId",
                table: "Plants");

            migrationBuilder.RenameColumn(
                name: "PhylumId",
                table: "Plants",
                newName: "GenusId");

            migrationBuilder.RenameIndex(
                name: "IX_Plants_PhylumId",
                table: "Plants",
                newName: "IX_Plants_GenusId");

            migrationBuilder.CreateTable(
                name: "Genus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genus", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Genus_GenusId",
                table: "Plants",
                column: "GenusId",
                principalTable: "Genus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Genus_GenusId",
                table: "Plants");

            migrationBuilder.DropTable(
                name: "Genus");

            migrationBuilder.RenameColumn(
                name: "GenusId",
                table: "Plants",
                newName: "PhylumId");

            migrationBuilder.RenameIndex(
                name: "IX_Plants_GenusId",
                table: "Plants",
                newName: "IX_Plants_PhylumId");

            migrationBuilder.AddColumn<int>(
                name: "FamiliaId",
                table: "Plants",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Familias",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Familias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Phylums",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phylums", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Plants_FamiliaId",
                table: "Plants",
                column: "FamiliaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Familias_FamiliaId",
                table: "Plants",
                column: "FamiliaId",
                principalTable: "Familias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Phylums_PhylumId",
                table: "Plants",
                column: "PhylumId",
                principalTable: "Phylums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
