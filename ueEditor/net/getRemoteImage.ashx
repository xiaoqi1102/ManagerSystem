<%@ WebHandler Language="C#" Class="getRemoteImage" %>
/**
 * Created by visual studio 2010
 * User: xuheng
 * Date: 12-3-8
 * Time: 下午13:33
 * To get the Remote image.
 */
using System;
using System.Web;
using System.Collections;
using System.Text.RegularExpressions;
using System.Net;
using System.IO;
using System.Web.SessionState;
using Front.Base.Configs;
using Front.Base.DbEntity;
using Front.Base.Extends;
using Front.Base.ImageUtility;


public class getRemoteImage : HandlerBase, IHttpHandler, IRequiresSessionState
{
    private static string pathbase = "upload1\\";
    public void ProcessRequest(HttpContext context)
    {

        var accountInfo = base.GetAccountInfo(context);
        if (accountInfo == null)
        {
            context.Response.Write("您还未登录。");
            return;
        }
        
        string relativeDir = Path.Combine(pathbase, DateTime.Now.ToString("yyyy-MM-dd").Replace("-", "\\"));

        //string savePath = Path.Combine(BaseConfig.SiteRootPath, relativePath);        //保存文件地址
        string[] filetype = { ".gif", ".png", ".jpg", ".jpeg", ".bmp" };             //文件允许格式
        int fileSize = 3000;                                                        //文件大小限制，单位kb

        string uri = context.Server.HtmlEncode(context.Request["upfile"]);
        uri = uri.Replace("&amp;", "&");
        string[] imgUrls = Regex.Split(uri, "ue_separate_ue", RegexOptions.IgnoreCase);

        ArrayList tmpNames = new ArrayList();
        WebClient wc = new WebClient();
        HttpWebResponse res;
        String filename = String.Empty;
        String imgUrl = String.Empty;
        String currentType = String.Empty;

        try
        {
            for (int i = 0, len = imgUrls.Length; i < len; i++)
            {
                imgUrl = imgUrls[i];

                if (imgUrl.Substring(0, 7) != "http://")
                {
                    tmpNames.Add("error!");
                    continue;
                }

                //格式验证
                int temp = imgUrl.LastIndexOf('.');
                currentType = imgUrl.Substring(temp).ToLower();
                if (Array.IndexOf(filetype, currentType) == -1)
                {
                    tmpNames.Add("error!");
                    continue;
                }

                res = (HttpWebResponse)WebRequest.Create(imgUrl).GetResponse();
                //http检测
                if (res.ResponseUri.Scheme.ToLower().Trim() != "http")
                {
                    tmpNames.Add("error!");
                    continue;
                }
                //大小验证
                if (res.ContentLength > fileSize * 1024)
                {
                    tmpNames.Add("error!");
                    continue;
                }
                //死链验证
                if (res.StatusCode != HttpStatusCode.OK)
                {
                    tmpNames.Add("error!");
                    continue;
                }
                //检查mime类型
                if (res.ContentType.IndexOf("image") == -1)
                {
                    tmpNames.Add("error!");
                    continue;
                }
                res.Close();

                //var filepath = savePath + WebContext.CurrentWxId;// DateTime.Now.ToString("yyyy-MM-dd") + "/";
                
                //创建保存位置
                string phyDir = Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath"), relativeDir);
                if (!Directory.Exists(phyDir))
                {
                    Directory.CreateDirectory(phyDir);
                }

                //写入文件
                filename = reName() + "_" + currentType;
                
                string bigImg = filename.Replace("_", "_b");     //大图缩略图文件名
                string smallImg = filename.Replace("_", "_s");   //小图缩略图文件名
                
                string phySavePath = Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath"), phyDir, filename);

                wc.DownloadFile(imgUrl, phySavePath);
                ImageHelper.MakeThumbnail(phySavePath, Path.Combine(phyDir, bigImg), 709, 207, "W", true);
                ImageHelper.MakeThumbnail(phySavePath, Path.Combine(phyDir, smallImg), 315, 210, "W", true);
                
                //Pic pic = new Pic();
                int st = imgUrl.LastIndexOf("/")+1;
                int ed = imgUrl.LastIndexOf(".");
                if (ed == -1)
                    ed = imgUrl.Length;
                if (ed > st)
                {
                    //pic.PicName = imgUrl.Substring(st, ed - st);
                }
                var url = (relativeDir + "\\" + filename).Replace("\\", "/");
                //pic.PicUrl = (relativeDir + "\\" + filename).Replace("\\", "/");
                //pic.UploaderID = CookieAccount.GetAccount().AccountId;
                //pic.UploadTime = DateTime.Now;
                
                //pic.PicID = PrimaryKeyHelper.GeneratePrimaryKeyValue();
                
                //DataBaseHelper helper = new DataBaseHelper();
                //helper.Insert(pic);
                
                ////删除原图
                //File.Delete(Path.Combine(phyDir, filename));

                tmpNames.Add(url);
            }
        }
        catch (Exception ex)
        {
            ex.TraceError("获取远程图片时出错");
            tmpNames.Add("error!");
        }
        finally
        {
            wc.Dispose();
        }
        context.Response.Write("{url:'" + converToString(tmpNames) + "',tip:'远程图片抓取成功！',srcUrl:'" + uri + "'}");
    }

    private string reName()
    {
        Random ran = new Random();
        int random = ran.Next(1000, 9999);
        return System.DateTime.Now.ToString("HHmmssfff") + random.ToString();
    }

    //集合转换字符串
    private string converToString(ArrayList tmpNames)
    {
        String str = String.Empty;
        for (int i = 0, len = tmpNames.Count; i < len; i++)
        {
            str += tmpNames[i] + "ue_separate_ue";
            if (i == tmpNames.Count - 1)
                str += tmpNames[i];
        }
        return str;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}