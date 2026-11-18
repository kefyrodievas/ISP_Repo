
using System.Net.Http.Json;
using MockShippingService.Models;

namespace MockShippingService.Services;

public class ShippingNotificationService
{
    private readonly HttpClient httpClient;
    private readonly string apiUrl;
    private readonly string apiKey;

    public ShippingNotificationService(
        HttpClient httpClient,
        string apiUrl,
        string apiKey)
    {
        this.httpClient = httpClient;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    public async Task<HttpResponseMessage> SiųstiPranešimą(
        ShippingStatusNotification notification)
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);

        request.Headers.Add("X-Api-Key", apiKey);
        request.Content = JsonContent.Create(notification);

        return await httpClient.SendAsync(request);
    }
}
