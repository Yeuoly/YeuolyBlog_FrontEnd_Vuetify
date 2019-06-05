<template>
    <i :class="iconName +' iconfont'"></i>
</template>

<script>
    export default {
        name: "YIcon",
        computed : {
            iconName(){
                if(typeof this.$slots.default[0].text === 'string')
                    return  'icon' + this.$slots.default[0].text.replace(/^\s+|\s+$/g,'');
                return 'default';
            }
        }
    }
</script>

<style>
    @font-face {font-family: "iconfont";
        src: url('//at.alicdn.com/t/font_1090944_6takyqzgi7i.eot?t=1559665747823'); /* IE9 */
        src: url('//at.alicdn.com/t/font_1090944_6takyqzgi7i.eot?t=1559665747823#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
        url('//at.alicdn.com/t/font_1090944_6takyqzgi7i.woff?t=1559665747823') format('woff'),
        url('//at.alicdn.com/t/font_1090944_6takyqzgi7i.ttf?t=1559665747823') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
        url('//at.alicdn.com/t/font_1090944_6takyqzgi7i.svg?t=1559665747823#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icondianji:before {
        content: "\e601" !important;
    }

    .icondenglu:before {
        content: "\e600" !important;
    }

    .iconzhuanfa:before {
        content: "\e6c4" !important;
    }

    .iconfawenzi:before {
        content: "\e6ed" !important;
    }

    .iconbiaoge:before {
        content: "\e796" !important;
    }

    .iconiconset0142:before {
        content: "\e629" !important;
    }

    .iconiconset0143:before {
        content: "\e62a" !important;
    }

    .iconimage:before {
        content: "\e743" !important;
    }

    .iconcss:before {
        content: "\e63b" !important;
    }

    .iconduihuakuang:before {
        content: "\e62f" !important;
    }

    .iconMyHome:before {
        content: "\e60e" !important;
    }

    .iconpinglun:before {
        content: "\e60f" !important;
    }

    .icontongji:before {
        content: "\e688" !important;
    }

    .iconyanzhengma:before {
        content: "\e636" !important;
    }

    .icontupian:before {
        content: "\e678" !important;
    }

    .iconyoucecaidan:before {
        content: "\e606" !important;
    }

    .iconshezhi:before {
        content: "\e60d" !important;
    }

    .iconyinsi:before {
        content: "\e7c6" !important;
    }

    .iconclick:before {
        content: "\e75a" !important;
    }

    .iconmail:before {
        content: "\e615" !important;
    }

    .iconshangchuan:before {
        content: "\e614" !important;
    }

    .iconwentifankui:before {
        content: "\e63a" !important;
    }

    .iconzhuye:before {
        content: "\e616" !important;
    }

    .iconxihuan:before {
        content: "\e6f1" !important;
    }

    .iconjinggao:before {
        content: "\eb65" !important;
    }

    .iconmysql:before {
        content: "\e667" !important;
    }

    .icontouxiang:before {
        content: "\e610" !important;
    }

    .icondian:before {
        content: "\ec1e" !important;
    }

    .iconyou:before {
        content: "\e648" !important;
    }

    .iconyibuliucheng:before {
        content: "\e699" !important;
    }

    .iconphp:before {
        content: "\f20e" !important;
    }

    .iconvuejs:before {
        content: "\f25f" !important;
    }

    .iconxiazai:before {
        content: "\e602" !important;
    }

    .iconHTML:before {
        content: "\e617" !important;
    }

    .iconjs:before {
        content: "\ec68" !important;
    }

    .iconlianjie:before {
        content: "\e604" !important;
    }

    .icongaojishezhi:before {
        content: "\e677" !important;
    }

    .iconzhuce:before {
        content: "\e71c" !important;
    }

    .iconcaidan:before {
        content: "\e65c" !important;
    }

    .icontianjia:before {
        content: "\e68a" !important;
    }

    .iconecharts_line:before {
        content: "\e6ae" !important;
    }

    .icon-dengchu:before {
        content: "\e68e" !important;
    }

</style>