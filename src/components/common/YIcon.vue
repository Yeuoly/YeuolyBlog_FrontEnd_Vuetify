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
    @font-face {
        font-family: 'iconfont';  /* project id 1090944 */
        src: url('//at.alicdn.com/t/font_1090944_h5bfdpcivfm.eot');
        src: url('//at.alicdn.com/t/font_1090944_h5bfdpcivfm.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1090944_h5bfdpcivfm.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1090944_h5bfdpcivfm.woff') format('woff'),
        url('//at.alicdn.com/t/font_1090944_h5bfdpcivfm.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1090944_h5bfdpcivfm.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconshaixuan:before{
        content: "\e64d" !important;
    }

    .iconsousuo:before{
        content: "\e638" !important;
    }

    .iconshuaxin:before{
        content: "\e666" !important;
    }

    .iconjia:before{
        content: "\e65e" !important;
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