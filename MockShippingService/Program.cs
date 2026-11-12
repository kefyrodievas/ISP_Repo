
using MockShippingService.Models;
using MockShippingService.Services;

const string apiUrl = "http://localhost:5197/api/orders/shipping/status";
const string apiKey = "mock-shipping-secret";

using var httpClient = new HttpClient();

var shippingService = new ShippingNotificationService(
    httpClient,
    apiUrl,
    apiKey
);

while (true)
{
    Console.WriteLine();
    Console.WriteLine("========== MOCK SHIPPING SERVICE ==========");
    Console.WriteLine("1. Pristatyti siuntą");
    Console.WriteLine("2. Atšaukti siuntą");
    Console.WriteLine("0. Išeiti");
    Console.Write("Pasirinkimas: ");

    string? pasirinkimas = Console.ReadLine();

    if (pasirinkimas == "0")
    {
        break;
    }

    string? status = pasirinkimas switch
    {
        "1" => "Delivered",
        "2" => "Cancelled",
        _ => null
    };

    if (status == null)
    {
        Console.WriteLine("Neteisingas pasirinkimas.");
        continue;
    }

    Console.Write("Siuntos kodas: ");
    string? shipmentCode = Console.ReadLine();

    if (string.IsNullOrWhiteSpace(shipmentCode))
    {
        Console.WriteLine("Siuntos kodas negali būti tuščias.");
        continue;
    }

    var notification = new ShippingStatusNotification
    {
        EventId = Guid.NewGuid().ToString(),
        ShipmentCode = shipmentCode.Trim(),
        Status = status,
        Timestamp = DateTime.UtcNow
    };

    try
    {
        Console.WriteLine();
        Console.WriteLine("Siunčiamas pranešimas...");

        using HttpResponseMessage response =
            await shippingService.SendMessage(notification);

        Console.WriteLine(
            $"Galutinis URL: {response.RequestMessage?.RequestUri}"
        );

        string responseContent =
            await response.Content.ReadAsStringAsync();

        Console.WriteLine(
            $"HTTP atsakymas: {(int)response.StatusCode} {response.StatusCode}"
        );

        Console.WriteLine(responseContent);
    }
    catch (HttpRequestException exception)
    {
        Console.WriteLine("Nepavyko susisiekti su PC Builder API.");
        Console.WriteLine(exception.Message);
    }
}
