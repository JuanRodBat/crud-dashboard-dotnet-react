using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Unigis.Api.Data;
using Unigis.Api.Models;

namespace Unigis.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PuntosController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? zona, [FromQuery] string? q)
    {
        var query = db.PuntosVenta.AsQueryable();
        if (!string.IsNullOrWhiteSpace(zona)) query = query.Where(p => p.Zona == zona);
        if (!string.IsNullOrWhiteSpace(q)) query = query.Where(p => p.Descripcion.Contains(q));
        var list = await query.OrderBy(p => p.Id).ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id) =>
        await db.PuntosVenta.FindAsync(id) is { } pv ? Ok(pv) : NotFound();

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PuntoVenta pv)
    {
        db.Add(pv);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = pv.Id }, pv);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] PuntoVenta pv)
    {
        if (id != pv.Id) return BadRequest();
        db.Entry(pv).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var pv = await db.PuntosVenta.FindAsync(id);
        if (pv is null) return NotFound();
        db.Remove(pv);
        await db.SaveChangesAsync();
        return NoContent();
    }

    // Agregado para el gráfico de torta
    [HttpGet("ventas-por-zona")]
    public async Task<IActionResult> VentasPorZona()
    {
        var data = await db.PuntosVenta
            .GroupBy(p => p.Zona)
            .Select(g => new { zona = g.Key, totalVenta = g.Sum(x => x.Venta) })
            .ToListAsync();

        return Ok(data);
    }
}
