namespace KoiBet.Middleware;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Service.JwtService;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using System;
using KoiBet.DTO.User;
using KoiBet.Data;
using Microsoft.AspNetCore.Authorization;
using KoiBet.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BCrypt.Net;

// Middleware to protect routes
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
public class ProtectedAttribute : Attribute, IAuthorizationFilter
{
    private readonly JwtService _jwtService;

    public ProtectedAttribute()
    {
        _jwtService = new JwtService();
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var authHeader = context.HttpContext.Request.Headers["Authorization"].ToString();

        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Result = Unauthorized("No token provided!");
            return;
        }

        var token = authHeader.Substring("Bearer ".Length);

        try
        {
            var payload = _jwtService.ValidateToken(token);

            // add payload to context
            context.HttpContext.Items["payload"] = payload;
        }
        catch (Exception e)
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Result = Unauthorized(e.Message);
            return;
        }
    }

    private IActionResult? Unauthorized(string v)
    {
        throw new NotImplementedException();
    }
}
