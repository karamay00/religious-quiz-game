//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare function login(success);
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
	//inject the custom material parser
		//注入自定义的素材解析器
		let assetAdapter = new AssetAdapter();
		egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
		egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		
        this.runGame().catch(e => {
            console.log(e);
        })
    }

	private async runGame() {
		
		
		let search = window.location.search;
		let avatar = getSearchString('avatar', search); //结果：2
		let nickname = getSearchString('nickname', search); //结果：2
		let score = getSearchString('score', search); //结果：2
		let openId = getSearchString('openId', search); //结果：2
		let unionId = getSearchString('unionId', search); //结果：2
		let id = getSearchString('id', search); //结果：2
		let language= getSearchString('language', search); //结果：2
		let score_today= getSearchString('scoretoday', search); //结果：2
		console.log("url:"+"-langue-"+language+"--"+avatar+"--"+nickname+"--"+score+"--"+openId+"--"+unionId+"--"+id);
		

		//score = 555; //结果：2
		//id =  "cd045e756141498a0dcf76b528dd83f4" ; //结果：2
		
		//console.log("22222hhhhhhsssssssssssssssssss");
		
		
		login((res) => {
			console.log("rererereLLLL=",res);
		});
		
		
		Utils.userInfo.name= nickname;
		Utils.userInfo.score= score;
		Utils.userInfo.score_today= score_today;
		Utils.userInfo.id= id;
		Utils.userInfo.icon_url=avatar;
		Utils.userInfo.language=language;
		const loadingView: LoadingUI = new LoadingUI();
		await this.loadResource(loadingView)
			this.stage.addChild(new GameScene());
			this.stage.removeChild(loadingView);
		//console.log("22222hhhhhhsssssssssssssssssss");
		
		
	
		
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
		
	}
	private async loadResource(loadingView: LoadingUI) {
		try {
			await RES.loadConfig("resource/default.res.json", "resource/");
			await RES.loadGroup("loading");
			//const loadingView = new LoadingUI();
			console.log(this.stage.width+"--iiiiiiiixxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			this.stage.addChild(loadingView);
				console.log(this.stage.width+"--llllllllllxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
			await this.loadTheme();
			await RES.loadGroup("preload", 0, loadingView);
			//this.stage.removeChild(loadingView);
			//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		}
		catch (e) {
			console.error(e);
		}}
	private loadTheme() {
		return new Promise((resolve, reject) => {
			// load skin theme configuration file, you can manually modify the file. And replace the default skin.
			//加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
			let theme = new eui.Theme("resource/default.thm.json", this.stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, () => {
				resolve();
			}, this);
		})
	}
}