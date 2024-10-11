using DTO.KoiFish;
using KoiBet.DTO.KoiStandard;
using KoiBet.Entities;

namespace KoiBet.DTO.KoiCategory
{
    public class KoiCategoryDTO
    {
        public string? category_id {  get; set; }

        public string? category_name { get; set; }

        public string? standard_id { get; set; }

        public KoiStandardDTO Standard { get; set; }

        public string? koi_id { get; set; }
        public KoiFishDTO Koi { get; set; }

    }
}
