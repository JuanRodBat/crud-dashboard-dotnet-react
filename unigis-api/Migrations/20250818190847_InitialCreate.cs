using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Unigis.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PuntosVenta",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitud = table.Column<decimal>(type: "decimal(9,6)", nullable: false),
                    Longitud = table.Column<decimal>(type: "decimal(9,6)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    Venta = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Zona = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PuntosVenta", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "PuntosVenta",
                columns: new[] { "Id", "Descripcion", "Latitud", "Longitud", "Venta", "Zona" },
                values: new object[,]
                {
                    { 1, "Sucursal Centro", 19.432608m, -99.133209m, 12000m, "Centro" },
                    { 2, "Sucursal Sur", 19.36m, -99.18m, 8000m, "Sur" },
                    { 3, "Sucursal Norte", 19.50m, -99.10m, 15000m, "Norte" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PuntosVenta");
        }
    }
}
