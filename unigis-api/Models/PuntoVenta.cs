using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Unigis.Api.Models;

public class PuntoVenta
{
    public int Id { get; set; }

    [Column(TypeName = "decimal(9,6)")]
    public decimal Latitud { get; set; }

    [Column(TypeName = "decimal(9,6)")]
    public decimal Longitud { get; set; }

    [Required, MaxLength(120)]
    public string Descripcion { get; set; } = "";

    [Column(TypeName = "decimal(18,2)")]
    public decimal Venta { get; set; }

    [Required, MaxLength(60)]
    public string Zona { get; set; } = "";
}
