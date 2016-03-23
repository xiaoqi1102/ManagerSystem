using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Front.Base.Common;
using Front.Base.Configs;
using Front.Base.Entity;
using Front.Base.Extends;
using Front.Base.Helpers;
using YCenter.Base;

public class HandlerBase
{
    /// <summary>
    /// 检查登录状态
    /// </summary>
    /// <param name="context"></param>
    protected AccountInfo GetAccountInfo(HttpContext context)
    {
        string tokenStr = GetToken(context.Request);

        if (string.IsNullOrEmpty(tokenStr))
            return null;
        AccountInfo info = GetRemoteAccountInfo(tokenStr);

        return info;
    }

    AccountInfo GetFromCache(string tokenStr)
    {
        return FrontWebCache.Instance.Get<AccountInfo>(tokenStr);
    }

    /// <summary>
    /// 暂定 前端 和 api 分开部署，故需要通过 调用 api 网站的接口得到token对应的账号信息
    /// todo:假如 前端和 api 部署在一个网站，那么可以简化获取方式，直接从SecurityHelper获取。
    /// </summary>
    /// <param name="tokenStr"></param>
    /// <returns></returns>
    private AccountInfo GetRemoteAccountInfo(string tokenStr)
    {
        var info = GetFromCache(tokenStr);
        if (info == null)
        {
            string url = CommonConfig.GetConfigStr("SiteApiHostUrl") + "/getLoginInfo?token=" + tokenStr;
            try
            {
                var json = NetHelper.Get(url);
                EntityModel em = json.DeserializeFromJson<EntityModel>();
                info = em.Data.ToString().DeserializeFromJson<AccountInfo>();
                if (info != null)
                    FrontWebCache.Instance.Set(tokenStr, info);
            }
            catch (Exception ex)
            {
                ex.TraceError();
                return null;
            }
        }
        return info;
    }

    private string GetToken(HttpRequest request)
    {
        if (request.Cookies.Count == 0)
            return "";

        var obj = request.Cookies["accountCookie"];
        if(obj == null)
            return "";
        return obj.Value;
    }
}