namespace Service.JwtService;

using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using Service.Payload;
using System.Collections.Generic;
using System.Linq;

public class JwtService
{
    private readonly string _secret;
    private readonly string _expDate;
    private readonly byte[] _key;
    private readonly JwtSecurityTokenHandler _handler;

    public JwtService(IConfiguration config)
    {
        _secret = config.GetSection("JwtConfig").GetSection("secret").Value;
        _expDate = config.GetSection("JwtConfig").GetSection("expirationInMinutes").Value;
    }

    public string GenerateSecurityToken(string email, Guid userId, bool isAdmin)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
             {
                new ("email", email),
                new ("isAdmin", isAdmin.ToString()),
                 }),
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = "Koibet",
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);

    }

    //public Payload? ValidateToken(string token)
    //{

    //    _handler.ValidateToken(token, new TokenValidationParameters
    //    {
    //        ValidateIssuerSigningKey = true,
    //        IssuerSigningKey = new SymmetricSecurityKey(_key),
    //        ValidateIssuer = false,
    //        ValidateAudience = false,
    //        // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
    //        ClockSkew = TimeSpan.Zero
    //    }, out SecurityToken validatedToken);

    //    var result = (JwtSecurityToken)validatedToken;

    //    var payload = new Payload()
    //    {
    //        UserId = Guid.Parse(result.Issuer),
    //        IsSuperAdmin = bool.Parse(result.Claims.First(x => x.Type == "isSuperAdmin").Value)
    //    };

    //    return payload;
    //}

    public string CreateNewGuid()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new System.Random(); // Define the random instance here
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < 20; i++)
        {
            result.Append(chars[random.Next(chars.Length)]);
        }

        return result.ToString();
    }
}