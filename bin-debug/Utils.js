var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    /**
     * @param {obj 灰化对象}
     */
    Utils.ColorGrey = function (obj, isShow, isTouch) {
        if (isShow === void 0) { isShow = true; }
        if (isTouch === void 0) { isTouch = true; }
        var colorMatrix = [0.33, 0.33, 0.33, 0, 0,
            0.33, 0.33, 0.33, 0, 0,
            0.33, 0.33, 0.33, 0, 0,
            0, 0, 0, 1, 0];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        if (isTouch)
            obj["touchEnabled"] = !isShow;
        if (isShow) {
            obj.filters = [colorFlilter];
        }
        else {
            obj.filters = [];
        }
    };
    Utils.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Utils.getWeek = function (date) {
        var d1 = new Date(date);
        var d2 = new Date(date);
        d2.setMonth(0);
        d2.setDate(1);
        var rq = d1.getTime() - d2.getTime();
        var days = Math.ceil(rq / (24 * 60 * 60 * 1000));
        var num = Math.ceil(days / 7);
        return num;
    };
    Utils.loadHeadImg = function (url, headimg) {
        if ([null, undefined].indexOf(url) == -1 && url.length > 0) {
            var imageLoader = new egret.ImageLoader();
            imageLoader.crossOrigin = "anonymous";
            imageLoader.load(url);
            imageLoader.addEventListener(egret.Event.COMPLETE, function () {
                var texture = new egret.Texture();
                texture.bitmapData = imageLoader.data;
                if (texture) {
                    headimg.source = texture;
                    headimg.visible = true;
                }
            }, this);
        }
    };
    Utils.decodeInviteCode = function (inviteCode) {
        var ids = inviteCode.substr(5, 7);
        var teamids = inviteCode.substr(0, 5);
        var id = 0;
        var teamid = 0;
        for (var i = 6; i >= 0; i--) {
            id = id + this.inviteCodeSoureString.indexOf(ids.charAt(i)) * Math.pow(74, 6 - i);
        }
        for (var i = 4; i >= 0; i--) {
            teamid = teamid + this.inviteCodeSoureString.indexOf(teamids.charAt(i)) * Math.pow(74, 4 - i);
        }
        console.log(ids + "---" + teamids + "---" + id + "---" + teamid);
        return { id: id, teamId: teamid };
    };
    // 按钮事件的处理
    // btn 图片按钮或者按钮
    // cb 按钮的处理事件
    // that 传递this进来
    // obj 传递参数
    // type 按钮的动作类型
    // sound 是否播放音响，为空表示播放默认音效
    Utils.addBtnEvent = function (btn, cb, that, obj, type, sound, delay) {
        if (type === void 0) { type = 1; }
        if (sound === void 0) { sound = ''; }
        if (delay === void 0) { delay = 0; }
        if (delay == 0) {
            delay = 200;
        }
        if ([null, undefined].indexOf(btn) != -1 || btn.parent == null) {
            return;
        }
        if (btn.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            return;
        }
        var original = btn.scaleX;
        var callcb = function (event) {
            egret.Tween.get(btn).to({
                scaleX: original * 1.0,
                scaleY: original * 1.0
            }, 100).call(function () {
                if (cb != null) {
                    cb.call(that, that, obj, event);
                }
                egret.setTimeout(function () {
                    btn.touchEnabled = true;
                }, this, 200);
            });
        };
        var taped = function (type, event) {
            if (type == 1) {
                egret.Tween.get(btn).to({
                    scaleX: original * 0.95,
                    scaleY: original * 0.95
                }, 100).call(function () {
                    callcb(event);
                });
            }
            else {
                if (cb != null) {
                    cb.call(that, that, obj, event);
                }
                // egret.Tween.get(btn).to({scaleX: original * 0.95, 
                //                          scaleY: original * 0.95}, 100)
                //                     .to({scaleX: original * 1, scaleY: original * 1}, 100);
                egret.setTimeout(function () {
                    btn.touchEnabled = true;
                }, this, 200);
            }
        };
        var listenerTap = function (event) {
            if (btn.touchEnabled) {
                // Utils.playEffect("click_mp3");
                btn.touchEnabled = false;
                taped(type, event);
            }
        };
        /*        var lisenerRemoved = function () {
                    btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, listenerTap, that);
                }*/
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, listenerTap, that);
        return listenerTap;
    };
    Utils.getScreenSize = function () {
        var wid, hei; //宽,高,像素比  
        //获取窗口宽度 
        if (!egret.Capabilities.isMobile) {
            //不是mobile 就是pc
            if ((document.body) && (document.body.clientWidth)) {
                wid = document.body.clientWidth;
            }
            else if (window && window.innerWidth) {
                wid = window.innerWidth;
            }
            if ((document.body) && (document.body.clientHeight)) {
                hei = document.body.clientHeight;
            }
            else if (window && window.innerHeight) {
                hei = window.innerHeight;
            }
            var w, h;
            w = wid;
            h = hei;
            var rotate = false;
            if (w < h && egret.MainContext.instance.stage.orientation == egret.OrientationMode.LANDSCAPE) {
                wid = h;
                hei = w;
                rotate = true;
            }
            return { w: wid, h: hei, r: rotate };
        }
        if (window && window.innerWidth) {
            wid = window.innerWidth;
        }
        else if ((document.body) && (document.body.clientWidth)) {
            wid = document.body.clientWidth;
        }
        //获取窗口高度  
        if (window && window.innerHeight) {
            hei = window.innerHeight;
        }
        else if ((document.body) && (document.body.clientHeight)) {
            hei = document.body.clientHeight;
        }
        //通过深入Document内部对body进行检测，获取窗口大小  
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            wid = document.documentElement.clientWidth;
            hei = document.documentElement.clientHeight;
        }
        var w, h;
        w = wid;
        h = hei;
        var rotate = false;
        if (w < h && egret.MainContext.instance.stage.orientation == egret.OrientationMode.LANDSCAPE) {
            wid = h;
            hei = w;
            rotate = true;
        }
        return { w: wid, h: hei, r: rotate };
    };
    Utils.convertToChinaNum = function (num) {
        var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
        var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'); //可继续追加更高位转换值
        if (!num || isNaN(num)) {
            return "零";
        }
        var english = num.toString().split("");
        var result = "";
        for (var i = 0; i < english.length; i++) {
            var des_i = english.length - 1 - i; //倒序排列设值
            result = arr2[i] + result;
            var arr1_index = english[des_i];
            result = arr1[arr1_index] + result;
        }
        //将【零千、零百】换成【零】 【十零】换成【十】
        result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
        //合并中间多个零为一个零
        result = result.replace(/零+/g, '零');
        //将【零亿】换成【亿】【零万】换成【万】
        result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
        //将【亿万】换成【亿】
        result = result.replace(/亿万/g, '亿');
        //移除末尾的零
        result = result.replace(/零+$/, '');
        //将【零一十】换成【零十】
        //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
        //将【一十】换成【十】
        result = result.replace(/^一十/g, '十');
        return result;
    };
    Utils.userInfo = {
        language: 0, id: "0", icon_url: "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/96",
        name: "农场测试用户12345679", score: 66, score_today: 77,
    };
    Utils.sightWords = "的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而" +
        "过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头" +
        "经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感见明问力理尔点文几定本公特做外孩相西果走将月十" +
        "实向声车全信重三机工物气每并别真打太新比才便夫再书部水像眼等体却加电主界门利海受听表德少克代员许稜先口由死安写性马光白" +
        "或住难望教命花结乐色更拉东神记处让母父应直字场平报友关放至张认接告入笑内英军候民岁往何度山觉路带万男边风解叫任金快原吃" +
        "妈变通师立象数四失满战远格士音轻目条呢病始达深完今提求清王化空业思切怎非找片罗钱紶吗语元喜曾离飞科言干流欢约各即指合反" +
        "题必该论交终林请医晚制球决窢传画保读运及则房早院量苦火布品近坐产答星精视五连司巴奇管类未朋且婚台夜青北队久乎越观落尽形" +
        "影红爸百令周吧识步希亚术留市半热送兴造谈容极随演收首根讲整式取照办强石古华諣拿计您装似足双妻尼转诉米称丽客南领节衣站黑" +
        "刻统断福城故历惊脸选包紧争另建维绝树系伤示愿持千史谁准联妇纪基买志静阿诗独复痛消社算算义竟确酒需单治卡幸兰念举仅钟怕共" +
        "毛句息功官待究跟穿室易游程号居考突皮哪费倒价图具刚脑永歌响商礼细专黄块脚味灵改据般破引食仍存众注笔甚某沉血备习校默务土" +
        "微娘须试怀料调广蜖苏显赛查密议底列富梦错座参八除跑亮假印设线温虽掉京初养香停际致阳纸李纳验助激够严证帝饭忘趣支春集丈木" +
        "研班普导顿睡展跳获艺六波察群皇段急庭创区奥器谢弟店否害草排背止组州朝封睛板角况曲馆育忙质河续哥呼若推境遇雨标姐充围案伦" +
        "护冷警贝著雪索剧啊船险烟依斗值帮汉慢佛肯闻唱沙局伯族低玩资屋击速顾泪洲团圣旁堂兵七露园牛哭旅街劳型烈姑陈莫鱼异抱宝权鲁" +
        "简态级票怪寻杀律胜份汽右洋范床舞秘午登楼贵吸责例追较职属渐左录丝牙党继托赶章智冲叶胡吉卖坚喝肉遗救修松临藏担戏善卫药悲" +
        "敢靠伊村戴词森耳差短祖云规窗散迷油旧适乡架恩投弹铁博雷府压超负勒杂醒洗采毫嘴毕九冰既状乱景席珍童顶派素脱农疑练野按犯拍" +
        "征坏骨余承置臓彩灯巨琴免环姆暗换技翻束增忍餐洛塞缺忆判欧层付阵玛批岛项狗休懂武革良恶恋委拥娜妙探呀营退摇弄桌熟诺宣银势" +
        "奖宫忽套康供优课鸟喊降夏困刘罪亡鞋健模败伴守挥鲜财孤枪禁恐伙杰迹妹藸遍盖副坦牌江顺秋萨菜划授归浪听凡预奶雄升碃编典袋莱" +
        "含盛济蒙棋端腿招释介烧误";
    Utils.inviteCodeSoureString = "6E?tGH,q9>;4QSmA:*nJxB~W3^a+2PV#Mu%XYCjr8sUDk!hiNZF$L=Tp.c5e<w@bvf1Kg7yRdz";
    Utils.inviteCode = "";
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
