import { communicate } from '../../communicate';
import { pid_format_all } from '../pattern';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
            //为了解决html2pdf的跨域问题，我们需要给所有的img标签加上一个attr
            i.setAttribute('crossorigin', 'anonymous');
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
            const parent_width = i.parentElement.offsetWidth;
            if(width > parent_width){
                i.style.width = `${ width + 50 }px`;
            }else{
                i.style.width = `${ parent_width - 3 }px`;
            }
            i.parentElement.style.width = `${ parent_width }px`;
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

/**
 * 
 * @param {*} dom 你要渲染的element
 * 使用async await获取返回的pdf对象，调用pdf.save('name.pdf')下载
 */
export const html2pdf = (dom, quality) => new Promise(async (resolve, reject) => {
    //没错就是抄的代码=，= 自己造轮子没必要奥 https://github.com/linwalker/render-html-to-pdf
    try{
        const canvas = await html2canvas(dom, {
            width: dom.offsetWidth,
            height: dom.offsetHeight,
            windowWidth: document.body.scrollWidth,
            windowHeight: document.body.scrollHeight,
            useCORS: true,
            allowTaint: true,
            scale: quality,
        });
        
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        
        //一页pdf显示html页面生成的canvas高度;
        const pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        let leftHeight = contentHeight;
        //页面偏移
        let position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 575.28;
        const imgHeight = 592.28/contentWidth * contentHeight;
        
        const pageData = canvas.toDataURL('image/jpeg', 1.0);
        
        const pdf = new jspdf('', 'pt', 'a4');
        
        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 10, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 10, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }
        resolve(pdf);
    }catch(e){
        reject('在渲染html的时候发生了亿点点小错误QAQ');
    }
});

export default {
    html2pdf,
    computeDomMaxOffsetRight,
    RichContentRender,
    analysisRichContent   
}