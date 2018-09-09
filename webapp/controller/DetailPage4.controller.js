/* global download:true */
sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"../lib/downloadjs/download.min"
], function(BaseController, MessageBox, Utilities, History, downloadjs) {
	"use strict";
var sectionName ="";
var text="";
	return BaseController.extend("com.sap.build.standard.untitledPrototype.controller.DetailPage4", {
 
		handleRouteMatched: function(oEvent) {
			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}

		},
	
	
	
	
	
	onDataExport: function() {
		console.log(this.text);
		download(this.text, this.sectionName+".yml", "text/plain");
	},
	
	
	
	
		doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		},
		generateResult: function() {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---MasterPage1").getController();
			var v4 =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage4").getController();
			var result= "";		
			var model = this.getOwnerComponent().getModel("sections");
           var sections = model.getProperty("/sections");
			var textarea = this.byId("text");
			var i=0; 
			while (i<sections.length) {
			if (sections[i].sectionNumber === this.sectionName && sections[i].sectionName.length !== 0) {
					result = result + ["name : \""] + [sections[i].sectionName] + "\"\ntablesConfig:\n";
					for (var j=0; j<sections[i].tables.length; j++) {
					result= result + ["    - name : \""] + [sections[i].tables[j].tableName] +"\" \n" ;
						if (sections[i].tables[j].variants.length !== 0) {
						result = result + ["      variants : \n"];
						for (var k=0; k<sections[i].tables[j].variants.length; k++) {
							result = result + ["        - "];
							if (sections[i].tables[j].variants[k].fields.length !== 0) {
								result = result + ["fields: \n"];
								for (var m=0;m<sections[i].tables[j].variants[k].fields.length;m++ ) {
									result = result + ["            - "] + [sections[i].tables[j].variants[k].fields[m].fieldValue] +"\n" ;
								}
							
							}
							if (sections[i].tables[j].variants[k].sqlStatement.length !== 0) {
								result = result + ["          sqlStatment : \"" ] + sections[i].tables[j].variants[k].sqlStatement + ["\"\n"];
								
							} 
							if (sections[i].tables[j].variants[k].preconditions.length !== 0){
									result = result + ["          preConditions : \n" ] ;
								for (var p=0; p<sections[i].tables[j].variants[k].preconditions.length;p++) {
									result = result + ["            - id: "] + [sections[i].tables[j].variants[k].preconditions[p].id] +"\n" ;
									result = result + ["              key: "] + [sections[i].tables[j].variants[k].preconditions[p].key] +"\n" ;
									result = result + ["              operator: \""] + [sections[i].tables[j].variants[k].preconditions[p].operator] +"\"\n" ;
									result = result + ["              value: "] + [sections[i].tables[j].variants[k].preconditions[p].value] +"\n" ;
								}
							}
							if (sections[i].tables[j].variants[k].template.length !== 0) {
								result = result + ["          template : \"" ] + sections[i].tables[j].variants[k].template + ["\"\n"];
							}
						}
						}
					}
				}
			i++;
			}
			v4.text= result;
			console.log("aaa");
			console.log(v4.text);
			textarea.setValue(result);	
			
		},
	
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DetailPage3").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			var textarea = oView.byId("text");
			var sec;
			var s;
			textarea.setValue("aaaa");
			var oViewModel;

			this.oRouter.attachRouteMatched(function(oEvent) {
        		   	var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage4").getController();        	
        		   	sec = oEvent.getParameter("name");
        			if (sec === "DetailPage4") {
            			s = oEvent.getParameter("arguments").section;
         				v.sectionName = s;
         				v.generateResult();
         				 oViewModel = new sap.ui.model.json.JSONModel({"sectionName": s});
            		v.getView().setModel(oViewModel,"sectionName");
        			}
        		
				});
			
				
			oView.addEventDelegate({
				onBeforeShow: function() {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function() {
								this.oRouter.navTo("DetailPage1", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

		}
	});
}, /* bExport= */ true);