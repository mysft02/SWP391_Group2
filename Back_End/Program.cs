using KoiBet.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Service.JwtService;
using Service.AuthService;
using Service.KoiFishService;
using Middleware.Authentication;
using Service.KoiStandardService;

var builder = WebApplication.CreateBuilder(args);

// Thêm dịch vụ cho Controllers
builder.Services.AddControllers();

// Thêm DbContext sử dụng SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBCS")));

builder.Services.AddControllers();
builder.Services.AddAuthentication("Bearer").AddBearerToken();

// Cấu hình CORS để cho phép tất cả nguồn gốc (không yêu cầu bảo mật chặt chẽ trong development)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddTokenAuthentication(builder.Configuration);

// Thêm hỗ trợ cho Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Koi Bet", Version = "V1" });

    // Require the bearer token for all API operations
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
      {
          new OpenApiSecurityScheme
          {
              Reference = new OpenApiReference
              {
                  Type = ReferenceType.SecurityScheme,
                  Id = "Bearer"
              }
          },
          new string[] {}
      }
    });
});

builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IKoiFishService, KoiFishService>();
builder.Services.AddScoped<IKoiStandardService, KoiStandardService>();

var app = builder.Build();

// Cấu hình pipeline HTTP request
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "KoiBet API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();

// Kích hoạt CORS (sử dụng chính sách đã cấu hình)
app.UseCors("AllowAllOrigins");

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.MapControllers();
app.Run();

