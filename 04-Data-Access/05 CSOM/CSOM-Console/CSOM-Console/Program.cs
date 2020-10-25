using Microsoft.SharePoint.Client;
using System;
using System.IO;
using System.Net;
using File = Microsoft.SharePoint.Client.File;

namespace CSOM_Console
{
    class Program
    {
        static void Main(string[] args)
        {
            var url = "http://sp2019/";
            var includeOnlien = true;


            //Using Explicit Credential - use for SPO
            if (includeOnlien)
            {
                var spourl = "https://integrationsonline.sharepoint.com/sites/devgrp";
                var user = "alexander.pajer@integrations.at";

                using (var context = new ClientContext(spourl))
                {
                    var pwd = SecureStringExtensions.GetConsolePassword();
                    context.Credentials = new SharePointOnlineCredentials(user, pwd.ToSecureString());
                    context.Load(context.Web, w => w.Title);
                    context.ExecuteQuery();
                    Console.WriteLine("Your site title is: " + context.Web.Title);
                }
            }

            //Using Credential Cache - use for SP2013, SP2016
            using (var context = new ClientContext(url))
            {
                
                var credentials = CredentialCache.DefaultNetworkCredentials;
                context.Credentials = credentials;

                //Get Web Title
                context.Load(context.Web, w => w.Title);
                context.ExecuteQuery();

                Console.WriteLine("Your site title is: " + context.Web.Title);

                //Set Web Description
                Web web = context.Web;
                web.Description = "Changed by CSOM";
                web.Update();

                context.Load(context.Web, w => w.Description);
                context.ExecuteQuery();

                Console.WriteLine("Your site description is: " + context.Web.Description);
                
                //Get Lists in Web                
                ListCollection lists = web.Lists;
                
                //context.Load(lists);
                context.Load(lists, l=>l.Include(item=>item.Title, item =>item.Created));
                context.ExecuteQuery();

                foreach (List list in lists)
                {
                    Console.WriteLine(list.Title);
                }

                //Upload File
                var sourceFilePath = @"D:\O365ClientSideDev\readme.md";
                var targetUrl = "/Shared%20Documents";
                
                var targetFileUrl = $"{targetUrl}/{Path.GetFileName(sourceFilePath)}";
                using (var fs = new FileStream(sourceFilePath, FileMode.Open))
                {
                    File.SaveBinaryDirect(context, targetFileUrl, fs, true);
                }

                //Set document properties
                var uploadedFile = context.Web.GetFileByServerRelativeUrl(targetFileUrl);
                var listItem = uploadedFile.ListItemAllFields;
                listItem["Information"] = "Uploaded by CSOM";
                listItem.Update();
                context.ExecuteQuery();
                Console.WriteLine("Upload done");

                //Create List - Traditional  
                ListCreationInformation listInfo = new ListCreationInformation
                {
                    Title = "WithoutPnP",
                    TemplateType = (int) ListTemplateType.GenericList
                };
                List cl = web.Lists.Add(listInfo);
                cl.Update();
                context.ExecuteQuery();

                //Create List PnP - PnP
                var pnpl = context.Web.CreateList(ListTemplateType.GenericList, "WithPnP", false);
                Console.WriteLine("List created");
            }

            Console.ReadLine();
        }
    }
}
