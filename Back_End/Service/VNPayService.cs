using DTO.VNPay;
using Infrastructure.VNPay;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;

namespace Service.VNPayService;

public interface IVNPayService
{
    public Task<IActionResult> HandleCreateVNPayUrl(HttpContext context, VnPayRequestDTO vnPayRequestDTO);
    public Task<IActionResult> HandleVNPay(IQueryCollection collection);
}


public class VnPayService : ControllerBase, IVNPayService
{
    private readonly VNPayRepo _vnPayRepo;
    private readonly string? _vnpVersion;
    private readonly string? _vnpCommand;
    private readonly string? _vnpTmnCode;
    private readonly string? _vnpCurrCode;
    private readonly string? _vnpLocale;
    private readonly string? _vnpBaseUrl;
    private readonly string? _vnpHashSecret;

    public VnPayService(IConfiguration config)
    {
        _vnPayRepo = new VNPayRepo();
        _vnpVersion = config["VNPay:Version"];
        _vnpCommand = config["VNPay:Command"];
        _vnpTmnCode = config["VNPay:TmnCode"];
        _vnpCurrCode = config["VNPay:CurrCode"];
        _vnpLocale = config["VNPay:Locale"];
        _vnpBaseUrl = config["VNPay:BaseUrl"];
        _vnpHashSecret = config["VNPay:HashSecret"];
    }

    public async Task<IActionResult> HandleCreateVNPayUrl(HttpContext context, VnPayRequestDTO vnPayRequestDTO)
    {
        try
        {
            var tick = DateTime.Now.Ticks.ToString();

            var vnpReturnUrl = $"{context.Request.Scheme}://{context.Request.Host}/api/VNPayController/ProcessVNPay?userId={vnPayRequestDTO.UserId}"; ; 

            _vnPayRepo.AddRequestData("vnp_Version", _vnpVersion);
            _vnPayRepo.AddRequestData("vnp_Command", _vnpCommand);
            _vnPayRepo.AddRequestData("vnp_TmnCode", _vnpTmnCode);
            _vnPayRepo.AddRequestData("vnp_Amount", (vnPayRequestDTO.Amount * 100).ToString());
            _vnPayRepo.AddRequestData("vnp_CreateDate", vnPayRequestDTO.CreatedDate.ToString("yyyyMMddHHmmss"));
            _vnPayRepo.AddRequestData("vnp_CurrCode", _vnpCurrCode);
            _vnPayRepo.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            _vnPayRepo.AddRequestData("vnp_Locale", _vnpLocale);
            _vnPayRepo.AddRequestData("vnp_OrderInfo", "Thanh toan don hang:" + vnPayRequestDTO.KoiId);
            _vnPayRepo.AddRequestData("vnp_OrderType", "other"); //default value: other
            _vnPayRepo.AddRequestData("vnp_ReturnUrl", vnpReturnUrl);
            _vnPayRepo.AddRequestData("vnp_TxnRef", vnPayRequestDTO.KoiId);

            var paymentUrl = _vnPayRepo.CreateRequestUrl(_vnpBaseUrl, _vnpHashSecret);

            return Ok(paymentUrl);

        }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }
    public async Task<IActionResult> HandleVNPay(IQueryCollection collection)
    {
        try
        {
            var result = new VnPayResponseDTO();
            foreach( var (key, value) in collection)
            {
                if(!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    _vnPayRepo.AddResponseData(key, value.ToString());
                }
                var vnp_SecureHash = collection.FirstOrDefault(r => r.Key == "vnp_SecureHash").Value;

                bool checkSignature = _vnPayRepo.ValidateSignature(vnp_SecureHash, _vnpHashSecret);
                if (!checkSignature) 
                {
                    result.Success = false;
                    result.OrderId = _vnPayRepo.GetResponseData("vnp_TxnRef");
                }
                return Ok(new VnPayResponseDTO
                {
                    Success = true,
                    PaymentMethod = "VNPay",
                    OrderDescription = _vnPayRepo.GetResponseData("vnp_OrderInfo"),
                    OrderId = _vnPayRepo.GetResponseData("vnp_TxnRef"),
                    TransactionId = _vnPayRepo.GetResponseData("vnp_TransactionNo"),
                    Token = vnp_SecureHash,
                    VnPayResponseCode = _vnPayRepo.GetResponseData("vnp_ResponseCode"),
                });
            }
            return Ok(result);
        }
        catch (Exception ex) { return BadRequest(ex.Message); }
    }
}



