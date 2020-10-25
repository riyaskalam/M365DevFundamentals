using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Vouchers.Api
{
    [Route("api/[controller]")]
    public class VouchersController : Controller
    {
        private VouchersDBContext ctx;

        public VouchersController(VouchersDBContext context)
        {
            ctx = context;
        }

        // GET: http://localhost:5000/api/vouchers
        [HttpGet]
        public IEnumerable<Voucher> Get()
        {
            var vouchers = ctx.Vouchers.Include(v => v.Details).OrderByDescending(v => v.Date).ToList();
            return vouchers;
        }

        // GET http://localhost:5000/api/vouchers/1
        [HttpGet("{id}")]
        public Voucher Get(int id)
        {
            return ctx.Vouchers.Include(f => f.Details).FirstOrDefault(v => v.ID == id);
        }

        // http://localhost:5000/api/vouchers
        [HttpPost]
        public ActionResult Post([FromBody]Voucher value)
        {
            ctx.Vouchers.Add(value);
            ctx.SaveChanges();
            return Ok(value);
        }

        // http://localhost:5000/api/vouchers
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody]Voucher value)
        {
            var v = Get(id);
            if (v != null)
            {
                Mapper.CopyData(value, v);
                ctx.SaveChanges();
            }
            return Ok(value);
        }

        // http://localhost:5000/api/vouchers/1
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var v = Get(id);
            if (v != null)
            {
                ctx.Remove(v);
                ctx.SaveChanges();
            }
            return Ok();
        }
    }
}
