sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";
var sectionName ="";
var detSection;
	return BaseController.extend("com.sap.build.standard.untitledPrototype.controller.DetailPage2", {
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
		
		
		
		addTable: function() {
		 	console.log(this.sectionName);
		var model = this.getOwnerComponent().getModel("sections");
		var sections = model.getProperty("/sections");
		
		var i=0;
		var t= [];
		var a;
		
		while (i< sections.length) {
			if (sections[i].sectionNumber === this.sectionName) {
				if (sections[i].tables.length === 0) {
					a = "Table1";
				}
				else{
					var previousTable = sections[i].tables[sections[i].tables.length -1].tableNumber;
					var number = parseInt(previousTable.substr(5)) + 1;
					a = ["Table"] + [number];
				}
					
					t= {
						"tableNumber" : a,
						"tableName" : "",
						"variants": []
						};
				var sform = this.getView().byId("Form");
				var input = new sap.m.Input({width:"200px"});
				var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [sections[i].tables.length] + ["/tableName"];
         		console.log(ss);
				input.bindProperty("value",ss);
				var toolbar = new sap.m.Toolbar({height:"3rem", style:"Clear"});
				var b= a + [":"];
				var title = new sap.m.Title({text: b});
				var toolbarSpacer = new sap.m.ToolbarSpacer({width:"10px"});
				var button = new sap.m.Button({icon:"sap-icon://delete", press: this.deleteTable});
				var toolbarSpacer1 = new sap.m.ToolbarSpacer({width:"20px"});

				toolbar.addContent(toolbarSpacer1);
				toolbar.addContent(title);
				toolbar.addContent(toolbarSpacer);
				toolbar.addContent(button);
				
				var fe = new sap.ui.layout.form.FormElement();
				
				fe.addField(toolbar);
				
				var formElement = new sap.ui.layout.form.FormElement();
    			formElement.setLabel("Name");
    			formElement.addField(input);

    	
    			var formElement1 = new sap.ui.layout.form.FormElement();
				formElement1.setLabel("variants");
				var btn = new sap.m.Button({icon:"sap-icon://add", size:"20px", height:"48px", width:"48px", press: this.addVariant});
				formElement1.addField(btn);

    		
    			var fContainer = new sap.ui.layout.form.FormContainer(a);
    		//	fContainer.addFormElement(panel);
    			fContainer.addFormElement(fe);
    			fContainer.addFormElement(formElement);
    			fContainer.addFormElement(formElement1);
    			sections[i].tables.push(t);
    			sform.addFormContainer(fContainer);
    	
			}
			i++;
		}
		model.setProperty("sections", sections);
		},
		
		
		deleteTable: function(oEvent) {
			var fContainer = oEvent.getSource().getParent().getParent().getParent();
			var table = fContainer.sId;
			console.log(table);
			fContainer.destroy();
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
			var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
			var i=0;
			console.log(sections);
			while(i<sections.length ) {
			console.log(v.sectionName);
			if (sections[i].sectionNumber === v.sectionName) {
				
				var tab= [];
				
				for (var j=0;j<sections[i].tables.length;j++) {
					if (sections[i].tables[j].tableNumber !== table) {
					tab.push(sections[i].tables[j]);	
					}
				}
				sections[i].tables = tab;	
			}	
				i++;
			}
			model.setProperty("sections", sections);
			console.log(sections);
		},
		
		
		onAddField: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var ff = oEvent.getSource().getParent();
    		console.log(ff);
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
    		var el = ff.sId;
    		var table = el.split("-")[0];
    		var variant = el.split("-")[1];
    		console.log(table);
    		console.log(variant);
    		var i=0;
    		var j=0;
    		var k=0;
    		var a;
    		var t=[];
    		while (i<sections.length) {
    			console.log("ok1");
    			if (sections[i].sectionNumber === v.sectionName) {
    				j=0;
    				console.log("ok2");
    				while (j<sections[i].tables.length) {
    					console.log("ok3");
    					if (sections[i].tables[j].tableNumber === table) {
    						k=0;
    						console.log("ok4");
    						while (k<sections[i].tables[j].variants.length) {
    						console.log("ok5");
    							if (sections[i].tables[j].variants[k].variantNumber === variant) {
    								if (sections[i].tables[j].variants[k].fields.length === 0) {
    									a= "Field1";
    								}
    								else {
    									var previousField = sections[i].tables[j].variants[k].fields[sections[i].tables[j].variants[k].fields.length -1].fieldNumber;
										var number = parseInt(previousField.substr(5)) + 1;
										a = ["Field"] + [number];
    									
    								}
									t= {
										"fieldNumber" : a,
										"fieldValue" : ""
										};
    								console.log("ok6");
    								var oInput1 = new sap.m.Input({placeholder: "Enter Field", width: "250px"});
									var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/fields/"] + [sections[i].tables[j].variants[k].fields.length] + ["/fieldValue"];
									oInput1.bindProperty("value",ss);
									var name = [table] + ["-"] + [variant] + ["-"] + a;
								 	var formElement = new sap.ui.layout.form.FormElement(name);
						    	    oInput1.addStyleClass("value30");
						    	    var btn1 = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: v.deleteField });
						    		formElement.setLabel("");
						    		formElement.addField(oInput1);
						    		formElement.addField(btn1);
						    		var n = ff.getParent().indexOfFormElement(ff) + 1;
						    		ff.getParent().insertFormElement(formElement,n );
    								sections[i].tables[j].variants[k].fields.push(t);
    							}
    							k++;
    						}
    					}
    					j++;
    				}
    			}
    		i++;	
    		}
    		model.setProperty("sections", sections);
    		console.log(sections);
		},
		
		
		
		deleteField: function(oEvent) {
			var ff=oEvent.getSource().getParent();
			var sId = ff.sId;
			ff.destroy();
			var t =  sId.split("-");
			var table = t[0];
			var variant = t[1];
			var field = t[2];
			var tab=[];
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
			for (var i=0; i<sections.length; i++) {
				if (sections[i].sectionNumber === v.sectionName) {
					for(var j=0; j<sections[i].tables.length; j++) {
						if (sections[i].tables[j].tableNumber === table) {
							for (var k=0; k<sections[i].tables[j].variants.length;k++) {
								if (sections[i].tables[j].variants[k].variantNumber === variant) {
									tab=[];
									for (var m=0; m<sections[i].tables[j].variants[k].fields.length; m++) {
										if (sections[i].tables[j].variants[k].fields[m].fieldNumber !== field) {
											tab.push(sections[i].tables[j].variants[k].fields[m]);
										}	
									}
									sections[i].tables[j].variants[k].fields=tab;
								}
							}
						}	
					}
				}
			}
			model.setProperty("sections", sections);
    		console.log(sections);
		},
		
		
		onAddPreCondition: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var ff = oEvent.getSource().getParent();
    		console.log(ff);
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
    		var el = ff.sId;
    		var table = el.split("-")[0];
    		var variant = el.split("-")[1];
    		console.log(table);
    		console.log(variant);
    		var i=0;
    		var j=0;
    		var k=0;
    		var a;
    		var t=[];
    		while (i<sections.length) {
    			if (sections[i].sectionNumber === v.sectionName) {
    				j=0;
    				while (j<sections[i].tables.length) {
    					if (sections[i].tables[j].tableNumber === table) {
    						k=0;
    						while (k<sections[i].tables[j].variants.length) {
    						console.log("ok5");
    							if (sections[i].tables[j].variants[k].variantNumber === variant) {
    								
    								
    								if (sections[i].tables[j].variants[k].preconditions.length === 0){
    									 a = "PreCondition1";
    								}
    								else {
    									var previousPrecondition = sections[i].tables[j].variants[k].preconditions[sections[i].tables[j].variants[k].preconditions.length -1].preconditionNumber;
										var number = parseInt(previousPrecondition.substr(12)) + 1;
										a = ["PreCondition"] + [number];
    								}

									t= {
										"preconditionNumber" : a,
										"id" : "",
										"key" : "",
										"operator" : "",
										"value" : ""
										};
    								var name1= [table] + ["-"] + [variant] + ["-"] + a + ["-id"];
									var oInput1 = new sap.m.Input({placeholder: "Enter id", width: "250px"});
								 	var formElement = new sap.ui.layout.form.FormElement(name1);
						    	    oInput1.addStyleClass("value30");
						    		var ss1= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/preconditions/"] + [sections[i].tables[j].variants[k].preconditions.length] + ["/id"];
									var btn1 = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: v.deletePrecondition });
									oInput1.bindProperty("value",ss1);
						    		formElement.setLabel("");
						    		formElement.addField(oInput1);
						    		formElement.addField(btn1);

														    		
						    		var name2= [table] + ["-"] + [variant] + ["-"] + a + ["-key"];
						    		var oInput2 = new sap.m.Input({placeholder: "Enter key", width: "250px"});
								 	var formElement2 = new sap.ui.layout.form.FormElement(name2);
						    	    oInput2.addStyleClass("value30");
						    		var ss2= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/preconditions/"] + [sections[i].tables[j].variants[k].preconditions.length] + ["/key"];
									oInput2.bindProperty("value",ss2);
						    		formElement2.setLabel("");
						    		formElement2.addField(oInput2);
						    		
						    		var name3= [table] + ["-"] + [variant] + ["-"] + a + ["-operator"];
						    		var oInput3 = new sap.m.Input({placeholder: "Enter operator", width: "250px"});
								 	var formElement3 = new sap.ui.layout.form.FormElement(name3);
						    	    oInput3.addStyleClass("value30");
						    		var ss3= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/preconditions/"] + [sections[i].tables[j].variants[k].preconditions.length] + ["/operator"];
									oInput3.bindProperty("value",ss3);
						    		formElement3.setLabel("");
						    		formElement3.addField(oInput3);
						    		
						    		var name4= [table] + ["-"] + [variant] + ["-"] + a + ["-value"];
						    		var oInput4= new sap.m.Input({placeholder: "Enter value", width: "250px"});
								 	var formElement4 = new sap.ui.layout.form.FormElement(name4);
						    	    oInput4.addStyleClass("value30");
						    		var ss4= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/preconditions/"] + [sections[i].tables[j].variants[k].preconditions.length] + ["/value"];
									oInput4.bindProperty("value",ss4);
						    		formElement4.setLabel("");
						    		formElement4.addField(oInput4);
						    		
						    		var name5= [table] + ["-"] + [variant] + ["-"] + a + ["-space1"];
								 	var formElement5 = new sap.ui.layout.form.FormElement(name5);
						    		formElement5.setLabel("");
												    
									var name6= [table] + ["-"] + [variant] + ["-"] + a + ["-space2"];
									var formElement6 = new sap.ui.layout.form.FormElement(name6);
						    		formElement6.setLabel("");
						    		
						    		var n = ff.getParent().indexOfFormElement(ff) + 1;
						    		ff.getParent().insertFormElement(formElement,n );
						    		ff.getParent().insertFormElement(formElement2,n+1 );	
						    		ff.getParent().insertFormElement(formElement3,n+2 );	
						    		ff.getParent().insertFormElement(formElement4,n+3 );	
						    		ff.getParent().insertFormElement(formElement5,n+4 );	
						    		ff.getParent().insertFormElement(formElement6,n+5 );	
									sections[i].tables[j].variants[k].preconditions.push(t);
    							}
    							k++;
    						}
    					}
    					j++;
    				}
    			}
    			
    		i++;	
    		}
    		model.setProperty("sections", sections);
		},
		
		
		deletePrecondition: function(oEvent) {
			var ff=oEvent.getSource().getParent();
			var sId = ff.sId;
			console.log(sId);
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
			var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
    		var t= sId.split("-");
    		var table = t[0];
    		var variant = t[1];
    		var precondition = t[2];
    		console.log(table);
    		console.log(variant);
    		console.log(precondition);
    		var name1 = [table] + ["-"] + [variant] + ["-"] + [precondition] +  ["-id"];
    		var name2 = [table] + ["-"] + [variant] + ["-"] + [precondition] + ["-key"];
    		var name3 = [table] + ["-"] + [variant] + ["-"] + [precondition] + ["-operator"];
    		var name4 = [table] + ["-"] + [variant] + ["-"] + [precondition] + ["-value"];
    		var name5 = [table] + ["-"] + [variant] + ["-"] + [precondition] + ["-space1"];
    		var name6 = [table] + ["-"] + [variant] + ["-"] + [precondition] + ["-space2"];

			console.log(sId);
			var formel = ff.getParent().getFormElements();
			var formElement;
			for(var i=0; i<formel.length;i++) {
				if (formel[i].sId === name1 || formel[i].sId === name2 || formel[i].sId === name3 || formel[i].sId === name4 || formel[i].sId === name5 || formel[i].sId === name6 ) {
					formel[i].destroy();
				}
			}
			
    		var tab;
			for (var i=0; i<sections.length; i++) {
				if (sections[i].sectionNumber === v.sectionName) {
					for(var j=0; j<sections[i].tables.length; j++) {
						if (sections[i].tables[j].tableNumber === table) {
							for (var k=0; k<sections[i].tables[j].variants.length;k++) {
								if (sections[i].tables[j].variants[k].variantNumber === variant) {
									tab = [];
									for (var m=0; m<sections[i].tables[j].variants[k].preconditions.length;m++) {
										if (sections[i].tables[j].variants[k].preconditions[m].preconditionNumber !== precondition) {
										tab.push(sections[i].tables[j].variants[k].preconditions[m]);	
										}
									}
								sections[i].tables[j].variants[k].preconditions = tab;
								}
							}
						}	
					}
				}
			}
			model.setProperty("sections", sections);
    		console.log(sections);
		},
		
		
		goToResult: function() {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("DetailPage4",{
    			section : this.sectionName
				});
			
		},
		
		
		deleteVariant: function(oEvent) {
			var ff=oEvent.getSource().getParent().getParent();
		
			var sId = ff.sId;
			console.log("delete variant");
			console.log(sId);
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
			var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
    		var t= sId.split("-");
    		var table = t[0];
    		var variant = t[1];
    		console.log(table);
    		console.log(variant);
    		var name1 = [table] + ["-"] + [variant]+ ["-"];
			var formel = ff.getParent().getFormElements();
			console.log(formel);		
			for(var i=0; i<formel.length;i++) {
				if (formel[i].sId.indexOf(name1)!== -1) {
					formel[i].destroy();
				}
			}
    		var tab;
			for (var i=0; i<sections.length; i++) {
				if (sections[i].sectionNumber === v.sectionName) {
					for(var j=0; j<sections[i].tables.length; j++) {
						if (sections[i].tables[j].tableNumber === table) {
							tab = [];
							for (var k=0; k<sections[i].tables[j].variants.length;k++) {
								if (sections[i].tables[j].variants[k].variantNumber !== variant) {
									tab.push(sections[i].tables[j].variants[k]);
								}	
							}
							sections[i].tables[j].variants = tab;
						}	
					}
				}
			}
			model.setProperty("sections", sections);
    		console.log(sections);
    		console.log(v.getView().byId("Form"));
		},
		
		
			
		addVariant: function (oEvent) {
    	var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    	var ff = oEvent.getSource().getParent();
    	var table=ff.oParent.sId;
    	var model = v.getOwnerComponent().getModel("sections");
		var sections = model.getProperty("/sections");
    	console.log(sections);
		var i=0;
		var variant = [];
		var a;
		while (i<sections.length) {
			if (sections[i].sectionNumber === v.sectionName) {
				for (var j=0; j<sections[i].tables.length; j++) {
					if (table === sections[i].tables[j].tableNumber) {
						if (sections[i].tables[j].variants.length === 0) {
							a = "Variant1";
						}
						else {
							var previousVariant = sections[i].tables[j].variants[sections[i].tables[j].variants.length -1].variantNumber;
							var number = parseInt(previousVariant.substr(7)) + 1;
							a = ["Variant"] + [number];
						}
					
						console.log(a);
						variant = {
							"variantNumber" : a,
							"fields" : [],
							"sqlStatement" : "",
							"preconditions": [],
							"template": ""
						};
					
						var n = ff.getParent().indexOfFormElement(ff) + 1;
						var idt=[table] + ["-"] +  [a] + "-title";
						
	
						var toolbar = new sap.m.Toolbar({height:"3rem", style:"Clear"});
						var b= ["                 "] + a + [":"];
						
						var title = new sap.m.Title({text: b, level: "H4"});
						var toolbarSpacer = new sap.m.ToolbarSpacer({width:"10px"});
						var button = new sap.m.Button({icon:"sap-icon://delete", press: v.deleteVariant});

						toolbar.addContent(title);
						toolbar.addContent(toolbarSpacer);
						toolbar.addContent(button);
						
						var fe = new sap.ui.layout.form.FormElement(idt);
					//	fe.setLabel(b);
						fe.addField(toolbar);
								
								
						
						var id1=[table] + ["-"] +  [a] + "-el1";
						var formElement2 = new sap.ui.layout.form.FormElement(id1);
						var btn1 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: v.onAddField});
						//var icon = new sap.ui.core.Icon({src:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: v.deleteVariant });
						formElement2.setLabel("fields");
						formElement2.addField(btn1);
					//	formElement2.addField(icon);

			
						var id2=[table] + ["-"] +  [a] + "-el2";
						var formElement3 = new sap.ui.layout.form.FormElement(id2);
						var btn2 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: v.onAddSql});
						formElement3.setLabel("sqlStatment");
						formElement3.addField(btn2);
						
						
						var id3=[table] + ["-"] +  [a] + "-el3";
						var formElement4 = new sap.ui.layout.form.FormElement(id3);
						var btn3 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: v.onAddPreCondition});
						formElement4.setLabel("preConditions");
						formElement4.addField(btn3);
					
					
						var id4=[table] + ["-"] +  [a] + "-el4";
						var formElement5 = new sap.ui.layout.form.FormElement(id4);
						var btn4 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: v.onAddTemplate});
						formElement5.setLabel("template");
						formElement5.addField(btn4);
							
				
						var id5=[table] + ["-"] +  [a] + "-el5";
						var formElement6 = new sap.ui.layout.form.FormElement(id5);
						formElement6.setLabel("");
						
						var id6=[table] + ["-"] +  [a] + "-el6";
						var formElement7 = new sap.ui.layout.form.FormElement(id6);
						formElement7.setLabel("");
					
					
						var id7=[table] + ["-"] +  [a] + "-el7";
						var formElement8 = new sap.ui.layout.form.FormElement(id7);
						formElement8.setLabel("");


				    	ff.getParent().insertFormElement(fe,n );
				    	ff.getParent().insertFormElement(formElement2,n+1 );
				    	ff.getParent().insertFormElement(formElement3,n+2 );
				    	ff.getParent().insertFormElement(formElement4,n+3 );
				    	ff.getParent().insertFormElement(formElement5,n+4 );
						ff.getParent().insertFormElement(formElement6,n+5 );	
						ff.getParent().insertFormElement(formElement7,n+6 );
						ff.getParent().insertFormElement(formElement8,n+7 );
						var sform = v.getView().byId("Form");
						sections[i].tables[j].variants.push(variant);
					}
				}
			}
			i++;
		}
		model.setProperty("sections", sections);
		},
		
		
		
		
		onAddSql: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var ff = oEvent.getSource().getParent();
    		console.log(ff);
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
    		var el = ff.sId;
    		var table = el.split("-")[0];
    		var variant = el.split("-")[1];
    		console.log(table);
    		console.log(variant);
    		var i=0;
    		var j=0;
    		var k=0;
    		var a;
    		var t=[];
    		while (i<sections.length) {
    			console.log("ok1");
    			if (sections[i].sectionNumber === v.sectionName) {
    				j=0;
    				console.log("ok2");
    				while (j<sections[i].tables.length) {
    					console.log("ok3");
    					if (sections[i].tables[j].tableNumber === table) {
    						k=0;
    						console.log("ok4");
    						while (k<sections[i].tables[j].variants.length) {
    						console.log("ok5");
    							if (sections[i].tables[j].variants[k].variantNumber === variant) {
    								console.log("ok6");
							      		oEvent.getSource().destroy();
							    		var oInput1 = new sap.m.Input({placeholder: "Enter sqlStatement", width: "250px"});
									 	var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/sqlStatement"];
										oInput1.bindProperty("value",ss);
										
										var name = [table] + ["-"] + [variant] + ["-"] + "sqlStatement";
									 	
									 	var formElement = new sap.ui.layout.form.FormElement(name);
									 	var btn1 = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: v.deleteSql });
							    	    oInput1.addStyleClass("value30");
							    		formElement.setLabel("");
							    		formElement.addField(oInput1);
							    		formElement.addField(btn1);
							    		var n = ff.getParent().indexOfFormElement(ff) + 1;
							    		ff.getParent().insertFormElement(formElement,n );
    							}
    							k++;
    						}
    					}
    					j++;
    				}
    			}
    		i++;	
    		}
    		model.setProperty("sections", sections);	
		},
		
		
		
		deleteSql: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
			var ff=oEvent.getSource().getParent();
			var sId = ff.sId;
			console.log(sId);
			var formel = ff.getParent().getFormElements();
			ff.destroy();
			var t =  sId.split("-");
			var table = t[0];
			var variant = t[1];
			var name = [table] + ["-"] +  [variant] + "-el2";
			var formElement;
			for(var i=0; i<formel.length;i++) {
				if (formel[i].sId === name) {
					formElement = formel[i];
				}
			}
			var btn2 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: v.onAddSql});
			formElement.addField(btn2);
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
			for (var i=0; i<sections.length; i++) {
				if (sections[i].sectionNumber === v.sectionName) {
					for(var j=0; j<sections[i].tables.length; j++) {
						if (sections[i].tables[j].tableNumber === table) {
							for (var k=0; k<sections[i].tables[j].variants.length;k++) {
								if (sections[i].tables[j].variants[k].variantNumber === variant) {
									sections[i].tables[j].variants[k].sqlStatement="";
								}
							}
						}	
					}
				}
			}
			model.setProperty("sections", sections);
    		console.log(sections);
			
		},
		
		
		
			onAddTemplate: function(oEvent) {
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var ff = oEvent.getSource().getParent();
    		console.log(ff);
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
    		var el = ff.sId;
    		var table = el.split("-")[0];
    		var variant = el.split("-")[1];
    		console.log(table);
    		console.log(variant);
    		var i=0;
    		var j=0;
    		var k=0;
    		var a;
    		var t=[];
    		while (i<sections.length) {
    			console.log("ok1");
    			if (sections[i].sectionNumber === v.sectionName) {
    				j=0;
    				console.log("ok2");
    				while (j<sections[i].tables.length) {
    					console.log("ok3");
    					if (sections[i].tables[j].tableNumber === table) {
    						k=0;
    						console.log("ok4");
    						while (k<sections[i].tables[j].variants.length) {
    						console.log("ok5");
    							if (sections[i].tables[j].variants[k].variantNumber === variant) {
    								
    								console.log("ok6");
			
									
							      		oEvent.getSource().destroy();
							    		var oInput1 = new sap.m.Input({placeholder: "Enter Template", width: "250px"});
									 	var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [k] + ["/template"];
										oInput1.bindProperty("value",ss);
									 	var name = [table] + ["-"] + [variant] + ["-"] + "template";
									 	var formElement = new sap.ui.layout.form.FormElement(name);
							    	   	var btn1 = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: v.deleteTemplate });
							    	    oInput1.addStyleClass("value30");
							    		formElement.setLabel("");
							    		formElement.addField(oInput1);
										formElement.addField(btn1);

							    		var n = ff.getParent().indexOfFormElement(ff) + 1;
							    		ff.getParent().insertFormElement(formElement,n );
    							}
    							k++;
    						}
    					}
    					j++;
    				}
    			}
    		i++;	
    		}
    		model.setProperty("sections", sections);	
		},
		
		deleteTemplate: function(oEvent) {
		var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
			var ff=oEvent.getSource().getParent();
			var sId = ff.sId;
			console.log(sId);
			var formel = ff.getParent().getFormElements();
			ff.destroy();
			var t =  sId.split("-");
			var table = t[0];
			var variant = t[1];
			var name = [table] + ["-"] +  [variant] + "-el4";
			console.log("table:");
			console.log(table);
			console.log("variant:");
			console.log(variant);
			var formElement;
			for(var i=0; i<formel.length;i++) {
				if (formel[i].sId === name) {
					formElement = formel[i];
				}
			}
			var btn2 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: v.onAddTemplate});
			formElement.addField(btn2);
			var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();
    		var model = v.getOwnerComponent().getModel("sections");
			var sections = model.getProperty("/sections");
			for (var i=0; i<sections.length; i++) {
				if (sections[i].sectionNumber === v.sectionName) {
					for(var j=0; j<sections[i].tables.length; j++) {
						if (sections[i].tables[j].tableNumber === table) {
							for (var k=0; k<sections[i].tables[j].variants.length;k++) {
								if (sections[i].tables[j].variants[k].variantNumber === variant) {
									sections[i].tables[j].variants[k].template="";
								}
							}
						}	
					}
				}
			}
			model.setProperty("sections", sections);
    		console.log(sections);
				
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
		
		
		
		
		resetSection: function() {
		var model = this.getOwnerComponent().getModel("sections");
		var sections = model.getProperty("/sections");
		console.log(sections);
		var k=0;
			while ( k<sections.length) {
				if (this.sectionName === sections[k].sectionNumber) {
					var sform = this.getView().byId("Form");
					console.log(sform);
					var containers = sform.getFormContainers();
					for (var i=1; i<containers.length; i++) {
						containers[i].destroy();
						sform.removeFormContainer(containers[i]);
					}
						var name = this.getView().byId("name");
    					name.setValue("");
						sections[k].tables = [];
						sections[k].sectionName="";
				}
				k++;
			}
		},
		
		
		
		
		goToSection: function() {
		var model = this.getOwnerComponent().getModel("sections");
		var sections = model.getProperty("/sections");
		var sform = this.getView().byId("Form");
		console.log(this.sectionName);
		var i=0;
		while (i<sections.length) {
			if (sections[i].sectionNumber === this.sectionName) {
				for (var j=0; j<sections[i].tables.length;j++) {
				var input = new sap.m.Input({width:"200px"});
				var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/tableName"];
         		console.log(ss);
				input.bindProperty("value",ss);
				
				
				var toolbar = new sap.m.Toolbar({height:"3rem", style:"Clear"});
				var b= [sections[i].tables[j].tableNumber] + [" :"];
				var title = new sap.m.Title({text: b});
				var toolbarSpacer = new sap.m.ToolbarSpacer({width:"10px"});
				var button = new sap.m.Button({icon:"sap-icon://delete", press: this.deleteTable});
				var toolbarSpacer1 = new sap.m.ToolbarSpacer({width:"20px"});

				toolbar.addContent(toolbarSpacer1);
				toolbar.addContent(title);
				toolbar.addContent(toolbarSpacer);
				toolbar.addContent(button);
				
				var fe = new sap.ui.layout.form.FormElement();
				fe.addField(toolbar);
				
				
				//var btn = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: this.deleteTable });
				var formElement = new sap.ui.layout.form.FormElement();
    			formElement.setLabel("Name");
    			formElement.addField(input);
    			//formElement.addField(btn);
    	
    			var formElement1 = new sap.ui.layout.form.FormElement();
				formElement1.setLabel("variants");
				var btn = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: this.addVariant});
				formElement1.addField(btn);
	
    			var fContainer = new sap.ui.layout.form.FormContainer(sections[i].tables[j].tableNumber);
    			fContainer.addFormElement(fe);
    			fContainer.addFormElement(formElement);
    			fContainer.addFormElement(formElement1);
    			sform.addFormContainer(fContainer);
   
				if (sections[i].tables[j].variants.length > 0) {
					for (var m=0; m<sections[i].tables[j].variants.length;m++) {
					
						var b = [sections[i].tables[j].variants[m].variantNumber] + [" :"];
						var idt=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-title";
						
						var toolbar = new sap.m.Toolbar({height:"3rem", style:"Clear"});
					
						var title = new sap.m.Title({text: b, level: "H4"});
						var toolbarSpacer = new sap.m.ToolbarSpacer({width:"10px"});
						var button = new sap.m.Button({icon:"sap-icon://delete", press: this.deleteVariant});

						toolbar.addContent(title);
						toolbar.addContent(toolbarSpacer);
						toolbar.addContent(button);
						
						var fe = new sap.ui.layout.form.FormElement(idt);
					//	fe.setLabel(b);
						fe.addField(toolbar);
						
						
						var n = fContainer.indexOfFormElement(formElement1) + 1;
						var id1=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el1";
						var formElement2 = new sap.ui.layout.form.FormElement(id1);
						var btn1 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: this.onAddField});
						//var btn = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: this.deleteVariant });
						formElement2.setLabel("fields");
						formElement2.addField(btn1);
						//formElement2.addField(btn);
						fContainer.insertFormElement(fe,n);
						fContainer.insertFormElement(formElement2,n+1 );
						
						if (sections[i].tables[j].variants[m].fields.length > 0) {
							for (var d=0; d<sections[i].tables[j].variants[m].fields.length ; d++) {
    								
    								var oInput1 = new sap.m.Input({placeholder: "Enter Field", width: "250px"});
									var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/fields/"] + [d] + ["/fieldValue"];
									oInput1.bindProperty("value",ss);
								 	var btn1 = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: this.deleteField });
						    	
								 	var name = [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + [sections[i].tables[j].variants[m].fields[d].fieldNumber];
								 	var formElement = new sap.ui.layout.form.FormElement(name);
						    	    oInput1.addStyleClass("value30");
						    		formElement.setLabel("");
						    		formElement.addField(oInput1);
						    		formElement.addField(btn1);

						    		n=n+2;
						    		fContainer.insertFormElement(formElement,n);
							}
						}
						if (sections[i].tables[j].variants[m].sqlStatement === "") {
							var id2=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el2";
							var formElement3 = new sap.ui.layout.form.FormElement(id2);
							var btn2 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: this.onAddSql});
							formElement3.setLabel("sqlStatment");
							formElement3.addField(btn2);
							fContainer.insertFormElement(formElement3,n+1 );
						}
						else if (sections[i].tables[j].variants[m].sqlStatement !== "") {
							var id2=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el2";
							var formElement3 = new sap.ui.layout.form.FormElement(id2);
							formElement3.setLabel("sqlStatment");
							fContainer.insertFormElement(formElement3,n+1 );
							
							
							var nameSql = [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + "sqlStatement";
							var btn = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: this.deleteSql });

							var oInput1 = new sap.m.Input({placeholder: "Enter sqlStatement", width: "250px"});
							var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/sqlStatement"];
							oInput1.bindProperty("value",ss);
							var formElement = new sap.ui.layout.form.FormElement(nameSql);
							oInput1.addStyleClass("value30");
							formElement.setLabel("");
							formElement.addField(oInput1);
							formElement.addField(btn);

							fContainer.insertFormElement(formElement,n+2 );
							n++;
						}
						var id3=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el3";
						var formElement4 = new sap.ui.layout.form.FormElement(id3);
						var btn3 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: this.onAddPreCondition});
						formElement4.setLabel("preConditions");
						formElement4.addField(btn3);
						fContainer.insertFormElement(formElement4,n+2 );
				if (sections[i].tables[j].variants[m].preconditions.length >0) {
					for (var f=0; f<sections[i].tables[j].variants[m].preconditions.length ;f++) {
						var	a = [sections[i].tables[j].variants[m].preconditions[f].preconditionNumber];
						    
						    		var btn = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: this.deletePrecondition });
						    		var name1= [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + a + ["-id"];
						    		var oInput1 = new sap.m.Input({placeholder: "Enter id", width: "250px"});
								 	var formElement = new sap.ui.layout.form.FormElement(name1);
						    	    oInput1.addStyleClass("value30");
						    		var ss1= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/preconditions/"] + [f] + ["/id"];
									oInput1.bindProperty("value",ss1);
						    		formElement.setLabel("");
						    		formElement.addField(oInput1);
						    		formElement.addField(btn);
						  fContainer.insertFormElement(formElement,n+3 );
						  n++;
						    		var oInput2 = new sap.m.Input({placeholder: "Enter key", width: "250px"});
								 	var name2= [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + a + ["-key"];
								 	var formElement2 = new sap.ui.layout.form.FormElement(name2);
						    	    oInput2.addStyleClass("value30");
						    		var ss2= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/preconditions/"] + [f] + ["/key"];
									oInput2.bindProperty("value",ss2);
						    		formElement2.setLabel("");
						    		formElement2.addField(oInput2);
						    	 fContainer.insertFormElement(formElement2,n+3 );
						  n++;	
						    		var name3= [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + a + ["-operator"];
						    		var oInput3 = new sap.m.Input({placeholder: "Enter operator", width: "250px"});
								 	var formElement3 = new sap.ui.layout.form.FormElement(name3);
						    	    oInput3.addStyleClass("value30");
						    		var ss3= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/preconditions/"] + [f] + ["/operator"];
									oInput3.bindProperty("value",ss3);
						    		formElement3.setLabel("");
						    		formElement3.addField(oInput3);
						    		 fContainer.insertFormElement(formElement3,n+3 );
						  n++;
						  			var name4= [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + a + ["-value"];
						    		var oInput4= new sap.m.Input({placeholder: "Enter value", width: "250px"});
								 	var formElement4 = new sap.ui.layout.form.FormElement(name4);
						    	    oInput4.addStyleClass("value30");
						    		var ss4= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/preconditions/"] + [f] + ["/value"];
									oInput4.bindProperty("value",ss4);
						    		formElement4.setLabel("");
						    		formElement4.addField(oInput4);
						    		 fContainer.insertFormElement(formElement4,n+3 );
						  n++;
						  			var name5= [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + a + ["-space1"];
								 	var formElement5 = new sap.ui.layout.form.FormElement(name5);
						    		formElement5.setLabel("");
						
									var name6= [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + a + ["-space2"];
									var formElement6 = new sap.ui.layout.form.FormElement(name6);
						    		formElement6.setLabel("");
							    		 fContainer.insertFormElement(formElement5,n+4 );
						  n++;
						   fContainer.insertFormElement(formElement6,n+5 );
						  n++;
					}
				}
					if (sections[i].tables[j].variants[m].template === "") {
						var id4=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el4";
						var formElement5 = new sap.ui.layout.form.FormElement(id4);
						var btn4 = new sap.m.Button({icon:"sap-icon://add", size:"35px", height:"48px", width:"48px", press: this.onAddTemplate});
						formElement5.setLabel("template");
						formElement5.addField(btn4);
						fContainer.insertFormElement(formElement5,n+3 ); }
					else if (sections[i].tables[j].variants[m].template !== "") { 
						var id4=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el4";
						var formElement5 = new sap.ui.layout.form.FormElement(id4);
						formElement5.setLabel("template");
						fContainer.insertFormElement(formElement5,n+3 );
						
						var nameTemplate = [sections[i].tables[j].tableNumber] + ["-"] + [sections[i].tables[j].variants[m].variantNumber] + ["-"] + "template";
						console.log(nameTemplate);
						var oInput1 = new sap.m.Input({placeholder: "Enter Template", width: "250px"});
						var ss= ["sections>/sections/"] +[i] + ["/tables/"] + [j] + ["/variants/"] + [m] + ["/template"];
						oInput1.bindProperty("value",ss);
						
						var formElement = new sap.ui.layout.form.FormElement(nameTemplate);
					 	var btn1 = new sap.m.Button({icon:"sap-icon://delete", size:"20px", height:"48px", width:"48px", press: this.deleteTemplate });
						oInput1.addStyleClass("value30");
						formElement.setLabel("");
						formElement.addField(oInput1);
						formElement.addField(btn1);
						fContainer.insertFormElement(formElement,n+4 );
						n++;
					}

						var id5=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el5";
						var formElement6 = new sap.ui.layout.form.FormElement(id5);
						formElement6.setLabel("");
						
						var id6=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el6";
						var formElement7 = new sap.ui.layout.form.FormElement(id6);
						formElement7.setLabel("");
					
						var id7=[sections[i].tables[j].tableNumber] + ["-"] +  [sections[i].tables[j].variants[m].variantNumber] + "-el7";
						var formElement8 = new sap.ui.layout.form.FormElement(id7);
						formElement8.setLabel("");
	
						fContainer.insertFormElement(formElement6,n+4 );	
						fContainer.insertFormElement(formElement7,n+5 );
						fContainer.insertFormElement(formElement8,n+6 );
					}
				}
				}
			}
			i++;
		}
		},
		
		
		
		
		onInit: function() {
			var model = this.getOwnerComponent().getModel("sections");
			// create a Model with this data and attach it to the view
            this.getView().setModel(model);
           var sections = model.getProperty("/sections");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oView = this.getView();
			var sec;
			var s;
			var oViewModel;
			this.oRouter.attachRouteMatched(function(oEvent) {
        		   	var v =sap.ui.getCore().byId("application-BUILD-prototype-component---DetailPage2").getController();        		sec = oEvent.getParameter("name");
        			if (sec === "DetailPage2") {
            			s = oEvent.getParameter("arguments").section;
         				v.sectionName = s;
         				var name = v.getView().byId("name");
         				var nb = s.split(" ")[1] -1 ;
         				var ss= ["sections>/sections/"] +[nb] + ["/sectionName"];
         				console.log(ss);
						name.bindProperty("value",ss);
				var k=0;
				 while ( k<sections.length) {
					if (s === sections[k].sectionNumber) {
							 	var sform = v.getView().byId("Form");
								var containers = sform.getFormContainers();
								
								for (var i=1; i<containers.length; i++) {
									containers[i].destroy();
									sform.removeFormContainer(containers[i]);
								}
								if (sections[k].tables.length > 0) {
									console.log("section non vide donc reconstruction");
									v.goToSection();
								}
										}
					k++;
				}
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