
using Microsoft.AspNetCore.Mvc;
using PCBuilder.Models;
using System.Collections.Concurrent;
using System.Text.Json;

namespace PCBuilder.Controllers;

[ApiController]
[Route("/api/orders")]
public class OrdersController : ControllerBase
{
    private const string ApiKey = "mock-shipping-secret";

    private static readonly ConcurrentDictionary<string, JsonElement> Orders = new();

    [HttpPost("sync")]
    public IActionResult SyncOrders([FromBody] List<JsonElement> orders)
    {
        foreach (var order in orders)
        {
            if (!order.TryGetProperty("id", out var id))
            {
                continue;
            }

            string orderId = id.ToString();

            if (!string.IsNullOrWhiteSpace(orderId))
            {
                Orders[orderId] = order.Clone();
            }
        }

        return Ok(new
        {
            success = true,
            count = Orders.Count
        });
    }

    [HttpGet]
    public IActionResult GetOrders()
    {
        return Ok(Orders.Values);
    }

    [HttpPost("shipping/status")]
    public IActionResult UpdateShippingStatus(
        [FromHeader(Name = "X-Api-Key")] string? apiKey,
        [FromBody] ShippingStatusNotification notification)
    {
        if (apiKey != ApiKey)
        {
            return Unauthorized(new
            {
                success = false,
                message = "Invalid API key."
            });
        }

        if (string.IsNullOrWhiteSpace(notification.EventId) ||
            string.IsNullOrWhiteSpace(notification.ShipmentCode))
        {
            return BadRequest(new
            {
                success = false,
                message = "Invalid notification data."
            });
        }

        if (notification.Status != "Delivered" &&
            notification.Status != "Cancelled")
        {
            return BadRequest(new
            {
                success = false,
                message = "Unsupported shipping status."
            });
        }

        string? orderId = null;
        JsonElement orderElement = default;

        foreach (var entry in Orders)
        {
            if (entry.Value.TryGetProperty("shipmentCode", out var code) &&
                code.ValueKind == JsonValueKind.String &&
                code.GetString() == notification.ShipmentCode)
            {
                orderId = entry.Key;
                orderElement = entry.Value;
                break;
            }
        }

        if (orderId == null)
        {
            return NotFound(new
            {
                success = false,
                message = $"Shipment code '{notification.ShipmentCode}' was not found."
            });
        }

        var order = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(
            orderElement.GetRawText()
        );

        if (order == null)
        {
            return BadRequest(new
            {
                success = false,
                message = "Order data is invalid."
            });
        }

        string newStatus = notification.Status == "Delivered"
            ? "Pristatytas"
            : "Atšauktas";

        order["status"] = JsonSerializer.SerializeToElement(newStatus);

        if (notification.Status == "Delivered")
        {
            order["deliveryDate"] = JsonSerializer.SerializeToElement(
                DateTime.Now.ToString("yyyy-MM-dd")
            );
        }

        Orders[orderId] = JsonSerializer.SerializeToElement(order);

        return Ok(new
        {
            success = true,
            message = "Order status updated.",
            shipmentCode = notification.ShipmentCode,
            status = newStatus
        });
    }
}
