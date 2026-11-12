
namespace PCBuilder.Models;

public class ShippingStatusNotification
{
    public string EventId { get; set; } = string.Empty;
    public string ShipmentCode { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}
