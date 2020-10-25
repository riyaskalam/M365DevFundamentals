using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Vouchers.Controlers.Api
{
    [Route("api/[controller]")]
    public class BalanceController : Controller
    {
        private VouchersDBContext ctx;

        public BalanceController(VouchersDBContext context)
        {
            ctx = context;
        }

        // http://BASEURL/api/balance/GetSumTotal/true
        [Route("GetSumTotal/{expense}")]
        public string GetSumTotal(bool expense)
        {
            string result = expense ? "Total Expenses: " : "Total Income: ";
            var accts = ctx.BalanceAccounts.Where(f => f.Expense == expense).Select(f => f.ID).ToList();
            var vds = ctx.VoucherDetails.Where(f => f.Account != null && accts.Contains(f.AccountID)).Sum(f => f.Amount);
            return result + vds;
        }
    }
}
