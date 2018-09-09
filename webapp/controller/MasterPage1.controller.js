sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";
	var n = 1;
	return BaseController.extend("com.sap.build.standard.untitledPrototype.controller.MasterPage1", {
		handleRouteMatched: function(oEvent) {
			var oParams = {};
			var oView = this.getView();
			var bSelectFirstListItem = true;
			if (oEvent.mParameters.data.context || oEvent.mParameters.data.masterContext) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				this.sMasterContext = oEvent.mParameters.data.masterContext;
				if (this.sMasterContext) {
					oPath = {
						path: "/" + this.sMasterContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				} else if (this.sContext) {
					var sCurrentContextPath = "/" + this.sContext;
	
					bSelectFirstListItem = false;
				}

			}
			if (bSelectFirstListItem) {
				oView.addEventDelegate({
					onBeforeShow: function() {
						var oContent = this.getView().getContent();
						if (oContent) {
							if (!sap.ui.Device.system.phone) {
								var oList = oContent[0].getContent() ? oContent[0].getContent()[0] : undefined;
								if (oList) {
									var sContentName = oList.getMetadata().getName();
									if (sContentName.indexOf("List") > -1) {
										oList.attachEventOnce("updateFinished", function() {
											var oFirstListItem = this.getItems()[0];
											if (oFirstListItem) {
												oList.setSelectedItem(oFirstListItem);
												oList.fireItemPress({
													listItem: oFirstListItem
												});
											}
										}.bind(oList));
									}
								}
							}
						}
					}.bind(this)
				});
			}

		},
		
			onSearch: function (event) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---MasterPage1").getController();
			var item = event.getParameter("suggestionItem");
			console.log(item);
			if (item) {
				var a= item.getText();
				sap.m.MessageToast.show("search for: " + a);
					var oRouter = sap.ui.core.UIComponent.getRouterFor(v);
					oRouter.navTo("DetailPage2",{
    					section : a
					});
			//	v.getView().byId("searchField").setValue(null);
			}
		},

		onSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [
					new sap.ui.model.Filter([
						new sap.ui.model.Filter("sectionName", function(sText) {
							return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						})
					], false)
				];
			}

			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest();
		},
		
		_attachSelectListItemWithContextPath: function(sContextPath) {
			var oView = this.getView();
			var oContent = this.getView().getContent();
			if (oContent) {
				if (!sap.ui.Device.system.phone) {
					var oList = oContent[0].getContent() ? oContent[0].getContent()[0] : undefined;
					if (oList && sContextPath) {
						var sContentName = oList.getMetadata().getName();
						var oItemToSelect, oItem, oContext, aItems, i;
						if (sContentName.indexOf("List") > -1) {
							if (oList.getItems().length) {
								oItemToSelect = null;
								aItems = oList.getItems();
								for (i = 0; i < aItems.length; i++) {
									oItem = aItems[i];
									oContext = oItem.getBindingContext();
									if (oContext && oContext.getPath() === sContextPath) {
										oItemToSelect = oItem;
									}
								}
								if (oItemToSelect) {
									oList.setSelectedItem(oItemToSelect);
								}
							} else {
								oView.addEventDelegate({
									onBeforeShow: function() {
										oList.attachEventOnce("updateFinished", function() {
											oItemToSelect = null;
											aItems = oList.getItems();
											for (i = 0; i < aItems.length; i++) {
												oItem = aItems[i];
												oContext = oItem.getBindingContext();
												if (oContext && oContext.getPath() === sContextPath) {
													oItemToSelect = oItem;
												}
											}
											if (oItemToSelect) {
												oList.setSelectedItem(oItemToSelect);
											}
										});
									}
								});
							}
						}

					}
				}
			}

		},
		addNewSection: function() {
			var nom = [ "Section "] + [n];
			n++;
			var model = this.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
			var osection ={
                  "sectionNumber": nom,
                  "sectionName": "",
                  "state": "empty",
                  "tables": []
              };
			sections.push(osection);
			model.setProperty("sections", sections);
		
			var list=this.getView().byId("list");
			list.getModel().refresh();
			
			
	
			var oBindingContext = this.getView().getBindingContext();

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			console.log(nom);
			oRouter.navTo("DetailPage2",{
    			section : nom
				});
				console.log(nom);
		},
	
		goToSection: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---MasterPage1").getController();
			var det = sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();        	
			
			var section = oEvent.getSource().mProperties.title;
			console.log("seccc");
			console.log(section);
		
	
			var oRouter = sap.ui.core.UIComponent.getRouterFor(v);
			oRouter.navTo("DetailPage2",{
    			section : section
				});
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
		
		
		onInit: function() {
			var model = this.getOwnerComponent().getModel("sections");
			// create a Model with this data and attach it to the view
           this.getView().addStyleClass("myBackgroundStyle");
			this.getView().byId("list").addStyleClass("listStyle");
            this.getView().setModel(model);
			this.oSF = this.getView().byId("searchField");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("MasterPage1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);