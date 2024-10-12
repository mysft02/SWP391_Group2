namespace KoiBet.DTO.KoiCategory
{
    public class CreateKoiCategoryDTO
    {
        public string? category_name { get; set; } // Required: Name of the category

        public string? standard_id { get; set; } // Required: Linked Koi Standard ID

        public string? koi_id { get; set; } // Required: Linked Koi Fish ID
    }
}
