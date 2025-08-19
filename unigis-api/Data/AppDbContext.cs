using Microsoft.EntityFrameworkCore;
using Unigis.Api.Models;

namespace Unigis.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<PuntoVenta> PuntosVenta => Set<PuntoVenta>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        base.OnModelCreating(mb);

        // Datos semilla:
        mb.Entity<PuntoVenta>().HasData(
            new PuntoVenta { Id = 1, Latitud = 19.432608M, Longitud = -99.133209M, Descripcion = "Sucursal Centro", Venta = 12000, Zona = "Centro" },
            new PuntoVenta { Id = 2, Latitud = 19.36M, Longitud = -99.18M, Descripcion = "Sucursal Sur", Venta = 8000, Zona = "Sur" },
            new PuntoVenta { Id = 3, Latitud = 19.50M, Longitud = -99.10M, Descripcion = "Sucursal Norte", Venta = 15000, Zona = "Norte" }
        );
    }
}
