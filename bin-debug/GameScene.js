var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.questionsList = [];
        /**使用求助扣的分数 */
        _this.helpCost = 2;
        /**使用跳过扣的分数 */
        _this.passCost = 5;
        /**使用求助扣的分数 */
        _this.helpUseCount = 0;
        /**使用跳过扣的分数 */
        _this.passUseCount = 0;
        _this.rankPageIndex = 0;
        _this.rankList = [];
        _this.choicesCb = [];
        _this.answer_choices_y = [978, 1090, 1201, 1312];
        _this.language = 0;
        _this.rank_types = [['dayRankingList', 'userRankingByDay', 'userScoresByDay', '每日得分排行'],
            ['monthRankingList', 'userRankingByMonth', 'userScoresByMonth', '总得分排行']];
        return _this;
    }
    GameScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    //private winSound: egret.Sound;
    //private loseSound: egret.Sound;
    //private volume: number = 1;
    GameScene.prototype.randomQuestion = function () {
        if (this.language == 0) {
            this.answer_indexes = [].concat(HanAnswer.str);
            this.question_strs = [].concat(HanQuestion.str);
            this.choice_strs = [].concat(HanChoice.str);
        }
        else if (this.language == 1) {
            this.answer_indexes = [].concat(ZangAnswer.str);
            this.question_strs = [].concat(ZangQuestion.str);
            this.choice_strs = [].concat(ZangChoice.str);
        }
        else if (this.language == 2) {
            this.answer_indexes = [].concat(YiAnswer.str);
            this.question_strs = [].concat(YiQuestion.str);
            this.choice_strs = [].concat(YiChoice.str);
        }
        for (var i = 0; i < this.question_strs.length - 20; i++) {
            var index = Math.floor(Math.random() * (this.question_strs.length - i));
            this.question_strs.splice(index, 1);
            this.answer_indexes.splice(index, 1);
            this.choice_strs.splice(index, 1);
            i = i - 1;
        }
        var r = this.question_strs.length;
        var rand = 0;
        while (r) {
            rand = Math.floor(Math.random() * (r--));
            _a = [this.question_strs[rand], this.question_strs[r]], this.question_strs[r] = _a[0], this.question_strs[rand] = _a[1];
            _b = [this.answer_indexes[rand], this.answer_indexes[r]], this.answer_indexes[r] = _b[0], this.answer_indexes[rand] = _b[1];
            _c = [this.choice_strs[rand], this.choice_strs[r]], this.choice_strs[r] = _c[0], this.choice_strs[rand] = _c[1];
        }
        var _a, _b, _c;
    };
    GameScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;
        /*
        if (h / w < 1780 / 1080) {
            let cutH = (1448 - 750 * h / w) / 2;
            this['gp_answer'].height = 1448 - cutH;
            
            this['gp_head'].y = 26 + 10 + cutH;
            this['splash_rule'].y = 10 + cutH;
            this['splash_feedback'].y = 10 + cutH;
            this['head_soundSmall'].y = -80 + 10 + cutH;
            this['head_soundBig'].y = -80 + 10 + cutH;
            this['head_soundClose'].y = -80 + 10 + cutH;
            this['answer_help'].y = 1448 - cutH - 55;
            this['answer_pass'].y = 1448 - cutH - 55;
        }*/
        var cutH = (1448 - 750 * h / w);
        if (cutH > 0) {
            console.log("2139-12093-12930-kkk0");
            this['gp_answer'].height = 1448 - cutH;
            this['gp_splash'].height = 1448 - cutH;
            this['gp_splash'].top = -100 + cutH / 2;
            this['gp_head'].top = 36 + cutH / 2;
            this['splash_rule'].y = 10 + cutH / 2;
            this['splash_feedback'].y = 10 + cutH / 2;
            this['head_soundSmall'].y = -80 + 10 + cutH / 2;
            this['head_soundBig'].y = -80 + 10 + cutH / 2;
            this['head_soundClose'].y = -80 + 10 + cutH / 2;
            this['answer_help'].y = 1448 - cutH / 2 - 55;
            this['answer_pass'].y = 1448 - cutH / 2 - 55;
            this.answer_choices_y = [1448 - cutH - 20 - 90 - 111 * 3, 1448 - cutH - 20 - 90 - 111 * 2, 1448 - cutH - 20 - 90 - 111 * 1, 1448 - cutH - 20 - 90 - 111 * 0];
        }
        this.language = Utils.userInfo.language == undefined ? 0 : Utils.userInfo.language;
        console.log("Utils.userInfo.language=", Utils.userInfo.language == undefined);
        console.log("this.language=", this.language);
        //console.log("00=" + this.question_strs.length + "--", this.question_strs)
        //console.log("00=" + this.answer_indexes.length + "-", this.answer_indexes)
        //console.log("00=" + this.choice_strs.length + "--", this.choice_strs)
        //console.log("Utils.userInfo.language=", ZangQuestion.str[68]==69)
        //console.log("Utils.666userInfo.language=", ZangChoice.str[0][0]==6)
        //console.log("7777777777777=", ZangQuestion.str[1]==2)
        /*
                if (this.language == 0) {
                    this.answer_indexes = [].concat(HanAnswer.str);
                    this.question_strs = [].concat(HanQuestion.str);
                    this.choice_strs = [].concat(HanChoice.str);
                } else if (this.language == 1) {
                    this.answer_indexes = [].concat(ZangAnswer.str);
                    this.question_strs = [].concat(ZangQuestion.str);
                    this.choice_strs = [].concat(ZangChoice.str);
                } else if (this.language == 2) {
                    this.answer_indexes = [].concat(YiAnswer.str);
                    this.question_strs = [].concat(YiQuestion.str);
                    this.choice_strs = [].concat(YiChoice.str);
                }
        */
        /*
                this.answer_indexes = [].concat(Answer.str);
        
                this.question_strs = [].concat(HanQuestion.str);
                this.question_strs1 = [].concat(ZangQuestion.str);
                this.question_strs2 = [].concat(YiQuestion.str);
        
                this.choice_strs = [].concat(HanChoice.str);
                this.choice_strs1 = [].concat(ZangChoice.str);
                this.choice_strs2 = [].concat(YiChoice.str);
        */
        //console.log("01110=" + this.answer_indexes.length + "--", this.answer_indexes)
        //console.log("08978979790=" + this.question_strs.length + "--", this.question_strs)
        //console.log("00=" + this.answer_indexes.length + "-", this.answer_indexes)
        //console.log("00=" + this.choice_strs.length + "--", this.choice_strs)
        //this.answer_indexes = [].concat(Answer.str);
        //console.log("01110=" + this.answer_indexes.length + "--", this.answer_indexes)
        /*
                this.popNoCb = Utils.addBtnEvent(this['btn_1_25'], () => {
                    this.question_strs = [].concat(HanQuestion.str);
                    this.question_strs1 = [].concat(ZangQuestion.str);
                    this.question_strs2 = [].concat(YiQuestion.str);
        
                    this.choice_strs = [].concat(HanChoice.str);
                    this.choice_strs1 = [].concat(ZangChoice.str);
                    this.choice_strs2 = [].concat(YiChoice.str);
                    this.answer_indexes = [].concat(Answer.str);
        
                    this.question_strs.splice(25, 131 - 25);
                    this.answer_indexes.splice(25, 131 - 25);
                    this.choice_strs.splice(25, 131 - 25);
        
                    this.question_strs1.splice(25, 131 - 25);
                    this.choice_strs1.splice(25, 131 - 25);
        
                    this.question_strs2.splice(25, 131 - 25);
                    this.choice_strs2.splice(25, 131 - 25);
        
        
                    console.log("25=" + this.question_strs.length + "--", this.question_strs)
        
                }, this, null);
                this.popNoCb = Utils.addBtnEvent(this['btn_26_50'], () => {
        
        
                    this.question_strs = [].concat(HanQuestion.str);
                    this.question_strs1 = [].concat(ZangQuestion.str);
                    this.question_strs2 = [].concat(YiQuestion.str);
        
                    this.choice_strs = [].concat(HanChoice.str);
                    this.choice_strs1 = [].concat(ZangChoice.str);
                    this.choice_strs2 = [].concat(YiChoice.str);
                    this.answer_indexes = [].concat(Answer.str);
        
                    this.question_strs.splice(0, 25);
                    this.answer_indexes.splice(0, 25);
                    this.choice_strs.splice(0, 25);
        
                    this.question_strs1.splice(0, 25);
                    this.choice_strs1.splice(0, 25);
        
                    this.question_strs2.splice(0, 25);
                    this.choice_strs2.splice(0, 25);
        
        
        
                    this.question_strs.splice(25, 131 - 25 * 2);
                    this.answer_indexes.splice(25, 131 - 25 * 2);
                    this.choice_strs.splice(25, 131 - 25 * 1);
        
                    this.question_strs1.splice(25, 131 - 25 * 2);
                    this.choice_strs1.splice(25, 131 - 25 * 2);
        
                    this.question_strs2.splice(25, 131 - 25 * 2);
                    this.choice_strs2.splice(25, 131 - 25 * 2);
                    console.log("26-50=" + this.question_strs.length + "--", this.question_strs)
                }, this, null);
                this.popNoCb = Utils.addBtnEvent(this['btn_51_75'], () => {
                    this.question_strs = [].concat(HanQuestion.str);
                    this.question_strs1 = [].concat(ZangQuestion.str);
                    this.question_strs2 = [].concat(YiQuestion.str);
        
                    this.choice_strs = [].concat(HanChoice.str);
                    this.choice_strs1 = [].concat(ZangChoice.str);
                    this.choice_strs2 = [].concat(YiChoice.str);
                    this.answer_indexes = [].concat(Answer.str);
        
                    this.question_strs.splice(0, 25 * 2);
                    this.answer_indexes.splice(0, 25 * 2);
                    this.choice_strs.splice(0, 25 * 2);
        
                    this.question_strs1.splice(0, 25 * 2);
                    this.choice_strs1.splice(0, 25 * 2);
        
                    this.question_strs2.splice(0, 25 * 2);
                    this.choice_strs2.splice(0, 25 * 2);
        
        
        
                    this.question_strs.splice(25, 131 - 25 * 3);
                    this.answer_indexes.splice(25, 131 - 25 * 3);
                    this.choice_strs.splice(25, 131 - 25 * 3);
        
                    this.question_strs1.splice(25, 131 - 25 * 3);
                    this.choice_strs1.splice(25, 131 - 25 * 3);
        
                    this.question_strs2.splice(25, 131 - 25 * 3);
                    this.choice_strs2.splice(25, 131 - 25 * 3);
                    console.log("51-75=" + this.question_strs.length + "--", this.question_strs)
                }, this, null);
                this.popNoCb = Utils.addBtnEvent(this['btn_76_100'], () => {
                    this.question_strs = [].concat(HanQuestion.str);
                    this.question_strs1 = [].concat(ZangQuestion.str);
                    this.question_strs2 = [].concat(YiQuestion.str);
        
                    this.choice_strs = [].concat(HanChoice.str);
                    this.choice_strs1 = [].concat(ZangChoice.str);
                    this.choice_strs2 = [].concat(YiChoice.str);
                    this.answer_indexes = [].concat(Answer.str);
        
                    this.question_strs.splice(0, 25 * 3);
                    this.answer_indexes.splice(0, 25 * 3);
                    this.choice_strs.splice(0, 25 * 3);
        
                    this.question_strs1.splice(0, 25 * 3);
                    this.choice_strs1.splice(0, 25 * 3);
        
                    this.question_strs2.splice(0, 25 * 3);
                    this.choice_strs2.splice(0, 25 * 3);
        
        
        
                    this.question_strs.splice(25, 131 - 25 * 4);
                    this.answer_indexes.splice(25, 131 - 25 * 4);
                    this.choice_strs.splice(25, 131 - 25 * 4);
        
                    this.question_strs1.splice(25, 131 - 25 * 4);
                    this.choice_strs1.splice(25, 131 - 25 * 4);
        
                    this.question_strs2.splice(25, 131 - 25 * 4);
                    this.choice_strs2.splice(25, 131 - 25 * 4);
                    console.log("76-100=" + this.question_strs.length + "--", this.question_strs)
        
                }, this, null);
                this.popNoCb = Utils.addBtnEvent(this['btn_101'], () => {
                    this.question_strs1 = [].concat(ZangQuestion.str);
                    this.question_strs2 = [].concat(YiQuestion.str);
        
                    this.choice_strs = [].concat(HanChoice.str);
                    this.choice_strs1 = [].concat(ZangChoice.str);
                    this.choice_strs2 = [].concat(YiChoice.str);
                    this.answer_indexes = [].concat(Answer.str);
        
                    this.question_strs.splice(0, 25 * 4);
                    this.answer_indexes.splice(0, 25 * 4);
                    this.choice_strs.splice(0, 25 * 4);
        
                    this.question_strs1.splice(0, 25 * 4);
                    this.choice_strs1.splice(0, 25 * 4);
        
                    this.question_strs2.splice(0, 25 * 4);
                    this.choice_strs2.splice(0, 25 * 4);
        
                    console.log("101=" + this.question_strs.length + "--", this.question_strs)
        
                }, this, null);
        */
        //	console.log("question_strs==" + this.question_strs.length, this.question_strs)
        //	console.log("question_strs==" + this.answer_indexes.length, this.answer_indexes)
        //	console.log("question_strs==" + this.choice_strs.length, this.choice_strs)
        //const sound: egret.Sound = RES.getRes("bg_mp3");
        //let channel: egret.SoundChannel = sound.play();
        //channel.volume = 0.1;
        //this.winSound = RES.getRes("win_mp3");
        //this.loseSound = RES.getRes("lose_mp3");
        this['head_head'].mask = this['head_mask'];
        Utils.loadHeadImg(Utils.userInfo.icon_url, this['head_head']);
        this['head_name'].text = Utils.userInfo.name;
        this['count_name'].text = Utils.userInfo.name;
        Utils.addBtnEvent(this['popup_close'], function () {
            _this['gp_popup'].visible = false;
        }, this, null);
        if (this.language == 0) {
            this['btn_han'].source = "hanyu_0_png";
            this['btn_yi'].source = "yiyu_1_png";
            this['splash_start_lbl'].text = "开始答题";
            this['splash_rank_lbl'].text = "总排行榜";
            this['splash_rank_day_lbl'].text = "每日排行榜";
        }
        if (this.language == 1) {
            this['btn_han'].source = "hanyu_1_png";
            this['btn_yi'].source = "yiyu_1_png";
            this['btn_zang'].source = "zangyu_0_png";
            this['splash_start_lbl'].text = "ལན་འདེབས་མགོ་བརྩམས་པ།";
            this['splash_rank_lbl'].text = "ཉིན་རེའི་ཨང་རིམ།";
            this['splash_rank_day_lbl'].text = "སྤྱིའི་ཨང་རིམ།";
        }
        if (this.language == 2) {
            this['btn_han'].source = "hanyu_1_png";
            this['btn_yi'].source = "yiyu_0_png";
            this['btn_zang'].source = "zangyu_1_png";
            this['splash_start_lbl'].text = "ꀨꇬꅇꀱ";
            this['splash_rank_lbl'].text = "ꀃꑍꎅꄻ";
            this['splash_rank_day_lbl'].text = "ꃅꎅꄻ";
        }
        this['splash_start'].source = "kaishidati_" + this.language + "_png";
        this['splash_rank_day'].source = "day_rank_" + this.language + "_png";
        this['splash_rank'].source = "rank_" + this.language + "_png";
        var inde = 0;
        Utils.addBtnEvent(this['test_btn'], function () {
            inde = inde + 1;
            _this['answer_test'].text = ZangQuestion.str[inde];
            console.log("inde=" + inde);
        }, this, null);
        Utils.addBtnEvent(this['btn_han'], function () {
            if (_this.language == 0) {
            }
            else {
                _this.language = 0;
                _this['btn_han'].source = "hanyu_0_png";
                _this['btn_yi'].source = "yiyu_1_png";
                _this['btn_zang'].source = "zangyu_1_png";
                _this['splash_start'].source = "kaishidati_" + _this.language + "_png";
            }
        }, this, null);
        Utils.addBtnEvent(this['btn_zang'], function () {
            if (_this.language == 1) {
            }
            else {
                _this.language = 1;
                _this['btn_han'].source = "hanyu_1_png";
                _this['btn_yi'].source = "yiyu_1_png";
                _this['btn_zang'].source = "zangyu_0_png";
                _this['splash_start'].source = "kaishidati_" + _this.language + "_png";
            }
        }, this, null);
        Utils.addBtnEvent(this['btn_yi'], function () {
            if (_this.language == 2) {
            }
            else {
                _this.language = 2;
                _this['btn_han'].source = "hanyu_1_png";
                _this['btn_yi'].source = "yiyu_0_png";
                _this['btn_zang'].source = "zangyu_1_png";
                _this['splash_start'].source = "kaishidati_" + _this.language + "_png";
            }
        }, this, null);
        /*
                if (Utils.userInfo.popupBgUrl != null && Utils.userInfo.popupBgUrl != "" && Utils.userInfo.popupBgUrl != undefined) {
                    Utils.loadHeadImg(Utils.userInfo.popupBgUrl, this['popup_bg']);
                    let date = Utils.formatDate(new Date(), "yyyy-MM-dd")
                    let today = egret.localStorage.getItem('today');
                    if (today != null && today == date) {
                        this['gp_popup'].visible = false;
                    } else {
                        egret.localStorage.setItem('today', date);
                        this['gp_popup'].visible = true;
                    }
                } else {
                    this['gp_popup'].visible = false;
                }*/
        this['gp_popup'].visible = false;
        this['count_head'].mask = this['count_mask'];
        this['splash_score'].text = Utils.userInfo.score; // egret.localStorage.getItem("mul_score") == null ? 0 : egret.localStorage.getItem("mul_score");
        this['answer_score'].text = 0;
        Utils.addBtnEvent(this['head_soundSmall'], function () {
            //this.volume = 0.5;
            _this['head_soundClose'].visible = true;
            _this['head_soundSmall'].visible = false;
            _this['head_soundBig'].visible = false;
            //channel.volume = 0.1 * this.volume;
        }, this, null);
        Utils.addBtnEvent(this['head_soundClose'], function () {
            //this.volume = 0;
            _this['head_soundClose'].visible = false;
            _this['head_soundSmall'].visible = false;
            _this['head_soundBig'].visible = true;
            //channel.volume = 0.1 * this.volume;
        }, this, null);
        Utils.addBtnEvent(this['head_soundBig'], function () {
            //this.volume = 1;
            _this['head_soundClose'].visible = false;
            _this['head_soundSmall'].visible = true;
            _this['head_soundBig'].visible = false;
            //channel.volume = 0.1 * this.volume;
        }, this, null);
        Utils.addBtnEvent(this['splash_start'], function () {
            _this.randomQuestion();
            _this.getQuestionList();
            _this['count_head'].source = _this['head_head'].source;
            _this['over_head'].source = _this['head_head'].source;
            _this['gp_head'].visible = false;
            _this['gp_splash'].visible = false;
            _this['gp_count'].visible = true;
            //Utils.userInfo.score = 0;
            _this['over_score'].text = 0;
            _this['answer_score'].text = 0;
            _this.questionsList = [];
            _this.helpUseCount = 0;
            _this.passUseCount = 0;
            //this['answer_lbl_1'].visible = false;
            //this['answer_lbl_2'].visible = false;
            _this['answer_lbl'].visible = false;
            for (var i = 0; i < 4; i++) {
                _this["answer_choice" + i]['lbl_0'].visible = false;
                //this["answer_choice" + i]['lbl_1'].visible = false;
                //this["answer_choice" + i]['lbl_2'].visible = false;
            }
            //if (this.language == 0) {
            _this['answer_lbl'].visible = true;
            for (var i = 0; i < 4; i++) {
                _this["answer_choice" + i]['lbl_0'].visible = true;
            }
            /*} else if (this.language == 1) {
                this['answer_lbl_1'].visible = true;
                for (let i: number = 0; i < 4; i++) {
                    this["answer_choice" + i]['lbl_1'].visible = true;
                }
            } else if (this.language == 2) {
                this['answer_lbl_2'].visible = true;
                for (let i: number = 0; i < 4; i++) {
                    this["answer_choice" + i]['lbl_2'].visible = true;

                    console.log("89080808vvvvvvbbbbbb");
                }
            }*/
            _this['answer_scroller'].viewport.scrollH = 0;
            if (_this.language == 0) {
                //this['answer_scroller'].horizontalScrollBar.visible = false;
                //this['answer_lbl'].width = 532;
                //this['answer_lbl'].size = 40;
            }
            else if (_this.language == 1) {
                //this['answer_scroller'].horizontalScrollBar.visible = true;
                //this['answer_lbl'].width = 532;
                //this['answer_lbl'].size = 40;
            }
            else if (_this.language == 2) {
                //this['answer_scroller'].horizontalScrollBar.visible = false;
                //this['answer_lbl'].width = 532;
                //this['answer_lbl'].size = 40;
            }
            //console.log("answer_choice + 2][lbl_2=", this["answer_choice" + 2]['lbl_2']);
        }, this, null);
        Utils.addBtnEvent(this['splash_rule'], function () {
            console.log("ccnvvnvn666669999hhhhhhhhbbbbbbbbbbbbbbbb");
            //let id = { id: Utils.userInfo.id };
            //let score = { score: Number(Utils.userInfo.score) + Number(Utils.userInfo.scoreLast) };
            //launch(id, score);
            //back();
            _this['gp_rule'].visible = true;
        }, this, null);
        Utils.addBtnEvent(this['rule_close'], function () {
            _this['gp_rule'].visible = false;
        }, this, null);
        var isFocus = false;
        Utils.addBtnEvent(this['splash_feedback'], function () {
            _this["feedback_edit"].text = "";
            _this['gp_feedback'].visible = true;
        }, this, null);
        this.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
            isFocus = true;
            console.log("this['gp_splash'],y=" + _this.y + "--" + _this.stage + "---s-" + _this.parent.$getWidth);
        }, this["feedback_edit"]);
        Utils.addBtnEvent(this['feedback_close'], function () {
            _this['gp_feedback'].visible = false;
            if (isFocus) {
                _this.y = 70;
            }
        }, this, null);
        /*
                Utils.addBtnEvent(this['feedback_yes'], () => {
                    if (isFocus) {
                        this.y = 70;
                    }
        
                    console.log("this[feedback_edit888========", this["feedback_edit"].text == "");
        
                    if (this["feedback_edit"].text) {
                        if (this["feedback_edit"].text.length <= 150) {
                            this['gp_loading'].visible = true;
                            AESEncryptUtil.httpRequestPost(JSON.stringify({ custId: "" + Utils.userInfo.encryptId, textMsg: this["feedback_edit"].text }), "feedback", (result) => {
                                this['gp_feedback'].visible = false;
                                this['gp_loading'].visible = false;
                                let js: JSON = JSON.parse(result)['data'];
                                this.showToast("提问成功~");
                            });
                        } else {
                            this.showToast("提问字数须在150字以内~");
                        }
                    } else {
        
                        this.showToast("请输入您想提出的问题哦~");
                    }
                }, this, null);*/
        Utils.addBtnEvent(this['over_restart'], function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this['gp_head'].visible = true;
                this['gp_splash'].visible = true;
                this['gp_over'].visible = false;
                return [2 /*return*/];
            });
        }); }, this, null);
        var type = 0;
        this['rank_load'].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.rankPageIndex++;
            var length = 4 * (_this.rankPageIndex + 1);
            if (length > _this.rankList.length) {
                length = _this.rankList.length;
                _this['rank_load'].text = "已经到底了哦";
            }
            _this['rank_scroller_gp'].removeChildren();
            for (var i = 0; i < length; i++) {
                console.log("909Uuusjdklajljl圣诞节阿斯卡纶==", i);
                var item = new eui.Component();
                item.skinName = "rankItemSkin";
                item['rank'].text = i + 1;
                Utils.loadHeadImg(_this.rankList[i].avatar, item['head']);
                item['nickname'].text = _this.rankList[i].nickname;
                item['score'].text = _this.rankList[i].scores;
                item['score'].text = type == 0 ? _this.rankList[i].score_today : _this.rankList[i].score;
                item.width = 500;
                item.height = 100;
                _this['rank_scroller_gp'].addChild(item);
            }
            /*
            for (let i: number =  length; i < length*2; i++) {
                console.log("6909Uuusjdklajljl圣诞节阿斯卡纶==", i)
                let item: eui.Component = new eui.Component();
                item.skinName = "rankItemSkin";
                item['rank'].text = i+ 1;
                Utils.loadHeadImg(this.rankList[i-length].headAddress, item['head']);
                item['nickname'].text = this.rankList[i-length].nickname;
                item['score'].text = this.rankList[i-length].scores;
                item.width = 500;
                item.height = 100;
                this['rank_scroller_gp'].addChild(item);
            }
            
            for (let i: number =  length*2; i < length*3; i++) {
                console.log("6909Uuusjdklajljl圣诞节阿斯卡纶==", i)
                let item: eui.Component = new eui.Component();
                item.skinName = "rankItemSkin";
                item['rank'].text = i+ 1;
                Utils.loadHeadImg(this.rankList[i-length*2].headAddress, item['head']);
                item['nickname'].text = this.rankList[i-length*2].nickname;
                item['score'].text = this.rankList[i-length*2].scores;
                item.width = 500;
                item.height = 100;
                this['rank_scroller_gp'].addChild(item);
            }*/
            _this['rank_scroller'].viewport.scrollV = _this['rank_scroller_gp'].numChildren * 140 - 560;
        }, this);
        Utils.addBtnEvent(this['splash_dayRank'], function () {
            alert("1231231772");
            _this.loadRank(0);
            type = 0;
        }, this, null);
        Utils.addBtnEvent(this['splash_monthRank'], function () {
            _this.loadRank(1);
            type = 1;
        }, this, null);
        Utils.addBtnEvent(this['splash_rank_day'], function () {
            _this.loadRank(0);
            type = 0;
        }, this, null);
        Utils.addBtnEvent(this['splash_rank'], function () {
            _this.loadRank(1);
            type = 1;
        }, this, null);
        Utils.addBtnEvent(this['rank_close'], function () {
            _this['gp_rank'].visible = false;
            _this['rank_load'].text = "点击加载更多";
        }, this, null);
        /*
                for (let i: number = 0; i < this['tip_strs'].length; i++) {
                    let tip: eui.Component = new eui.Component();
                    this['gp_splash'].addChild(tip);
                    tip.skinName = "tipBubbleSkin";
                    tip.left = (750 - (28 + this['tip_strs'][i].length * 700 / 19)) / 3;
                    tip.y = 960;
                    tip.width = -150 + 28 + this['tip_strs'][i].length * 700 / 19;
                    tip.visible = i == 0 ? true : false;
                    tip['lbl'].text = this['tip_strs'][i];
            
                    let tw = egret.Tween.get(tip, { loop: false });
                    if (Math.floor(i / 5) / 2 == 0) {
                        tip['bg'].source = "back" + i % 5 + "_png";
                    } else {
                        tip['bg'].source = "back" + (3 - i % 5 < 0 ? 3 - i % 5 + 5 : 3 - i % 5) + "_png";
                    }
            
                    tw.wait(9400 / this['tip_strs'].length * i)
                        .to({ visible: true })
                        .to({ width: 28 + this['tip_strs'][i].length * 700 / 19 }, 400)
                        .to({ y: -1000 }, 9000)
                        .call((j) => {
                            tip.y = 960;
                            tip.width = -150 + 28 + this['tip_strs'][i].length * 700 / 19;
                            let tw = egret.Tween.get(tip, { loop: true });
                            tw.to({ width: 28 + this['tip_strs'][i].length * 700 / 19 }, 400)
                                .to({ y: -1000 }, 9000);
                        }, this, [i]);
                }
            */
        var pos = [[10, 20], [-7, 20], [8, 10], [-11, -21], [17, -23], [-40, 10], [20, -6]];
        for (var i = 0; i < 7; i++) {
            var tw = egret.Tween.get(this['splash_tip' + i], { loop: true });
            var x = this['splash_tip' + i].x;
            var y = this['splash_tip' + i].y;
            if (Math.round(Math.random()) == 0) {
                tw.to({ x: x + pos[i][0] }, 1000)
                    .to({ y: y + pos[i][1] }, 1000)
                    .to({ x: x }, 1000) //
                    .to({ y: y }, 1000);
            }
            else {
                tw.to({ y: y + pos[i][1] }, 1000)
                    .to({ x: x + pos[i][0] }, 1000)
                    .to({ y: y }, 1000)
                    .to({ x: x }, 1000);
            }
        }
        this.popNoCb = Utils.addBtnEvent(this['pop_no'], function () {
            _this['gp_pop'].visible = false;
        }, this, null);
        this.popCloseCb = Utils.addBtnEvent(this['pop_close'], function () {
            _this['gp_pop'].visible = false;
        }, this, null);
        var twLoading = egret.Tween.get(this['img_loading'], { loop: true });
        twLoading.to({ rotation: 360 }, 500);
    };
    GameScene.prototype.setPopCloseCb = function (cb) {
        this.popCloseCb = function () { cb; }, cb;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.popCloseCb, this);
    };
    GameScene.prototype.getQuestionList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tw;
            return __generator(this, function (_a) {
                egret.Tween.removeTweens(this['count_lbl']);
                tw = egret.Tween.get(this['count_lbl'], { loop: false });
                tw.to({ text: 3 }, 0).wait(1000).to({ text: 2 }, 0).wait(1000).to({ text: 1 }, 0).wait(1000).to({ text: 0 }, 0).call(function () {
                    _this['gp_count'].visible = false;
                    _this['gp_head'].visible = true;
                    _this['gp_answer'].visible = true;
                    _this.index = 0;
                    _this.choices = [];
                    _this.setChoices(); //this.resetAnswerCountdown();
                    /*		this['answer_count'].text = 10;
                                egret.Tween.removeTweens(this['answer_count']);
                                let tw = egret.Tween.get(this['answer_count'], { loop: false });
                                this['answer_count'].textColor = "#4c54b2";
                                for (let i: number = this['answer_count'].text - 1; i >= 0; i--) {
                                    if (i == 3) {
                                        tw.wait(1000).to({ text: i, textColor: "#FF0000" }, 0);
                                    } else {
                                        tw.wait(1000).to({ text: i }, 0);
                                    }
                                }
                                tw.call(() => {
                                    this['gp_pop'].visible = true;
                                    this['pop_yes'].visible = false;
                                    this['pop_no'].visible = false;
                                    this['pop_lbl'].text = "抱歉，时间已到\n本轮竞答结束";//这里是一开始初始的倒计时
                                    this['pop_title'].text = "提示";
                                    this['pop_close'].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.popCloseCb, this);
                                    this.popCloseCb = Utils.addBtnEvent(this['pop_close'], () => {
                                        this['gp_pop'].visible = false;
                                        this['gp_head'].visible = false;
                                        this['gp_answer'].visible = false;
                                        this['gp_over'].visible = true; this.updateScore();
                    
                                        this['over_win'].visible = false;
                                        this['over_lose'].visible = true;
                    
                                    }, this, null);
                                }, this);*/
                }, this);
                return [2 /*return*/];
            });
        });
    };
    GameScene.prototype.loadRank = function (type) {
        var _this = this;
        this.rankList = [];
        this.rankPageIndex = 0;
        this['rank_scroller'].viewport.scrollV = 0;
        this['rank_scroller'].viewport.scrollH = 0;
        this['rank_scroller_gp'].removeChildren();
        this['rank_title'].text = this.rank_types[type][3];
        this['gp_loading'].visible = true;
        rank({ type: type }, function (res) {
            console.log("bbbbbbbbbbb=", res);
            _this.rankList = res['result']['data'];
            _this.rankList.splice(50, 50);
            console.log("this.rankList=", _this.rankList);
            //let length = this.rankList.length;
            var l = _this.rankList.length < 4 ? _this.rankList.length : 4;
            if (_this.rankList.length <= 4) {
                l = _this.rankList.length;
                _this['rank_load'].visible = false;
            }
            else {
                l = 4;
                _this['rank_load'].visible = true;
            }
            for (var i = 0; i < l; i++) {
                var item = new eui.Component();
                item.skinName = "rankItemSkin";
                item['rank'].text = i + 1;
                Utils.loadHeadImg(_this.rankList[i].avatar, item['head']);
                item['nickname'].text = _this.rankList[i].nickname;
                item['score'].text = type == 0 ? _this.rankList[i].score_today : _this.rankList[i].score;
                item.width = 500;
                item.height = 100;
                _this['rank_scroller_gp'].addChild(item);
                //this.rankList[length + i] = this.rankList[i];
            }
            //this.rankList.splice(length-1,1); 
            /*
                            length = this.rankList.length;
                            for (let i: number = 0; i < length; i++) {
                                this.rankList[length + i] = this.rankList[i];
                            }
                            length = this.rankList.length;
                            for (let i: number = 0; i < length - 2; i++) {
                                this.rankList[length + i] = this.rankList[i];
                            }
                            console.log("this.rankList0000000000000000----", this.rankList);
            */
            //console.log("this.rankList0000000000000000----", this.rankList);
            //js[this.rank_types[type][1]] = 600;
            var count = 0;
            for (count; count < res['result']['data'].length; count++) {
                if (Utils.userInfo.id == res['result']['data'][count]._id) {
                    break;
                }
            }
            count = count + 1;
            if (count > 100) {
                _this['rank_myRank']['rank'].text = "100+";
            }
            else {
                _this['rank_myRank']['rank'].text = count;
            }
            _this['rank_myRank']['rank'].size = Math.floor(62 * 2 / _this['rank_myRank']['rank'].text.length);
            _this['rank_myRank']['rank'].size = _this['rank_myRank']['rank'].size >= 62 ? 62 : _this['rank_myRank']['rank'].size;
            Utils.loadHeadImg(Utils.userInfo.icon_url, _this['rank_myRank']['head']);
            _this['rank_myRank']['nickname'].text = Utils.userInfo.name;
            _this['rank_myRank']['score'].text = type == 0 ? Utils.userInfo.score_today : _this['splash_score'].text;
            _this['gp_loading'].visible = false;
            _this['gp_rank'].visible = true;
        });
        this['gp_rank'].visible = true;
    };
    GameScene.prototype.updateScore = function () {
        /*
        console.log("this.indexthis.indexthis.index=", this.index);
        let custId = "" + Utils.userInfo['encryptId'];
        let oneGameId = this.questionsList['oneGameId'];
        let resultScore = Utils.userInfo.score;
        let detailedResultList = [];
    
    
        let lists = this.questionsList['questionsList'];
    
        for (let i: number = 0; i < this.index; i++) {
            let list = lists[i];
            if (this.choices[i]) {
                list["userResultKey"] = this.choices[i][0];
                list["userResultCode"] = this.choices[i][1];;
            }
            detailedResultList[i] = list;
        }
        let param = {};
        param["custId"] = "" + Utils.userInfo['encryptId'];
        param["oneGameId"] = this.questionsList['oneGameId'];
        param["resultScore"] = Utils.userInfo.score;
        param["detailedResultList"] = detailedResultList;
        param["passNumber"] = this.passUseCount;
        param["tipsNumber"] = this.helpUseCount;
    
        console.log("this.choices=", this.choices);
        console.log("param000=", param);
    */
        //AESEncryptUtil.httpRequestPost(JSON.stringify(param), "saveData", (result) => {
        //	console.log("JSON.parse(result)===", JSON.parse(result));
        //});
    };
    GameScene.prototype.showToast = function (msg) {
        this['gp_toast'].visible = true;
        egret.Tween.removeTweens(this['gp_toast']);
        this['gp_toast'].y = 700;
        this['toast_lbl'].text = msg;
        var twLoading = egret.Tween.get(this['gp_toast'], { loop: false });
        twLoading.to({ y: -41 }, 3000);
    };
    GameScene.prototype.setChoices = function () {
        var _this = this;
        this['answer_count'].text = "";
        egret.Tween.removeTweens(this['answer_count']);
        for (var i = 0; i < 5; i++) {
            if (i <= this.index % 5) {
                this['answer_progress']['dark' + i].visible = false;
                this['answer_progress']['g' + i].visible = true;
            }
            else {
                this['answer_progress']['dark' + i].visible = true;
                this['answer_progress']['g' + i].visible = false;
            }
            this['answer_progress']['t' + i].text = "" + (Math.floor(this.index / 5) * 5 + 1 + i);
        }
        this['answer_title'].text = "第" + Utils.convertToChinaNum(this.index + 1) + "题";
        this['answer_level'].text = this.answer_indexes[this.index].length == 1 ? "单选" : "多选";
        //this['answer_lbl'].text = this.question_strs[this.index];
        /*
                if (this.language == 0) {
                    this['answer_lbl'].text = this.question_strs[this.index];
                    this['answer_test'].text = this.question_strs[this.index];
                } else if (this.language == 1) {
                    if (this.question_strs1[this.index] == 2) {
                        this['answer_lbl'].text = ZangQuestion.str[2];
                        this['answer_test'].text = HanQuestion.str[2];
                    } else if (this.question_strs1[this.index] == 69) {
                        this['answer_lbl'].text = ZangQuestion.str[69];
                        this['answer_test'].text = HanQuestion.str[69];
                    } else if (this.question_strs1[this.index] == 76) {
                        this['answer_lbl'].text = ZangQuestion.str[76];
                        this['answer_test'].text = HanQuestion.str[76];
                    } else if (this.question_strs1[this.index] == 98) {
                        this['answer_lbl'].text = ZangQuestion.str[98];
                        this['answer_test'].text = HanQuestion.str[98];
                    } else {
                        this['answer_lbl'].text = this.question_strs1[this.index];
                        this['answer_test'].text = this.question_strs[this.index];
                    }
                } else if (this.language == 2) {
                    if (this.question_strs1[this.index] == 2) {
                        this['answer_lbl'].text = YiQuestion.str[2];
                        this['answer_test'].text = HanQuestion.str[2];
                    } else if (this.question_strs1[this.index] == 69) {
                        this['answer_lbl'].text = YiQuestion.str[69];
                        this['answer_test'].text = HanQuestion.str[69];
                    } else if (this.question_strs1[this.index] == 76) {
                        this['answer_lbl'].text = YiQuestion.str[76];
                        this['answer_test'].text = HanQuestion.str[76];
                    } else if (this.question_strs1[this.index] == 98) {
                        this['answer_lbl'].text = YiQuestion.str[98];
                        this['answer_test'].text = HanQuestion.str[98];
                    } else {
                        this['answer_lbl'].text = this.question_strs2[this.index];
                        this['answer_test'].text = this.question_strs[this.index];
                    }
                }
                this['answer_test'].text = this['answer_test'].text + "备选项：" + "\n";
                */
        this['answer_lbl'].text = this.question_strs[this.index];
        //console.log("78=" + this.language + "---" + this.index + "===" + this.question_strs2[this.index] + "=hhh=", this['answer_lbl_2']);
        /*
                if (this['answer_lbl'].text.length <= 64) {
                    this['answer_lbl'].size = 40;
                } else if (this['answer_lbl'].text.length <= 76) {
                    this['answer_lbl'].size = 34;
                } else {//92
                    this['answer_lbl'].size = 28;
                }*/
        egret.Tween.removeTweens(this['answer_title']);
        egret.Tween.removeTweens(this['answer_level']);
        egret.Tween.removeTweens(this['answer_lbl']);
        this['answer_title'].alpha = 0;
        this['answer_title'].horizontalCenter = -160;
        var titleTw = egret.Tween.get(this['answer_title'], { loop: false });
        titleTw.to({ alpha: 1, horizontalCenter: -40 }, 900)
            .to({ horizontalCenter: 40 }, 600)
            .to({ alpha: 0, horizontalCenter: 80 }, 150);
        this['answer_level'].alpha = 0;
        this['answer_level'].horizontalCenter = 160;
        var levelTw = egret.Tween.get(this['answer_level'], { loop: false });
        levelTw.to({ alpha: 1, horizontalCenter: 40 }, 900)
            .to({ horizontalCenter: -40 }, 600)
            .to({ alpha: 0, horizontalCenter: -80 }, 150);
        //if (this.language == 0) {
        this['answer_lbl'].alpha = 0;
        var lblTw = egret.Tween.get(this['answer_lbl'], { loop: false });
        lblTw.wait(900 + 600 + 150).to({ alpha: 1 }, 300)
            .call(function () { _this.resetAnswerCountdown(); }, this); //lblTw.to({ alpha: 1 }, 300);
        /*} else if (this.language == 1) {
            this['answer_lbl_1'].alpha = 0;
            let lblTw = egret.Tween.get(this['answer_lbl_1'], { loop: false });
            lblTw.wait(900 + 600 + 150).to({ alpha: 1 }, 300)
                .call(() => { this.resetAnswerCountdown(); }, this);//lblTw.to({ alpha: 1 }, 300);
        } else if (this.language == 2) {
            this['answer_lbl_2'].alpha = 0;
            let lblTw = egret.Tween.get(this['answer_lbl_2'], { loop: false });
            lblTw.wait(900 + 600 + 150).to({ alpha: 1 }, 300)
                .call(() => { this.resetAnswerCountdown(); }, this);//lblTw.to({ alpha: 1 }, 300);
        }*/
        console.log("this.index=========choice_strs" + this.index);
        for (var i = 0; i < 4; i++) {
            egret.Tween.removeTweens(this["answer_choice" + i]);
            this["answer_choice" + i].y = this.answer_choices_y[0];
            this["answer_choice" + i].touchEnabled = false;
            this["answer_choice" + i].visible = false;
            this["answer_choice" + i]['green'].visible = false;
            this["answer_choice" + i]['red'].visible = false;
            this["answer_choice" + i]['blue'].visible = true;
        }
        //console.log("this.choice_strs['this.index'].length==" + this.choice_strs[this.index].length);
        var choiceSum = 0;
        var _loop_1 = function (i) {
            var tw = egret.Tween.get(this_1["answer_choice" + i], { loop: false });
            tw.wait(900 + 600 + 150 + 300) //tw.wait(900 + 600 + 150 + 300)
                .to({ visible: true })
                .to({ y: this_1.answer_choices_y[i] + 80 }, 160)
                .to({ y: this_1.answer_choices_y[i] }, 100)
                .to({ touchEnabled: true })
                .call(function (j) {
            }, this_1);
            //this["answer_choice" + i]['green'].visible = false;
            //this["answer_choice" + i]['red'].visible = false;
            //this["answer_choice" + i]['blue'].visible = true;
            //this["answer_choice" + i]['lbl'].text = this.choice_strs[this.index][i];
            /*
            
                        if (this.language == 0) {
                            this["answer_choice" + i]['lbl_0'].text = this.choice_strs[this.index][i];
                            this['answer_test'].text = this['answer_test'].text + this.choice_strs[this.index][i] + "\n";
                        } else if (this.language == 1) {
                            if (this.choice_strs1[this.index][i] == 2) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[2][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[2][i] + "\n";
                            } else if (this.choice_strs1[this.index][i] == 69) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[69][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[69][i] + "\n";
                            } else if (this.choice_strs1[this.index][i] == 76) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[76][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[76][i] + "\n";
                            } else if (this.choice_strs1[this.index][i] == 98) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[98][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[98][i] + "\n";
                            } else {
                                this["answer_choice" + i]['lbl_0'].text = this.choice_strs1[this.index][i];
                                this['answer_test'].text = this['answer_test'].text + this.choice_strs[this.index][i] + "\n";
                            }
            
                        } else if (this.language == 2) {
            
            
                            if (this.choice_strs1[this.index][i] == 2) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[2][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[2][i] + "\n";
                            } else if (this.choice_strs1[this.index][i] == 69) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[69][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[69][i] + "\n";
                            } else if (this.choice_strs1[this.index][i] == 76) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[76][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[76][i] + "\n";
                            } else if (this.choice_strs1[this.index][i] == 98) {
                                this["answer_choice" + i]['lbl_0'].text = ZangChoice.str[98][i];
                                this['answer_test'].text = this['answer_test'].text + HanChoice.str[98][i] + "\n";
                            } else {
                                this["answer_choice" + i]['lbl_0'].text = this.choice_strs2[this.index][i];
                                this['answer_test'].text = this['answer_test'].text + this.choice_strs[this.index][i] + "\n";
                            }
            
                        }
            */
            this_1["answer_choice" + i]['lbl_0'].text = this_1.choice_strs[this_1.index][i];
            if (i == this_1.choice_strs[this_1.index].length - 1) {
                this_1['answer_test'].text = this_1['answer_test'].text + "答案：";
                for (var j = 0; j < this_1.answer_indexes[this_1.index].length; j++) {
                    if (this_1.answer_indexes[this_1.index][j] == 0) {
                        this_1['answer_test'].text = this_1['answer_test'].text + "A";
                    }
                    else if (this_1.answer_indexes[this_1.index][j] == 1) {
                        this_1['answer_test'].text = this_1['answer_test'].text + "B";
                    }
                    else if (this_1.answer_indexes[this_1.index][j] == 2) {
                        this_1['answer_test'].text = this_1['answer_test'].text + "C";
                    }
                    else if (this_1.answer_indexes[this_1.index][j] == 3) {
                        this_1['answer_test'].text = this_1['answer_test'].text + "D";
                    }
                }
            }
            //console.log("ccc-" + i + "==", this["answer_choice" + i]['lbl_2']);
            if (this_1.choicesCb[i]) {
                this_1["answer_choice" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this_1.choicesCb[i], this_1);
            }
            this_1.choicesCb[i] = Utils.addBtnEvent(this_1["answer_choice" + i], function () {
                _this['answer_count'].text = "";
                //console.log("8989898989this.questionsList['questionsList']85==", this.questionsList['questionsList'][this.index]["questionsAnswerList"][i]);
                //let p = this.questionsList['questionsList'][this.index]["questionsAnswerList"][i]
                //this.choices[this.index] = [p['id'], p['answerCode']];
                var flag = false;
                for (var j = 0; j < _this.answer_indexes[_this.index].length; j++) {
                    if (i == _this.answer_indexes[_this.index][j]) {
                        flag = true;
                        break;
                    }
                }
                console.log("是否正确==" + flag);
                if (flag) {
                    console.log(_this["answer_choice" + i]['green'].visible + "==正确=choiceSum=" + choiceSum);
                    //this.resetAnswerCountdown();//每次答题正确就重启倒计时
                    //let soundChannel: egret.SoundChannel = this.winSound.play(0, 1);
                    //soundChannel.volume = this.volume;
                    if (!_this["answer_choice" + i]['green'].visible) {
                        _this["answer_choice" + i]['green'].visible = true;
                        //console.log("888888888this.questionsList========", this.questionsList['questionsList'][this.index]['availableScore']);
                        //console.log("444444444444this.questionsList[this.index]========", this.questionsList[this.index]);
                        //console.log("th斤斤计较军军军is.choice========" + this.questionsList[this.index]['availableScore']);
                        choiceSum++;
                        if (choiceSum == _this.answer_indexes[_this.index].length) {
                            _this['answer_beat'].text = 1;
                            //Utils.userInfo.score = Utils.userInfo.score + 1;
                            _this['over_score'].text = "" + ((parseInt(_this['over_score'].text)) + 1);
                            _this['splash_score'].text = "" + ((parseInt(_this['splash_score'].text)) + 1);
                            Utils.userInfo.score_today = (parseInt("" + Utils.userInfo.score_today) + 1);
                            _this.index = _this.index + 1;
                            _this.setNext(true);
                        }
                    }
                }
                else {
                    console.log("错误");
                    //this['splash_score'].text = Utils.userInfo.score + parseInt(this['splash_score'].text);
                    //egret.localStorage.setItem("mul_score", this['splash_score'].text);
                    _this['answer_beat'].text = 0;
                    //let soundChannel: egret.SoundChannel = this.loseSound.play(0, 1);
                    //soundChannel.volume = this.volume;
                    _this["answer_choice" + i]['red'].visible = true;
                    console.log("错误--" + "-changchang-", _this.answer_indexes[_this.index].length);
                    for (var j = 0; j < _this.answer_indexes[_this.index].length; j++) {
                        console.log("错误--" + j + "--", _this.answer_indexes[_this.index][j]);
                        _this["answer_choice" + _this.answer_indexes[_this.index][j]]['green'].visible = true;
                    }
                    var tw_1 = egret.Tween.get(_this['answer_mask'], { loop: false });
                    _this.index = _this.index + 1;
                    tw_1.to({ visible: true, alpha: 0.2 })
                        .to({ alpha: 0.8 }, 200).to({ alpha: 0.2 }, 200)
                        .to({ alpha: 0.8 }, 200).to({ alpha: 0.2 }, 200)
                        .to({ visible: false })
                        .call(function () {
                        _this.setNext(false);
                    }, _this);
                    var answerTw = egret.Tween.get(_this['gp_answer'], { loop: false });
                    answerTw.to({ left: -5 }, 200).to({ top: -5 }, 200)
                        .to({ left: 0 }, 200).to({ top: 0 }, 200)
                        .call(function () {
                        _this.setNext(false);
                    }, _this);
                }
            }, this_1, null);
        };
        var this_1 = this;
        for (var i = 0; i < this.choice_strs[this.index].length; i++) {
            _loop_1(i);
        }
    };
    GameScene.prototype.setNext = function (right) {
        var _this = this;
        this['answer_scroller'].viewport.scrollH = 0;
        var _loop_2 = function (k) {
            egret.Tween.removeTweens(this_2["answer_choice" + k]);
            this_2["answer_choice" + k].touchEnabled = false;
            var tw = egret.Tween.get(this_2["answer_choice" + k], { loop: false });
            tw.to({ y: this_2.answer_choices_y[0] }, 160 * 1)
                .to({ visible: false })
                .call(function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var tw_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(k == 0)) return [3 /*break*/, 3];
                            if (!(this.index == this.question_strs.length)) return [3 /*break*/, 2];
                            egret.Tween.removeTweens(this['answer_count']);
                            this['gp_head'].visible = false;
                            this['gp_answer'].visible = false;
                            this['gp_over'].visible = true;
                            this.updateScore();
                            this['over_win'].visible = true;
                            this['over_lose'].visible = false;
                            this['over_lbl'].text = "答题成功"; // "答题成功";
                            return [4 /*yield*/, score({ score: (parseInt(this['over_score'].text)), id: Utils.userInfo.id })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            console.log("----tyututu---this['answer_beat']=" + this['answer_beat'].text);
                            if (right) {
                                this['answer_beat'].visible = true;
                                this['answer_beat'].x = this["answer_choice" + k].x + this["answer_choice" + k].width / 2;
                                this['answer_beat'].y = this["answer_choice" + k].y + this["answer_choice" + k].height / 2;
                                tw_2 = egret.Tween.get(this['answer_beat'], { loop: false });
                                tw_2.to({ x: this['answer_score'].x, y: this['answer_score'].y }, 500)
                                    .to({ visible: false })
                                    .call(function () {
                                    var tw = egret.Tween.get(_this['answer_score'], { loop: false });
                                    tw.to({ text: "" + (parseInt(_this['answer_score'].text) + 1) })
                                        .to({ scaleX: 2, scaleY: 2 }, 200)
                                        .to({ scaleX: 0.7, scaleY: 0.7 }, 200)
                                        .to({ scaleX: 1, scaleY: 1 }, 300)
                                        .call(function () {
                                    }, _this);
                                }, this);
                            }
                            this.setChoices();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, this_2);
        };
        var this_2 = this;
        for (var k = 0; k < 4; k++) {
            _loop_2(k);
        }
    };
    GameScene.prototype.resetAnswerCountdown = function (time, isReset) {
        var _this = this;
        if (time === void 0) { time = "45"; }
        if (isReset === void 0) { isReset = true; }
        if (isReset) {
        }
        this['answer_count'].text = time;
        egret.Tween.removeTweens(this['answer_count']);
        var tw = egret.Tween.get(this['answer_count'], { loop: false });
        if (parseInt(time) > 3) {
            this['answer_count'].textColor = "#4c54b2";
        }
        for (var i = this['answer_count'].text - 1; i >= 0; i--) {
            if (i == 3) {
                tw.wait(1000).to({ text: i, textColor: "#FF0000" }, 0);
            }
            else {
                tw.wait(1000).to({ text: i }, 0);
            }
        }
        tw.call(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.index = this.index + 1;
                this.setNext(false);
                return [2 /*return*/];
            });
        }); }, this);
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
