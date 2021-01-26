import { communicate } from '../../communicate';
import { pid_format_all } from '../pattern';
import utils from './index';
import katex from 'katex';
import Vue from 'vue';
import BlogPreviewer from '../../components/common/BlogPreviewer';
import '../../style/hljs-tomorrow.css';
import '../../style/latexpression.css';
import '../../style/code.css';

export const RichContentRender = (dom, handle_img) => {
    for(let i of dom.children){
        if(i.tagName === 'LATEXPRESSION'){
            const size = parseInt(i.getAttribute('size')) || 16;
            i.style.fontSize = `${size}px`;
            katex.render(i.innerText, i, { throwOnError: false });
        }else if(handle_img && i.tagName === 'IMG'){
            //初始化图片点击开大窗事件，先添加指令
            i.onclick = ev => {
                communicate.$emit('previewImg', ev.target.src);
            }
        }else if(i.tagName === 'BLOGPREVIEW'){
            //对于BlogPreview，我们使用先判断pid格式，我们需要新建一个Vue对象来处理它
            const pid = i.innerText;
            if(!pid.match(pid_format_all))continue;
            new Vue({
                data : () => ({ pid }),
                render : h => h(BlogPreviewer)
            }).$mount(i);
        }else if(i.tagName === 'CODE'){
            //如果是code标签的，我们提前令code标签的width为一个很大的值，然后计算最大的offsetRight，并令width等于这个东西，这么做的目的是不让这个code标签里的东西wrap起来
            const width = computeDomMaxOffsetRight(i) - i.offsetLeft;
            const p_w = i.parentElement.offsetWidth;
            if(width > p_w){
                i.style.width = `${ width + 50 }px`;
            }else{
                i.style.width = `${ p_w - 3 }px`;
            }
            i.parentElement.style.width = `${ p_w }px`;
            i.parentElement.style.overflow = 'scroll';
            i.parentElement.classList.add('y-code');
        }else if(i.children.length){
            RichContentRender(i, handle_img);
        }
    }
}

export const computeDomMaxOffsetRight = dom => {
    let max = 0;
    if(!dom.children.length){
        const w = dom.offsetLeft + dom.offsetWidth;
        max = w > max ? w : max;
    }else{
        for(const i of dom.children){
            const w = computeDomMaxOffsetRight(i);
            max = w > max ? w : max;
        }
    }
    return max;
}

export const analysisRichContent = (html, handle_img) => {
    let dom = null;
    if(typeof html === 'string'){
        dom = document.createElement('div');
        //记得走一波xss过滤
        dom.innerHTML = utils.xss_filter(html);
    }else{
        dom = html;
    }
    RichContentRender(dom, handle_img);
    return dom;
}

export default {
    computeDomMaxOffsetRight,
    RichContentRender,
    analysisRichContent   
}