using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Resources;
using SHDocVw;
using mshtml;
using System.IO;
using Microsoft.Win32;
using System.Runtime.InteropServices;
using System.Reflection;


namespace vkpatch
{
    [
    ComVisible(true),
    ProgId("vkPatch 6"),
    Guid("40AEF60B-A6F8-4389-9003-A683DD75B850"),
    ClassInterface(ClassInterfaceType.None)
    ]

    public class BHO : IObjectWithSite
    {
        WebBrowser webBrowser;
        HTMLDocument document;
        string scriptElementId = "vkpatch";
        String[] patterns = {
                                "^http://vkontakte\\.ru",
                                "^http://[^?#]*\\.vkontakte\\.ru",
                                "^http://vk\\.com",
                                "^http://[^#?]*\\.vk\\.com"
                            };
        Regex[] regulars;

        public BHO()
        {
            List<Regex> list = new List<Regex>();
            foreach (string patt in patterns)
            {
                list.Add(new Regex(patt, RegexOptions.IgnoreCase));
            };

            regulars = list.ToArray();
        }

        public void OnDocumentComplete(object pDisp, ref object URL)
        {
            /*
             * Проверка по адресу
             */
            string url = URL.ToString();
            bool matched = false;
            foreach (Regex reg in regulars)
            {
                if (reg.Match(url).Success)
                {
                    matched = true;
                    break;
                }
            };
            if (!matched)
            {
                return;
            }

            document = (HTMLDocument)webBrowser.Document;
            /*
             * скрипт уже подключён
             */
            if (document.getElementById(scriptElementId) != null)
            {
                return; 
            };

            
            // создаем скрипт
            string source = vkpatch.Properties.Resources.vkpatch.ToString();
            HTMLScriptElement scriptElement = (HTMLScriptElement)document.createElement("script");
            scriptElement.text = source;
            scriptElement.id = "vkpatch";

            // выполняем инъекцию в head
            IHTMLElementCollection heads = document.getElementsByTagName("head");
            foreach (HTMLHeadElement head in heads)
            {
                head.appendChild((IHTMLDOMNode) scriptElement);
                break;
            }
        }

        public int SetSite(object site)
        {
            if (site != null)
            {
                webBrowser = (WebBrowser)site;
                webBrowser.DocumentComplete +=
                    new DWebBrowserEvents2_DocumentCompleteEventHandler(this.OnDocumentComplete);
            }
            else
            {
                webBrowser.DocumentComplete -=
                  new DWebBrowserEvents2_DocumentCompleteEventHandler(this.OnDocumentComplete);
                webBrowser = null;
            };

            return 0;
        }

        public int GetSite(ref Guid guid, out IntPtr ppvSite)
        {
            IntPtr punk = Marshal.GetIUnknownForObject(webBrowser);
            int hr = Marshal.QueryInterface(punk, ref guid, out ppvSite);
            Marshal.Release(punk);

            return hr;
        }

        public static string BHOKEYNAME =
            "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Browser Helper Objects";

        [ComRegisterFunction]
        public static void RegisterBHO(Type type)
        {
            RegistryKey registryKey = Registry.LocalMachine.OpenSubKey(BHOKEYNAME, true);

            if (registryKey == null)
                registryKey = Registry.LocalMachine.CreateSubKey(BHOKEYNAME);

            string guid = type.GUID.ToString("B");
            RegistryKey ourKey = registryKey.OpenSubKey(guid);

            if (ourKey == null)
                ourKey = registryKey.CreateSubKey(guid);

            registryKey.Close();
            ourKey.Close();
        }

        [ComUnregisterFunction]
        public static void UnregisterBHO(Type type)
        {
            RegistryKey registryKey = Registry.LocalMachine.OpenSubKey(BHOKEYNAME, true);
            string guid = type.GUID.ToString("B");

            if (registryKey != null)
                registryKey.DeleteSubKey(guid, false);
        }
    }

}