﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace SmartSaver.Models
{
    public partial class SavingsManagerInformation
    {

        public int ID { get; set; }
        public string Purpose { get; set; }
        public int Cost { get; set; }
        public string Date { get; set; }
        public int SavedAmount { get; set; } = 0;
        public string Status { get; set; } = "Not started";
        public int lastAddition { get; set; } = 0;
        public string user_id { get; set; } 

    }
}
