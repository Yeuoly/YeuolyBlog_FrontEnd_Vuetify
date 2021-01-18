import  E from 'wangeditor';
import { messageBox } from '../../../communicate';
import { pid_format_all } from '../../pattern';
const { $, Panel, PanelMenu } = E;

const createPanel = (editor, active) => {
    const insertBlogPreview = pid => {
        editor.cmd.do('insertHTML', `<blogpreview>${pid}</blogpreview><p><br></p>`);
    }

    const selection = editor.selection.getSelectionContainerElem();
    const dom = selection.seletcor;
    //获取pid，如果非激活状态，就说明是新建的，那就给个空的pid
    let pid = active && pid_format_all.test(dom.innerText) ? dom.innerText : '';

    const conf = {
        width: 500,
        height : 0,
        tabs : [{
            title : '输入博客ID',
            tpl : `
                <div>
                    <input
                        type="text"
                        class="block"
                        placeholder="pid"
                        id="input-insert-blog"
                        value="${pid}"
                    />
                    <div class="w-e-button-container">
                        <button type="button" id="btn-insert-blog" class="right">
                            确定
                        </button>
                    </div>
                </div>
            `,
            events : [{
                selector : '#input-insert-blog',
                type : 'input',
                fn : v => {
                    //获取输入的pid，判断格式，然后再修改pid
                    const _pid = v.target.value;
                    if(!pid_format_all.test(_pid))
                        v.target.value = pid;
                    else
                        pid = _pid;
                }
            },{
                selector : '#btn-insert-blog',
                type : 'click',
                fn : () => {
                    if(!pid_format_all.test(pid))
                        messageBox('警告', '您输入的pid不符合规范', '', 'error');
                    else{
                        //如果是激活状态，说明现在位于一个预览框上，则修改pid就好了，否则插入一个新的预览框
                        active ? dom.innerHTML = pid : insertBlogPreview(pid);
                        return true;
                    }
                }
            }]
        }]
    };
    return conf;
}

export default class InsertBlogPreview extends PanelMenu {
    constructor(editor){
        const $elem = $(
            `<div class="w-e-menu" data-title="插入博客" style="color: grey; font-weight: 500;font-size: 14px;">
                <button>Blog</button>
            </div>`
        );
        super($elem, editor);
    }

    clickHandler(){
        this.createPanel();
    }

    createPanel(){
        //如果是激活状态则打开改字号的panel，否则插入latex
        const conf = createPanel(this.editor, this.isActive);
        const panel = new Panel(this, conf);
        panel.create();
    }

    isActiveFunc(){
        const selection = this.editor.selection.getSelectionContainerElem();
        if(!selection){
            return false;
        }
        if(selection.getNodeName() === 'BLOGPREVIEW'){
            return true;
        }else{
            return false;
        }
    }

    tryChangeActive(){
        this.isActiveFunc() ? this.active() : this.unActive();
    }
}