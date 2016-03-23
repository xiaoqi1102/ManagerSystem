using System;
using System.Collections;
using System.IO;
using System.Web;
using Front.Base.Configs;
using Front.Base.Extends;
using Front.Base.ImageUtility;


namespace Web.ueditor.net
{
    /// <summary>
    /// UEditor编辑器通用上传类
    /// </summary>
    public class Uploader
    {
        private string state = "SUCCESS";

        private string URL = null;
        private string currentType = null;
        private string uploadpath = null;
        private string filename = null;
        private string originalName = null;
        private HttpPostedFile uploadFile = null;
        public string newFileName = null;

        public string SavePath = null;
        /**
  * 上传文件的主处理方法
  * @param HttpContext
  * @param string
  * @param  string[]
  *@param int
  * @return Hashtable
  */

        public Hashtable upFile(HttpContext cxt, string pathbase, string[] filetype, int size)
        {
            //pathbase = pathbase + DateTime.Now.ToString("yyyy-MM-dd") + "/";
            uploadpath = Path.Combine( pathbase, DateTime.Now.ToString("yyyy-MM-dd").Replace("-", "\\")) + "\\"; //cxt.Server.MapPath(pathbase); //获取文件上传路径

            try
            {
                uploadFile = cxt.Request.Files[0];
                originalName = uploadFile.FileName;

                //目录创建
                createFolder();

                //格式验证
                if (checkType(filetype))
                {
                    //不允许的文件类型
                    state = "\u4e0d\u5141\u8bb8\u7684\u6587\u4ef6\u7c7b\u578b";
                }
                //大小验证
                if (checkSize(size))
                {
                    //文件大小超出网站限制
                    state = "\u6587\u4ef6\u5927\u5c0f\u8d85\u51fa\u7f51\u7ad9\u9650\u5236";
                }
                //保存图片
                if (state == "SUCCESS")
                {
                    filename = reName() + "_" + getFileExt();         //原图文件名
                    string bigImg = filename.Replace("_", "_b");     //大图缩略图文件名
                    string smallImg = filename.Replace("_", "_s");   //小图缩略图文件名
                    SavePath = Path.Combine(uploadpath, filename);

                    string phySavePath = Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath"), uploadpath, filename);
                    uploadFile.SaveAs(phySavePath);
                    ImageHelper.MakeThumbnail(phySavePath, Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath"), uploadpath, bigImg), 709, 207, "W", true);
                    ImageHelper.MakeThumbnail(phySavePath, Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath") ,uploadpath, smallImg), 315, 210, "W", true);
                    ////删除原图
                    //File.Delete(Path.Combine(uploadpath, filename));
                    URL = uploadpath + filename;
                    newFileName = SavePath;
                }
            }
            catch (Exception e)
            {
                e.TraceError("上传图片时出现异常");
                // 未知错误
                state = "\u672a\u77e5\u9519\u8bef";
                URL = "";
            }
            return getUploadInfo();
        }

        /**
 * 上传涂鸦的主处理方法
  * @param HttpContext
  * @param string
  * @param  string[]
  *@param string
  * @return Hashtable
 */

        public Hashtable upScrawl(HttpContext cxt, string pathbase, string tmppath, string base64Data)
        {
        //    pathbase = pathbase + DateTime.Now.ToString("yyyy-MM-dd") + "/";
            uploadpath = Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath"), pathbase); //cxt.Server.MapPath(pathbase); //获取文件上传路径
            FileStream fs = null;
            try
            {
                //创建目录
                createFolder();
                //生成图片
                filename = System.Guid.NewGuid() + ".png";
                fs = File.Create(uploadpath + filename);
                byte[] bytes = Convert.FromBase64String(base64Data);
                fs.Write(bytes, 0, bytes.Length);

                URL = pathbase + filename;
            }
            catch (Exception e)
            {
                e.TraceError("上传涂鸦时出现异常");
                state = "未知错误";
                URL = "";
            }
            finally
            {
                fs.Close();
                deleteFolder(cxt.Server.MapPath(tmppath));
            }
            return getUploadInfo();
        }

        /**
* 获取文件信息
* @param context
* @param string
* @return string
*/

        public string getOtherInfo(HttpContext cxt, string field)
        {
            string info = null;
            if (cxt.Request.Form[field] != null && !String.IsNullOrEmpty(cxt.Request.Form[field]))
            {
                info = field == "fileName" ? cxt.Request.Form[field].Split(',')[1] : cxt.Request.Form[field];
            }
            if (string.IsNullOrEmpty(info))
            {
#warning 使用了硬编码的 upload1
                info = "upload1";
            }
            return info;
        }

        /**
     * 获取上传信息
     * @return Hashtable
     */

        private Hashtable getUploadInfo()
        {
            Hashtable infoList = new Hashtable();

            infoList.Add("state", state);
            infoList.Add("url", URL);

            if (currentType != null)
                infoList.Add("currentType", currentType);
            if (originalName != null)
                infoList.Add("originalName", originalName);
            if (SavePath != null)
                infoList.Add("SavePath", SavePath);
            return infoList;
        }

        /**
     * 重命名文件
     * @return string
     */

        private string reName()
        {
            Random ran = new Random();
            int random = ran.Next(1000, 9999);
            return System.DateTime.Now.ToString("HHmmssfff") + random.ToString() ;
        }

        /**
     * 文件类型检测
     * @return bool
     */

        private bool checkType(string[] filetype)
        {
            currentType = getFileExt();
            return Array.IndexOf(filetype, currentType) == -1;
        }

        /**
     * 文件大小检测
     * @param int
     * @return bool
     */

        private bool checkSize(int size)
        {
            return uploadFile.ContentLength >= (size*1024*1024);
        }

        /**
     * 获取文件扩展名
     * @return string
     */

        private string getFileExt()
        {
            string[] temp = uploadFile.FileName.Split('.');
            return "." + temp[temp.Length - 1].ToLower();
        }

        /**
     * 按照日期自动创建存储文件夹
     */

        private void createFolder()
        {
            string phyPath = Path.Combine(CommonConfig.GetConfigStr("AdminSiteRootPath"), uploadpath);
            if (!Directory.Exists(phyPath))
            {
                Directory.CreateDirectory(phyPath);
            }
        }

        /**
     * 删除存储文件夹
     * @param string
     */

        public void deleteFolder(string path)
        {
            //if (Directory.Exists(path))
            //{
            //    Directory.Delete(path, true);
            //}
        }
    }
}