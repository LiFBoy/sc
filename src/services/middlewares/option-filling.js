// option filling middleware
// @author Pluto <huarse@gmail.com>
// @create 2019/12/18 20:27

/** add xsrf token add fetch options */
export default async function optionsSupplement (ctx) {
  ctx.type = ctx.type || 'ajax';
  ctx.holdEmptyParam = true;

  await ctx.next();
}
