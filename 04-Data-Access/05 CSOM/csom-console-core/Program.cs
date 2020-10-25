using System;
using System.Net.Http;
using System.Security;
using System.Text;
using System.Text.Json;
using System.Web;
using Microsoft.SharePoint.Client;

namespace csom_console_core
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            string tokenEndpoint = "https://login.microsoftonline.com/common/oauth2/token";
            string resource = "https://integrationsonline.sharepoint.com";
            var clientId = "d383a8c3-4b69-4362-8236-d04768297509";            
            var username = "alexander.pajer@integrations.at";            
            var httpClient = new HttpClient();
            string token = "";

            var pwd = new System.Net.NetworkCredential(string.Empty, getPasswordFromConsole("Enter AZ PWD: ")).Password;

            var body = $"resource={resource}&client_id={clientId}&grant_type=password&username={HttpUtility.UrlEncode(username)}&password={HttpUtility.UrlEncode(pwd)}";
            using (var stringContent = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded"))
            {
                var result = await httpClient.PostAsync(tokenEndpoint, stringContent).ContinueWith((response) =>
               {
                   return response.Result.Content.ReadAsStringAsync().Result;
               });

                var tokenResult = JsonSerializer.Deserialize<JsonElement>(result);
                token = tokenResult.GetProperty("access_token").GetString();
                Console.WriteLine("your token");
                Console.WriteLine(token);
            }

            var ctx = new ClientContext(new Uri(resource));
            ctx.ExecutingWebRequest += (sender, e) =>
            {
                e.WebRequestExecutor.RequestHeaders["Authorization"] = "Bearer " + token;
            };

            ctx.Load(ctx.Web);
            ctx.ExecuteQuery();
            Console.WriteLine("web title");
            Console.WriteLine(ctx.Web.Title);

            //Create item
            var listName = "Aufgaben";

            List list = ctx.Web.Lists.GetByTitle(listName);
            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem li = list.AddItem(itemCreateInfo);
            li["Title"] = "Learn Graph";
            li["Body"] = "Graph is super cool";
            li.Update();
            ctx.ExecuteQuery(); 
            Console.WriteLine("List Item created - check in SP");
            Console.ReadLine();

            //Update item
            ListItem liUpdate = list.GetItemById(3);
            liUpdate["Title"] = "My Updated Title.";
            liUpdate.Update();
            ctx.ExecuteQuery(); 
            Console.WriteLine("List Item updated - check in SP");
            Console.ReadLine();

            //Delete item
            ListItem deleteItem = list.GetItemById(3);
            deleteItem.DeleteObject();
            ctx.ExecuteQuery(); 
            Console.WriteLine("List Item deleted - check in SP");
        }

        public static SecureString getPasswordFromConsole(String displayMessage) {
            SecureString pass = new SecureString();
            Console.Write(displayMessage);
            ConsoleKeyInfo key;

            do {
                key = Console.ReadKey(true);

                // Backspace Should Not Work
                if (!char.IsControl(key.KeyChar)) {
                    pass.AppendChar(key.KeyChar);
                    Console.Write("*");
                } else {
                    if (key.Key == ConsoleKey.Backspace && pass.Length > 0) {
                        pass.RemoveAt(pass.Length - 1);
                        Console.Write("\b \b");
                    }
                }
            }
            // Stops Receving Keys Once Enter is Pressed
            while (key.Key != ConsoleKey.Enter);
            return pass;
        }
    }        
}
