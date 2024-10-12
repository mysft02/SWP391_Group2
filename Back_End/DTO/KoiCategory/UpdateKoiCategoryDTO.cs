namespace KoiBet.DTO.KoiCategory
{
    public class UpdateKoiCategoryDTO
    {
        public string? category_id { get; set; } // Required: ID of the category to update

        public string? category_name { get; set; } // Optional: New name of the category

        public string? standard_id { get; set; } // Optional: Updated Koi Standard ID

        public string? koi_id { get; set; } // Optional: Updated Koi Fish ID
    }
}
