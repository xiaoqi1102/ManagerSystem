<%@ WebHandler Language="C#" Class="imageManager" %>
/**
 * Created by visual studio2010
 * User: xuheng
 * Date: 12-3-7
 * Time: 下午16:29
 * To change this template use File | Settings | File Templates.
 */

using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.SessionState;

//从数据库中获取图片Url列表

public class imageManager : HandlerBase, IHttpHandler, IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        var accountInfo = base.GetAccountInfo(context);
        if (accountInfo == null)
        {
            context.Response.Write("您还未登录。");
            return;
        }
        string[] paths = { "upload", "upload1" }; //需要遍历的目录列表，最好使用缩略图地址，否则当网速慢时可能会造成严重的延时
        string[] filetype = { ".gif", ".png", ".jpg", ".jpeg", ".bmp" };                //文件允许格式
        string action = context.Server.HtmlEncode(context.Request["action"]);
       
        if (action == "get")
        {
            String str = String.Empty;

            #region 从数据库读取分页的图片信息
            //string phyUploadDir = Path.Combine(BaseConfig.SiteRootPath, path);
            //string idxStr = context.Request["idx"];
            //int idx ;
            //int.TryParse(idxStr, out idx);
            //if (idx == 0)
            //    idx = 1;
            //string kwd = HttpUtility.UrlDecode(context.Request["name"]);
            // PicDal dal = new PicDal();
            //List<string> list = dal.GetUrlList(idx, kwd);

            //var list = Factory<ImageBll>.OneOff.GetUrlList(idx, kwd);

            //context.Response.Write(string.Join("ue_separate_ue", list));
            #endregion

            foreach (string path in paths)
            {
                DirectoryInfo info = new DirectoryInfo(context.Server.MapPath(path));

                //目录验证
                if (info.Exists)
                {
                    DirectoryInfo[] infoArr = info.GetDirectories();
                    foreach (DirectoryInfo tmpInfo in infoArr)
                    {
                        foreach (FileInfo fi in tmpInfo.GetFiles())
                        {
                            if (Array.IndexOf(filetype, fi.Extension) != -1)
                            {
                                str += path + "/" + tmpInfo.Name + "/" + fi.Name + "ue_separate_ue";
                            }
                        }
                    }
                }
            }

            context.Response.Write(str);
            
        }
    }


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}