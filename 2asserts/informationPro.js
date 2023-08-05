/**
 * @description 结果页面js   扫码验证显示信息详情页面
 * @author 易文俊
 * @since 2017-08-03
 */
var Information = function() {
	var t = {
		initEvent : function() {
			$(document).on("click", "#return-search", function() {
				top.location.replace("searchPro.html?reqNo=" + $("#reqNoHidden").val());
			});
		},
		loadInformationData : function() {
		    var reqNo = $("#reqNoHidden").val();
			Ajax.call({
				url : "licRequest/getPro.html",
				p : {
					reqNo : reqNo,
					contentType: "application/x-www-form-urlencoded; charset=utf-8"
				},
				f : function(data) {
					if (data && data.code == "0000" && data.requestInfo.REQ_STATUS == "52" && data.requestInfo.EFFECTIVE == "1") {
						var info = data.requestInfo;
                        //许可证是否失效     1有效   0无效                   
                        var effective = info.EFFECTIVE;
                        if(effective == "1"){
                            $("#msg").css('display','block');
                        } 
						// 基本信息
						$("#reqNo").html(info.P_NO);						
						//通行次数
						var cishu  = info.REQ_TYPE;
						if(cishu == "1"){
						    $("#passCount").html("单次");
						} else if(cishu == "2"){
						    $("#passCount").html("多次");
						}
						//通行日期
						$("#passDate").html(info.PASS_DATE);						
						//承运单位
						$("#certName").html(info.APPLICANT_NAME);						
						//经营许可证号
						$("#orgCertNo").html(info.ORG_CERT_NO.replace(/(.*?\d{2})(\d+)(\d{4}.*?)/g,'$1****$3'));						
						// 途经省份
						$("#passDists").html(info.DIST_NAME);
						//通行路线
						$("#roads").html("</br>" + info.ROADS);	                        
						//货物信息
						$("#cargoInfo").html(info.CARGO_NAME);
						$("#cargoWeight").html(t.kgTodun(info.CARGO_WEIGHT) + "吨");
						var str = info.CARGO_LWH.split("×");
						$("#cargoOutline").html(t.mmTom(str[0]) + " × " + t.mmTom(str[1]) + " × " + t.mmTom(str[2] ));
						// 车货情况
						$("#totalWeight").html(t.kgTodun(info.TOTAL_WEIGHT) + "吨");
						var strs = info.TOTAL_LWH.split("×");
						$("#totalOutline").html(t.mmTom(strs[0]) + " × " + t.mmTom(strs[1]) + " × " + t.mmTom(strs[2]));
						$("#axlesLoad").html(info.AXLES_LOAD);						
						// 车辆信息
						$("#vehicleNo").html(info.TRACTOR_VEHICLE_NO);
						$("#model").html(info.TRACTOR_VEHICLE_MODEL);
						$("#vehWeight").html(t.kgTodun(info.TRACTOR_VEHICLE_WEIGHT) + "吨");
						$("#hanvehicleNo").html(info.TRAILER_VEHICLE_NO);
						$("#hanmodel").html(info.TRAILER_VEHICLE_MODEL);
						$("#hanvehWeight").html(t.kgTodun(info.TRAILER_VEHICLE_WEIGHT) + "吨");
						
						/*$("#box_qrcode").show();
                        t.generateQRcode(info.REQ_NO);*/
					} else {
						alert("未查询到数据，请确认许可证号是否正确");
						top.location.replace("searchPro.html?reqNo=" + $("#reqNoHidden").val());
					}
				}
			});
		},

		toFixed : function (n, fixed) {
		     if(typeof n !=='number'){
		      return n
		     }
		     fixed = fixed || 2
		        var sN = '' + n
		        var reg = new RegExp("\\d+\\.\\d{" + (fixed + 1) + "}")
		        var s = sN.match(reg)
		        var diff = 1 / Math.pow(10, fixed)
		        if (s) {
		            var val = s[0]
		            var len = val.length
		            var v = val[len-1]
		            n = +val.substring(0, len-1)
		            if (v >= 5) {
		                n += diff
		                n=+n.toFixed(fixed)
		            }
		        }
		     	n=n.toFixed(fixed)
		        return n
		    },
		mmTom : function(value) {
			if (!value) {
				return "--";
			}
			var value = (parseFloat(value) * 100) / 100000;
			var xsd = t.toFixed(value,2);
			return xsd;
		},
		kgTodun : function(value) {			if (!value) {
				return "--";
			}
			var value = (parseFloat(value) * 100) / 100000;
			var xsd = t.toFixed(value,2);
			return xsd;
		},
        transDists : function(passDists,isProvincial) {
            var dists = [ {
                "distCode" : "110000",
                "distName" : "北京市"
            }, {
                "distCode" : "120000",
                "distName" : "天津市"
            }, {
                "distCode" : "130000",
                "distName" : "河北省"
            }, {
                "distCode" : "140000",
                "distName" : "山西省"
            }, {
                "distCode" : "150000",
                "distName" : "内蒙古自治区"
            }, {
                "distCode" : "210000",
                "distName" : "辽宁省"
            }, {
                "distCode" : "220000",
                "distName" : "吉林省"
            }, {
                "distCode" : "230000",
                "distName" : "黑龙江省"
            }, {
                "distCode" : "310000",
                "distName" : "上海市"
            }, {
                "distCode" : "320000",
                "distName" : "江苏省"
            }, {
                "distCode" : "330000",
                "distName" : "浙江省"
            }, {
                "distCode" : "340000",
                "distName" : "安徽省"
            }, {
                "distCode" : "350000",
                "distName" : "福建省"
            }, {
                "distCode" : "360000",
                "distName" : "江西省"
            }, {
                "distCode" : "370000",
                "distName" : "山东省"
            }, {
                "distCode" : "410000",
                "distName" : "河南省"
            }, {
                "distCode" : "420000",
                "distName" : "湖北省"
            }, {
                "distCode" : "430000",
                "distName" : "湖南省"
            }, {
                "distCode" : "440000",
                "distName" : "广东省"
            }, {
                "distCode" : "450000",
                "distName" : "广西壮族自治区"
            }, {
                "distCode" : "460000",
                "distName" : "海南省"
            }, {
                "distCode" : "500000",
                "distName" : "重庆市"
            }, {
                "distCode" : "510000",
                "distName" : "四川省"
            }, {
                "distCode" : "520000",
                "distName" : "贵州省"
            }, {
                "distCode" : "530000",
                "distName" : "云南省"
            }, {
                "distCode" : "540000",
                "distName" : "西藏自治区"
            }, {
                "distCode" : "610000",
                "distName" : "陕西省"
            }, {
                "distCode" : "620000",
                "distName" : "甘肃省"
            }, {
                "distCode" : "630000",
                "distName" : "青海省"
            }, {
                "distCode" : "640000",
                "distName" : "宁夏回族自治区"
            }, {
                "distCode" : "650000",
                "distName" : "新疆维吾尔自治区"
            }, {
                "distCode" : "710000",
                "distName" : "台湾省"
            }, {
                "distCode" : "810000",
                "distName" : "香港特别行政区"
            }, {
                "distCode" : "820000",
                "distName" : "澳门特别行政区"
            } ];
            var distStr = "";
            var distArray = new Array();
            if(passDists != ""){
                distArray = passDists.split(","); 
            }
            if(isProvincial == "1"){
            	for(i=0;i<distArray.length ;i++ ){
                    for(j=0;j<dists.length; j++){
                        if(distArray[i].substr(0,2) == dists[j].distCode.substr(0,2)){
                            distStr += dists[j].distName + ",";
                        }
                    }
                }
            } else {
            	for(j=0;j<dists.length; j++){
                    if(distArray[0].substr(0,2) == dists[j].distCode.substr(0,2)){
                        distStr = dists[j].distName + ",";
                    }
                }
            }
             
            
            distStr = distStr.substring(0,distStr.length-1)
            return distStr;
        },
		prImg: function (){
			var imgsurl=[];
			var nowurl='';
			var imgObj= $("img");
			for(var i=0;i<imgObj.length;i++){
				imgsurl[i]=imgObj[i].src;
				imgObj[i].onclick=function(){
					nowurl=this.src;
					wx.previewImage({
						current: nowurl,
						urls: imgsurl
					});	
				}
			}
		},
        //中文编码格式转换
        utf16to8 : function (str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
      //生成二维码
        generateQRcode : function(reqNo){
            $("#qrcode").qrcode({ 
                //render: "table",  渲染方式有table方式（IE兼容）和canvas方式
                width: 180, //宽度 
                height:180, //高度 
                text: t.utf16to8(reqNo), //内容 
                typeNumber:-1,//计算模式
                correctLevel:1,//二维码纠错级别
                background:"#ffffff",//背景颜色
                foreground:"#000000"  //二维码颜色

            });
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            $("#qrcode").css("left",w/2-90);
        }
	}
	return t;
}();