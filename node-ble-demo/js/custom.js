	var arr = ["INSERT", "UPDATE"];
	var count = 0;
	var bool=true;
	var tabname="";	
	$(document).ready(function () {
		$('.next').click(function(){
			bool=(($('.next>span').text())=="UPDATE")?true:false;
			count++;
			if (count == 2) {
				count = 0;
			}
		    $('.next>span').html(arr[count]);
			clearValue();
		});
		$("#editor").on({
			paste: function (e) {
				setTimeout(() => {
					var str=$(this).val();
					var arr=str.split("\n")[0].split("\t");
					if(!bool){
						arr.splice(-1);
					}
					crebox(arr);
				}, 500);
			}
		});
		
	});
	function crebox($a){
		var p = document.createElement("p");
		p.setAttribute("id","p1");
		$a.forEach(function(item,i){
			var txt=document.createTextNode(item);
			var input=document.createElement("input");
			input.setAttribute("type","checkbox");
			input.setAttribute("name","field");
			input.setAttribute("checked","checked");
			input.setAttribute("value",item);
			p.appendChild(txt);
			p.appendChild(input);
		});
		var parent = document.getElementById("mydiv");
		var child = document.getElementById("p1");
		parent.replaceChild(p, child);
	}	
	function Value(){
		//获取input类型是checkBox并且 name="box"选中的checkBox的元素
		var ids = $('input[type=checkbox]');
		var bolarr =new Array();
		ids.each(function (i) {
			bolarr[i]=$(this).prop("checked");
		});
		if(!bool){
			bolarr.splice(bolarr.length,1,bool);
		}
		format(bolarr);
	}
	function format($bolarr){
		tabname = ($('#tabname').val()=="")?"XXX":$('#tabname').val();
		var gg="";
		var da=$("#editor").val().split("\n");
		var a = new Array();
		if(bool){
		//INSERT
			var gg="INSERT INTO " +tabname;
			for(var i=0;i<da.length-1;i++){
				a[i] = new Array();
				var every=da[i].split("\t");
				for(var j=0;j<$bolarr.length;j++){
					a[i][j] = every[j];
					if(i!=0){
						if($bolarr[j]){
							a[i][j] = "'"+every[j]+"'";
						}
					}
					if(a[i][j]==""){
						a[i][j] = "''";
					}
				}
				if(i==0){
					gg=gg+"("+a[i].toString()+")values\n";
				}else{
					gg=gg+"("+a[i].toString()+"),\n";
				}
			}
			gg = gg.substring(0, gg.lastIndexOf(","))+";";
		}else{
		//UPDATE
			for(var i=0;i<da.length-1;i++){
				a[i] = new Array();
				if(i!=0){
					gg=gg+"UPDATE "+tabname+" SET ";
				}
				var every=da[i].split("\t");
				for(var j=0;j<$bolarr.length;j++){
					a[i][j] = every[j];
					if(i!=0){
						if($bolarr[j]){
							a[i][j] = "'"+every[j]+"'";
						}
					}
					if(a[i][j]==""){
						a[i][j] = "''";
					}
					if(i!=0){
						gg=gg+a[0][j];
						if(j==$bolarr.length-1){
							gg=gg+" "+a[i][j]+";";
						}else if(j==$bolarr.length-2){
							gg=gg+"="+a[i][j]+" ";
						}else{
							gg=gg+"="+a[i][j]+",";
						}
					}
				}
				gg=gg+"\n";
			}
		}	
		$("#previewer").val(gg);
		utools.copyText(gg);
	}
	function clearValue(){
		$('#editor').val('');
		$('#previewer').val('');
		$('#tabname').val('');
		replaceEpmty();
	}
	function replaceEpmty(){
		var p = document.createElement("p");
		p.setAttribute("id","p1");
		var txt=document.createTextNode("数据为空");
		p.appendChild(txt);
		var parent = document.getElementById("mydiv");
		var child = document.getElementById("p1");
		parent.replaceChild(p, child);
	}