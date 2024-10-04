﻿using KoiBet.Entities;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Text.Json.Serialization;

namespace KoiBet.Entities;

public class Users
{
    [Key]
    [Column("users_id")]
    public string user_id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string full_name { get; set; } = string.Empty;

    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Phone]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string role_id { get; set; } = string.Empty;

    public decimal Balance { get; set; } = 0;

    public Users() { }

    public Users(string username, string password, string email)
    {
        Username = username;
        Password = password;
        Email = email;
    }

    public Users(string user_id, string username, string password, string full_name, string email, string phone, string role_id, decimal balance, Roles role) : this(user_id, username, password)
    {
        this.full_name = full_name;
        Email = email;
        Phone = phone;
        this.role_id = role_id;
        Balance = balance;
        Role = role;
    }

    [JsonIgnore]
    public virtual Roles Role { get; set; }
}