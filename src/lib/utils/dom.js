import { communicate } from '../../communicate';
import { pid_format_all } from '../pattern';
import utils from './index';
import katex from 'katex';
import Vue from 'vue';
import BlogPreviewer from '../../components/common/BlogPreviewer';
import '../../style/hljs-tomorrow.css';

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
            if(!pid_format_all.test(pid))continue;
            new Vue({
                data : () => ({ pid }),
                render : h => h(BlogPreviewer)
            }).$mount(i);
        }else if(i.children.length){
            RichContentRender(i, handle_img);
        }
    }
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
    RichContentRender,
    analysisRichContent   
}