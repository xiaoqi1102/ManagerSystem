<%@ WebHandler Language="C#" Class="imageUp" %>


using System;
using System.Web;
using System.Collections;
using System.Linq;
using System.Web.SessionState;
using Web.ueditor.net;

public class imageUp : HandlerBase, IHttpHandler,IRequiresSessionState
{
    public void ProcessRequest(HttpContext context)
    {
        //var tmpAccount = CookieAccount.GetAccount();
        //if (tmpAccount.AccountId == -1)
        //{
        //    context.Response.Write("您还未登录。");
        //    return;
        //}
        var accountInfo = base.GetAccountInfo(context);
        if (accountInfo == null)
        {
            context.Response.Write("您还未登录。");
            return;
        }
        
        if (!String.IsNullOrEmpty(context.Request.QueryString["fetch"]))
        {
            context.Response.AddHeader("Content-Type", "text/javascript;charset=utf-8");
            context.Response.Write(String.Format("updateSavePath([{0}]);", String.Join(", ", Config.ImageSavePath.Select(x => "\"" + x + "\""))));
            return;
        }

        context.Response.ContentType = "text/plain";

        //上传配置
        int size = 2;           //文件大小限制,单位MB                             //文件大小限制，单位MB
        string[] filetype = { ".gif", ".png", ".jpg", ".jpeg", ".bmp" };         //文件允许格式


        //上传图片
        Hashtable info = new Hashtable();
        Uploader up = new Uploader();

        string path = up.getOtherInfo(context, "dir");
        if (String.IsNullOrEmpty(path)) 
        {
            path = Config.ImageSavePath[0];
        }
        else if (!Config.ImageSavePath.Any(x => path.StartsWith(x)))
        {
            context.Response.Write("{ 'state' : '非法上传目录' }");
            return;
        }

        info = up.upFile(context, path + "\\", filetype, size);                   //获取上传状态

        string title = up.getOtherInfo(context, "pictitle");                   //获取图片描述
        if (string.IsNullOrEmpty(title) || title == "upload1")
        {
            //如果客户端没有填写图片的名称，那么就使用图片的名字作为名称
            title = context.Request.Files[0].FileName;
        }
        //Pic pic = new Pic();
        //pic.PicID = PrimaryKeyHelper.GeneratePrimaryKeyValue();
        //pic.PicName = title;
        //pic.UploadTime = DateTime.Now;
        //pic.PicUrl = info["url"].ToString().Replace("\\", "/");
        //pic.UploaderID = CookieAccount.GetAccount().AccountId;
        //DataBaseHelper helper = new DataBaseHelper();
        //helper.Insert(pic);
        //Factory<ImageBll>.OneOff.Add(img);
        
        //string oriName = up.getOtherInfo(context, "fileName");                //获取原始文件名

        HttpContext.Current.Response.ContentType = "application/json";
        HttpContext.Current.Response.Write("{'url':'" + info["url"].ToString().Replace("\\","/") + "','title':'" + title + "','original':'" + up.newFileName.Replace("\\","/") + "','state':'" + info["state"] + "'}");  //向浏览器返回数据json数据
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}