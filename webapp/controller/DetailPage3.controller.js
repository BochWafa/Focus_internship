/* global hljs:true */
    /*global window, document, location, CodeMirror, jsyaml, inspect, base64, hasher*/
sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
	
 
], function(BaseController, MessageBox, Utilities, History, MessageToast) {
	"use strict";
	
	return BaseController.extend("com.sap.build.standard.untitledPrototype.controller.DetailPage3", {
	
	
  onChange: function(oEvent) {
  	var content = oEvent.getSource().getValue();
  	console.log(content);
  	var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage3").getController();
		if (content.length > 0 ) {
			if (v.getView().byId("verifyButton").getEnabled() === false){
			v.getView().byId("verifyButton").setEnabled(true);}
		}else {
				v.getView().byId("verifyButton").setEnabled(false);
				v.getView().byId("resultElement").setVisible(false);
				v.getView().byId("fileUploader").setValue(null);

		}
  },
  	handleUploadComplete: function(oEvent) {
  		console.log(oEvent);
			var sResponse = oEvent.getParameter("response");
			console.log(sResponse);
			console.log(oEvent.getParameter("status"));
			console.log(oEvent.getParameter("responseRaw"));
		/*	if (sResponse) {
				var sMsg = "";
					var m = /^[(\d\d\d)]:(.)$/.exec(sResponse); 
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
				}

				MessageToast.show(sMsg);
			}*/
		},

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("Choose a file first");
				return;
			}
			oFileUploader.upload();
		},

		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			jQuery.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
			var sSupportedFileTypes = aFileTypes.join(", ");
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									sSupportedFileTypes);
		},

		handleValueChange: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage3").getController();
				var textarea = v.getView().byId("text");
				var b = v.byId("verifyButton");
			console.log(oEvent.getParameter("files"));
			if (oEvent.getParameter("files").length > 0){
			var file = oEvent.getParameter("files")[0];
			var tab = file.name.split(".");
			var extension = tab[tab.length -1];
			console.log(extension);
				if (extension !== "yml" && extension !== "yaml") {
					var aFileTypes = oEvent.getSource().getFileType();
					jQuery.each(aFileTypes, function(key, value) {aFileTypes[key] = "*." +  value;});
					var sSupportedFileTypes = aFileTypes.join(", ");
					MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
										" is not supported. Choose one of the following types: " +
										sSupportedFileTypes);
				}
				else {
				
			
				  var reader = new FileReader();  
					var that = this;  
				 reader.onload = function(evn) {  
				 var strCSV = evn.target.result; //string in CSV
				 textarea.setValue(strCSV);
				 b.setEnabled(true);
					 };
				reader.readAsText(file); 
				MessageToast.show(" '" +
										oEvent.getParameter("newValue") + "' was successfully uploaded");
				}
				}
			else {
				textarea.setValue("");
				b.setEnabled(false);
			}
		},
		
		cancel: function() {
		this.getView().byId("text").setValue("");
		this.getView().byId("verifyButton").setEnabled(false);
		this.getView().byId("fileUploader").setValue(null);
		this.getView().byId("resultElement").setVisible(false);
		},
	
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
		
		
		verifyText: function() {
		var str  = this.getView().byId("text").getValue();
		console.log(str);
		 var source, result, initial, permalink, timer1, timer2 = null;
			 var SexyYamlType = new jsyaml.Type('!sexy', {
    kind: 'sequence', // See node kinds in YAML spec: http://www.yaml.org/spec/1.2/spec.html#kind//
    construct: function (data) {
      return data.map(function (string) { return 'sexy ' + string; });
    }
  });
		  var SEXY_SCHEMA = jsyaml.Schema.create([ SexyYamlType ]);
//	sap.ui.require("controller/lib/js-yaml");
var text = this.getView().byId("resultMessage");
var el = this.getView().byId("resultElement");
el.setVisible(true);
//this.getView().byId("resultElement").setVisible(true);
 try {
      var obj = jsyaml.load(str, { schema: SEXY_SCHEMA });
		text.setText("Valide YAML");
		text.setType("Success");
    } catch (err) {
     var a = "Invalid YAML:\n" + err.message;
     text.setText(a);
	text.setType("Error");

    }
  
		},
	
		
		
		
		_onPageNavButtonPress: function(oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function(fnResolve) {

				this.doNavigate("DetailPage1", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

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
		
		
			

		

		
		
		
		
		onInit: function() {
			this._oBusyDialog = new sap.m.BusyDialog();
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DetailPage3").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
		 /*	var form = this.getView().byId("Form");
			var formElement1 = new sap.ui.layout.form.FormElement();
			formElement1.setLabel("Result");
			var text = new sap.m.TextArea("textResult",{rows: 4});
		   	formElement1.addField(text);
			var fContainer = new sap.ui.layout.form.FormContainer();
		    fContainer.addFormElement(formElement1);
		    form.addFormContainer(fContainer);*/
		    var content = $('#text')[0]; //returns a HTML DOM Object

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