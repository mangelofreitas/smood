using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Smood.DataLayer.Models
{
    public class EventPhoto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EventPhotoId { get; set; }

        public int EventId { get; set; }

        public string FileType { get; set; }

        public string FileName { get; set; }

        public string FilePath { get; set; }

        #region Navigation Properties

        [ForeignKey("EventId")]
        public SmoodEvent SmoodEvent { get; set; }

        #endregion
    }
}