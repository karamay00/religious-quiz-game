class AESEncryptUtil {
	private static aesKey: string;
	private static encryptId: string;
	public static getUserInfo(loadingView: LoadingUI, stage) {
		let search = window.location.search;
		let params = getSearchString('params', search); //结果：2
		//key(需要检索的键） url（传入的需要分割的url地址，例：?id=2&age=18）
		function getSearchString(key, Url) {
			let str = Url;
			str = str.substring(1, str.length); // 获取URL中?之后的字符（去掉第一位的问号）
			// 以&分隔字符串，获得类似name=xiaoli这样的元素数组
			let arr = str.split("&");
			let obj = new Object();
			// 将每一个数组元素以=分隔并赋给obj对象
			for (let i = 0; i < arr.length; i++) {
				let tmp_arr = arr[i].split("=");
				obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
			}
			return obj[key];
		}
		let key = CryptoJS.enc.Utf8.parse('wjyg12347890WJYG');
		let iv = CryptoJS.enc.Utf8.parse('wjygWJYG12347890');


		let custId: string;
		let headerImage: string;
		let version: string;
		let plat: string;
		let token: string;
		let nickName: string;
		let EToken: string;
		let accountName: string;

		if (params) {
			let decryptJson = JSON.parse(CryptoJS.AES.decrypt(params, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8));
			console.log("解密前=" + params + "---解密后=" + JSON.stringify(decryptJson));
			custId = decryptJson['custId'];
			headerImage = decryptJson['headerImage'];
			version = decryptJson['version'];
			plat = decryptJson['plat'];
			token = decryptJson['token'];
			nickName = decryptJson['nickName'];
			EToken = decryptJson['EToken'];
			accountName = decryptJson['accountName'];
		} else {
			console.log("网址" + window.location + "中没有params的正确参数");
			custId = "19627107";//8241608  19627107  19627337  19627704  19635978  19639090
			headerImage = "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/96";
			version = "0.0.0";
			plat = "iOS";
			token = "UW4oW/IVX1ZvtS7tdhVeypwnXj17sQg/SecAos9LV/ev8ImhmVCS9ncwsOREHsce";
			nickName = "大白";
			EToken = "21C2240B89514B1F1AEB53C1B6AEFFFF0DADFABA4BF526A52EB84B412295E00C8D3F441D5BAB1186750DE40CAFAFDA3C";
			accountName = "13222222222";
		}

		let bytes = this.stringToByte("DC0535352D6921&!:095A808D36EB8!!");
		let a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let i = 0;
		for (let j = 0; j < bytes.length; j++) {
			a[i++ % 16] ^= bytes[j];
		}

		this.aesKey = CryptoJS.enc.Utf8.parse(this.byteToString(a));
		this.encryptId = CryptoJS.AES.encrypt(custId, this.aesKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).ciphertext;

		console.log("this.encryptId=" + this.encryptId);

		Utils.userInfo['id'] = custId;
		Utils.userInfo['icon_url'] = headerImage;
		Utils.userInfo['version'] = version;
		Utils.userInfo['plat'] = plat;
		Utils.userInfo['token'] = token;
		Utils.userInfo['name'] = nickName;
		Utils.userInfo['EToken'] = EToken;
		Utils.userInfo['account_name'] = accountName;
		Utils.userInfo['encryptId'] = this.encryptId;
		//alert("准备跟服务器发信息，共1层");






		let stri = {
			"custId": "" + this.encryptId,
			"oneGameId": "GAME2021-196277041627976232",
			"resultScore": 40,
			"detailedResultList": [{
				"qid": "G21-0001",
				"rightKey": "394",
				"rightCode": "B",
				"userResultKey": "393",
				"userResultCode": "A",
				"title": "小兔子几只耳朵"
			},
			{
				"qid": "G21-0002",
				"rightKey": "397",
				"rightCode": "B",
				"userResultKey": "396",
				"userResultCode": "A",
				"title": "小猫两只耳朵"
			},
			{
				"qid": "G21-0003",
				"rightKey": "403",
				"rightCode": "D",
				"userResultKey": "402",
				"userResultCode": "C",
				"title": "小兔子四只腿"
			},
			{
				"qid": "G21-0004",
				"rightKey": "407",
				"rightCode": "D",
				"userResultKey": "407",
				"userResultCode": "D",
				"title": "小猫四只腿"
			},
			{
				"qid": "G21-0005",
				"rightKey": "411",
				"rightCode": "D",
				"userResultKey": "411",
				"userResultCode": "D",
				"title": "小马四只腿"
			}
			]
		};

/*

		let temp = JSON.stringify(stri);

		///console.log("0-0hjhjjhhjthis.encryptId=" + this.encryptId);
		//questionList rankingMsg saveData
		///console.log("9999Utils.userInfo.icon_url=="+Utils.userInfo.name+"---",Utils.userInfo.icon_url);
		this.httpRequestPost(JSON.stringify({ custId: "" + this.encryptId }), "login", (result) => {
			//alert("第1层读取返回,共1层");
			let js: JSON = JSON.parse(result);

			//Utils.userInfo['icon_url'] = js['data']['splashUrl'];
			//Utils.userInfo['name'] = js['data']['totalScore'];
		
			//console.log("js['data']=" , js['data']);
			//delete js['data']['splashUrl'];
		    //console.log("js['databnbn']=" , js['data']);
			
			Utils.userInfo.popupBgUrl = js['data']['splashUrl'];
			//console.log("js['databnbn']8888=" , js['data']['splashUrl']);
			//console.log("Utils.userInfo.popupBgUrl=", Utils.userInfo.popupBgUrl);
			egret.localStorage.setItem("mul_score", js['data']['totalScore']);
			/*
						Utils.userInfo['ground'] = js['ground'];
						Utils.userInfo['hive'] = js['hive'];
						Utils.userInfo['water'] = js['water'];
						Utils.userInfo['fertilizer'] = js['fertilizer'];
						Utils.userInfo['pollen'] = js['pollen'];
						Utils.userInfo['honey'] = js['honey'];
						Utils.userInfo['bee'] = js['bee'];
						Utils.userInfo['sunflower'] = js['sunflower'];
						Utils.userInfo['bee_max'] = js['beeMax'];
						Utils.userInfo['sunflower_max'] = js['sunflowerMax'];
						Utils.userInfo['team_id'] = js['teamId'];
						Utils.userInfo['first'] = js['first'];
						Utils.userInfo['ground_level'] = js['groundLevel'];
						Utils.userInfo['hive_level'] = js['hiveLevel'];
						Utils.userInfo['last_buy'] = js['lastBuy'];
						Utils.userInfo['buy'] = js['buy'];
						Utils.userInfo['receive_reward'] = js['receiveReward'];
						Utils.userInfo['invite_sum'] = js['inviteSum'];*/
			//stage.addChild(new GameScene());
			//stage.removeChild(loadingView);
			//this.httpRequestPost(JSON.stringify({ custId: "" + this.encryptId }), "questionList", (result) => {
			//	let js: JSON = JSON.parse(result);
			//	console.log("简化版本吧2138129038hjskdnnnnnn==", js['data']['questionsList']);
			//	stage.addChild(new GameScene(js['data']));
			//	stage.removeChild(loadingView);
			//});
		//});
stage.addChild(new GameScene());
			stage.removeChild(loadingView);



		/*		let request = new egret.HttpRequest();
				request.responseType = egret.HttpResponseType.TEXT;
				request.open("http://slcsptest.sinosig.com/member/app/addExperience", egret.HttpMethod.POST);
				request.setRequestHeader("Content-Type", "application/json");
				request.setRequestHeader("X-APP_VERSION", Utils.userInfo['version']);
				request.setRequestHeader("X-APP-PLAT", Utils.userInfo['plat']);
				request.setRequestHeader("X-AUTH-TOKEN", Utils.userInfo['token']);
				request.send({ custId: Utils.userInfo['id'], taskId: 1006, "infoId": "" });
				request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
					console.log("---------------%%%%%%%%%%%%--------------");
					//alert("接收成功！！"+decrypt.toString());
					console.log((<egret.HttpRequest>event.currentTarget.response).toString());
					console.log("---------------************--------------");
				}, this);
				request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
					console.log("post error : " + event);
					alert("post " + "http://slcsptest.sinosig.com/member/app/addExperience" + " error : " + event.type);
				}, this);
				request.addEventListener(egret.ProgressEvent.PROGRESS, (event: egret.ProgressEvent) => {
					console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
				}, this);*/

		//alert(this.encryptId);

		//	alert("custId=" + custId + "--headerImage=" + headerImage + "--version=" + version + "--plat=" + plat + "--token=" + token + "--nickName=" + nickName);


		/*		console.log("'['''''''']'^^^^^");
				let request = new egret.HttpRequest();
				request.responseType = egret.HttpResponseType.TEXT;//https://slcsp.sinosig.com/slcsp-member-service/interface/Service https://slcsptest.sinosig.com/slcsp-member-service/interface/Service
				request.open("http://slcsptest.sinosig.com/slcsp-farm-service/order/permission", egret.HttpMethod.POST);
				request.setRequestHeader("Content-Type", "application/json");
				//request.setRequestHeader("custId", this.encryptId);
				request.send("9ad425ebc6a50d40cd7fe32a3ebdb86a4898e5e195b76266197cb988c6deb5b48f724018cecbb37ec3ad6efb3964f170974f99a66f781a4fc6d32dfef33a618c8d4af40ce9899ede93e63b460144ca4ad3cf2bc2f41f19259b96a28f4d32fc0345dd6eee51e21ec5f9dc1fa305d772fa");
				request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
					console.log("---------------%%%%%%%%%%%%--------------");
					//alert("接收成功！！" + (<egret.HttpRequest>event.currentTarget.response).toString());
					console.log("http://slcsptest.sinosig.com/slcsp-farm-service/order/permission = " + (<egret.HttpRequest>event.currentTarget.response).toString()
						//+"解密后："
						//+ CryptoJS.AES.decrypt(
						//	(<egret.HttpRequest>event.currentTarget.response).toString(),
						//	"DC0535352D6921&!:095A808D36EB8!",{ mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
						//).toString()
						);
					console.log("---------------************--------------");
				}, this);
				request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
					console.log("http://slcsptest.sinosig.com/slcsp-farm-service/order/permission" + "post error : " + event);
					//alert("http://slcsptest.sinosig.com/member/app/addExperience--" + "post error : " + event);
				}, this);
				request.addEventListener(egret.ProgressEvent.PROGRESS, (event: egret.ProgressEvent) => {
					console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
					// alert("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
				}, this);
				console.log("213812937^^^^^^^^^^^^^");*/
	}


	public static getPlace() {
		return new Promise((resolve) => {
			this.httpRequestPost(null, "goods/list", res => {
				console.log("js********=" + res + "======" + res[0][0].length + "------" + res[0][0][0].length);
				resolve(res);
			});
		})
	}


	public static async showPlace() {
		const place = await this.getPlace();
		return place;
	}

	public static prod = {
		eleLinkUrlPrefix: "https://slcsp.sinosig.com/app/#/activity/farmexchange?",
		shopLinkUrlPrefix: "https://active.sinosig.com",
		orderLinkUrlPrefix: "https://mclub.sinosig.com",
		url: "https://slcsp.sinosig.com/slcsp-farm-service/",
	};

	public static test = {//http://slcsptest.sinosig.com/slcsp-farm-service/ http://127.0.0.1:9800/
		eleLinkUrlPrefix: "http://slcsptest.sinosig.com/app/#/activity/farmexchange?",
		shopLinkUrlPrefix: "https://int-active.sinosig.com",
		orderLinkUrlPrefix: "https://int-mclub.sinosig.com",
		url: "https://slcsptest.sinosig.com/slcsp-activity-service/collect/Pgame/",
	};//url: "http://slcsptest.sinosig.com/slcsp-activity-service/collect/Pgame/",
      //url: "https://slcsp.sinosig.com/slcsp-activity-service/collect/Pgame/",
	public static isProd: boolean = false;

	//https://active.sinosig.com  "https://int-active.sinosig.com";
	//public static shopLinkUrlPrefix = "https://active.sinosig.com";
	//https://mclub.sinosig.com "https://int-mclub.sinosig.com";
	//public static orderLinkUrlPrefix = "https://mclub.sinosig.com";
	//https://slcsp.sinosig.com/slcsp-farm-service/
	//http://slcsptest.sinosig.com/slcsp-farm-service/  http://127.0.0.1:9800/ http://farm.applinzi.com/
	public static httpRequestPost(params, url: string, func: (result) => void, that: any = null,
		domian: string = this.isProd ? this.prod['url'] : this.test['url'], isJson: boolean = false, isEncry: boolean = false) {
		//alert("发送post请求，参数是"+JSON.stringify(params));
		if (isEncry) {
		} else {
			let request = new egret.HttpRequest();
			request.responseType = egret.HttpResponseType.TEXT;
			request.open(domian + url, egret.HttpMethod.POST);
			request.setRequestHeader("Content-Type", "application/json");
			if (isJson) {
				request.setRequestHeader("X-APP_VERSION", Utils.userInfo['version']);
				request.setRequestHeader("X-APP-PLAT", Utils.userInfo['plat']);
				request.setRequestHeader("X-AUTH-TOKEN", Utils.userInfo['token']);
				console.log("32423840");
			} else {
				request.setRequestHeader("Accept", "application/json");
				request.setRequestHeader("custId", this.encryptId);
				console.log("898989899hnnn");
			}
			request.send(params);
			request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
				console.log("---------------%%%%%%%%%%%%--------------");
				//alert("接收成功！！"+decrypt.toString());
				console.log((<egret.HttpRequest>event.currentTarget.response).toString());
				func((<egret.HttpRequest>event.currentTarget.response).toString());
				console.log("---------------************--------------");
			}, this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
				console.log("post error : " + event);
				alert("post " + domian + " error : " + event.type);
			}, this);
			request.addEventListener(egret.ProgressEvent.PROGRESS, (event: egret.ProgressEvent) => {
				console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
				// alert("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
			}, this);
		}
	}

	public static httpRequest(params, url: string, that: any = null,
		domian: string = this.isProd ? this.prod['url'] : this.test['url'], isJson: boolean = false, isEncry: boolean = false) {
		return new Promise<string>((resolve, reject) => {

			if (isEncry) {
			} else {
				let req = new egret.HttpRequest();
				req.responseType = egret.HttpResponseType.TEXT;
				req.open(domian + url, egret.HttpMethod.POST);
				req.setRequestHeader("Content-Type", "application/json");
				if (isJson) {
					req.setRequestHeader("X-APP_VERSION", Utils.userInfo['version']);
					req.setRequestHeader("X-APP-PLAT", Utils.userInfo['plat']);
					req.setRequestHeader("X-AUTH-TOKEN", Utils.userInfo['token']);
					console.log("32423840");
				} else {
					req.setRequestHeader("Accept", "application/json");
					req.setRequestHeader("custId", this.encryptId);
					console.log("898989899hnnn");
				}
				req.send(params);
				req.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
					console.log("---------------%%%%%%%%%%%%--------------");
					//alert("接收成功！！"+decrypt.toString());
					console.log((<egret.HttpRequest>event.currentTarget.response).toString());
					//func((<egret.HttpRequest>event.currentTarget.response).toString());
					resolve((<egret.HttpRequest>event.currentTarget.response).toString())
					console.log("---------------************--------------");
				}, this);
				req.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
					console.log("post error : " + event);
					reject("post " + domian + " error : " + event.type)
					alert("post " + domian + " error : " + event.type);
				}, this);
				req.addEventListener(egret.ProgressEvent.PROGRESS, (event: egret.ProgressEvent) => {
					console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
					reject("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%")
					// alert("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
				}, this);
			}
		})


	}




	private static stringToByte(str) {
		let bytes = new Array();
		let len, c;
		len = str.length;
		for (let i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if (c >= 0x010000 && c <= 0x10FFFF) {
				bytes.push(((c >> 18) & 0x07) | 0xF0);
				bytes.push(((c >> 12) & 0x3F) | 0x80);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			} else if (c >= 0x000800 && c <= 0x00FFFF) {
				bytes.push(((c >> 12) & 0x0F) | 0xE0);
				bytes.push(((c >> 6) & 0x3F) | 0x80);
				bytes.push((c & 0x3F) | 0x80);
			} else if (c >= 0x000080 && c <= 0x0007FF) {
				bytes.push(((c >> 6) & 0x1F) | 0xC0);
				bytes.push((c & 0x3F) | 0x80);
			} else {
				bytes.push(c & 0xFF);
			}
		}
		return bytes;
	}

	private static byteToString(arr) {
		if (typeof arr === 'string') {
			return arr;
		}
		let str = '',
			_arr = arr;
		for (let i = 0; i < _arr.length; i++) {
			let one = _arr[i].toString(2),
				v = one.match(/^1+?(?=0)/);
			if (v && one.length == 8) {
				let bytesLength = v[0].length;
				let store = _arr[i].toString(2).slice(7 - bytesLength);
				for (let st = 1; st < bytesLength; st++) {
					store += _arr[st + i].toString(2).slice(2);
				}
				str += String.fromCharCode(parseInt(store, 2));
				i += bytesLength - 1;
			} else {
				str += String.fromCharCode(_arr[i]);
			}
		}
		return str;
	}
}