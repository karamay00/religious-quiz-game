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

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createView, this);
	}

	private loadingImageMax: egret.Bitmap;
	private loadingImage: egret.Bitmap;

	private async createView() {


		let bottom = new egret.Bitmap()
		bottom.texture = RES.getRes('loading_bottom_png')
		bottom.x = -0 + this.stage.stageWidth / 2 - bottom.width / 2;
		bottom.y = -0 + this.stage.stageHeight / 2 - bottom.height / 2 + 270;
		this.addChild(bottom);

		this.loadingImageMax = new egret.Bitmap(RES.getRes('loading_mid_png'));
		this.loadingImage = new egret.Bitmap();
		this.loadingImage.x = -0 + this.stage.stageWidth / 2 - this.loadingImageMax.width / 2;
		this.loadingImage.y = -0 + this.stage.stageHeight / 2 - this.loadingImageMax.height / 2 + 270;
		this.addChild(this.loadingImage)

		let top = new egret.Bitmap()
		top.texture = RES.getRes('loading_top_png')
		top.x = -0 + this.stage.stageWidth / 2 - top.width / 2;
		top.y = -0 + this.stage.stageHeight / 2 - top.height / 2 + 270;
		this.addChild(top);

	}

	public onProgress(current: number, total: number): void {
		let renderTexture: egret.RenderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(this.loadingImageMax, new egret.Rectangle(0, 0, this.loadingImageMax.width * (current / total), this.loadingImageMax.height));

		this.loadingImage.texture = renderTexture;
	}
}