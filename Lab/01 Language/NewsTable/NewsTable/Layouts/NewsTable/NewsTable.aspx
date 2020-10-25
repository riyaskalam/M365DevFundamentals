<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
    <%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
        <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
            <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                <%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
                    <%@ Import Namespace="Microsoft.SharePoint" %>
                        <%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
                            <%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewsTable.aspx.cs" Inherits="NewsTable.Layouts.NewsTable.NewsTable" DynamicMasterPageFile="~masterurl/default.master" %>

                                <asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
                                    <script src="libs/jquery-3.1.1.min.js" type="text/javascript"></script>
                                    <script src="NewsTable.aspx.js"></script>
                                </asp:Content>

                                <asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
                                    <div id="wrapper">
                                        <div id="newsTable">
                                        </div>
                                        <div id="newsDetail">
                                            <div>
                                                <label>ID</label><input id="id" type="text" readonly/>
                                            </div>
                                            <div>
                                                <label>Title</label><input id="title" type="text" />
                                            </div>
                                            <div>
                                                <label>Body</label><textarea id="body" cols="40" rows="10"></textarea>
                                            </div>
                                            <div>
                                                <label>Modified</label><input id="created" type="text" readonly />
                                            </div>
                                            <div> <a onclick="saveNews()">Save</a></div>
                                        </div>
                                    </div>
                                </asp:Content>

                                <asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
                                    Application Page
                                </asp:Content>

                                <asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
                                    My Application Page
                                </asp:Content>