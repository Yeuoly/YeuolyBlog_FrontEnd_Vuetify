let XSS = require('xss');
const XSSFilterXSS = new XSS.FilterXSS({
    css : {
        whiteList : {
            'color' : true,
            'background-color': true,
            'top' : true,
            'left' : true,
            'text-decoration-line' : true,
            'font-family' : true,
            'font-size' : true,
            'font-weight' : true,
            'border-collapse' : true,
            'width' : true,
            'height' : true,
            'border' : true,
            'position' : true,
            'overflow' : true,
            'clip' : true,
            'padding-left' : true,
            'padding-right' : true,
            'padding-top' : true,
            'padding-bottom' : true,
            'padding' : true,
            'background-image' : true,
            'background' : true,
            'margin' : true,
            'margin-left' : true,
            'margin-right' : true,
            'margin-top' : true,
            'margin-bottom' : true,
        }
    },
    whiteList : {
        p : ['style','class'],
        h1 : ['style','class'],
        h2 : ['style','class'],
        h3 : ['style','class'],
        h4 : ['style','class'],
        h5 : ['style','class'],
        h6 : ['style','class'],
        span : ['style','class'],
        br : [],
        img : ['src','class','preview'],
        a : ['href','target'],
        sup : ['class'],
        ol : ['class'],
        li : ['class'],
        ul : ['class'],
        blockquote : ['class'],
        em : ['class'],
        s : ['class'],
        u : ['class'],
        strong : ['class'],
        pre : ['class','spellcheck'],
        font : ['class','size'],
        table : ['border','width','cellpadding','cellspacing','style'],
        tbody : [],
        tr : ['height'],
        th : [],
        td : ['class','width','colspan','rowspan','height'],
        div : ['style','class'],
        colgroup : [],
        col : ['width','span'],
        code : [],
        pmicrosoft : [],
        spanmicrosoft : [],
        latexpression : ['size'],
        blogpreview : ['pid'],
        b : [],
        small : [],
        big : [],
        mark : [],
        hr : []
    }
});

export default {
    date(format, timestamp){
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let res = '';
        format.split('').forEach( item => {
            if(item === 'Y'){
                res += date.getFullYear();
            }else if(item  === 'M'){
                res += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
            }else if(item  === 'D'){
                res += date.getDate();
            }else if(item  === 'h'){
                res += date.getHours();
            }else if(item  === 'm'){
                res += date.getMinutes();
            }else if(item  === 's'){
                res += date.getSeconds();
            }else{
                res += item;
            }
        });
        return res;
    },
    array_push(dist,item){
        if(dist.indexOf(item)){
            dist.push(item);
        }
    },
    array_merge(dist1,dist2){
        dist2.forEach( item => {
            this.array_push(dist1,item);
        });
        return dist1;
    },
    array_drop(dist,item){
        let ary = [];
        dist.forEach( _item => {
            if(_item !== item){
                ary.push(_item);
            }
        });
        return ary;
    },
    array_intersection(dist1,dist2){
        return dist1.filter( v => {
            return dist2.indexOf(v) !== -1
        });
    },
    xss_filter(html){
        return XSSFilterXSS.process(html);
    },
    sleep(misec){
        return new Promise( resolve => {
            setTimeout(function(){
                resolve();
            }, misec);
        });
    }
}