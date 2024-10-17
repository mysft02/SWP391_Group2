﻿namespace DTO.VNPay;

public class VnPayResponseDTO
{
    public bool Success { get; set; }
    public string PaymentMethod { get; set; }
    public string OrderDescription { get; set; }
    public string OrderId { get; set; }
    public string PaymentId { get; set; }
    public string TransactionId { get; set; }
    public string Token { get; set; }
    public string VnPayResponseCode { get; set; }
}

public class VnPayRequestDTO
{
    public string UserId { get; set; }
    public string Description {  get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedDate { get; set; }
    public string KoiId { get; set; }
}

