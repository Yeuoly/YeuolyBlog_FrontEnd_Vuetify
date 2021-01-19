import E from 'wangeditor';
const { $, PanelMenu, Panel } = E;

//将latex的html转化为服务器储存的形式，现在看起来好像没意义，其实最开始这里还是挺长一段代码的=，=
export const parseIntoSimple = dom => dom;

//定义Panel，这里有俩Panel，一个控制字号一个插入latex
const createPanel = (editor, active) => {
    const insertLatex = latex => {
        editor.cmd.do('insertHTML', `<latexpression>${latex}</latexpression><p><br></p>`);
        editor.cmd.do('latex');
    }
    
    const selection = editor.selection.getSelectionContainerElem();
    const dom = selection.selector;
    const conf = active ? {
        width : 100,
        height : 0,
        tabs : [{
            title : '选择字号',
            tpl : `<div>
                        <input  
                            type="text" 
                            class="block"
                            placeholder="size"
                            id="input-insert-latex-size"
                            value="${parseInt(dom.getAttribute('size') || 16)}"
                        />
                        </td>   
                    </div>`,
            events : [{
                selector : '#input-insert-latex-size',
                type : 'input',
                fn : v => {
                    const size = parseInt(v.target.value);
                    if(!isNaN(size)){
                        dom.setAttribute('size', size);
                    }
                }
            }]
        }]
    } : {
        width : 300,
        height : 0,
        tabs : [{ 
            title : '插入latex',
            tpl : `<div>
                        <input  
                            type="text" 
                            class="block" 
                            placeholder="latex"
                            id="input-insert-latex"
                        />
                        </td>
                        <div class="w-e-button-container">
                            <button type="button" id="btn-insert-latex" class="right">
                                插入
                            </button>
                        </div>
                    </div>`,
            events : [
                {
                    selector : '#btn-insert-latex',
                    type : 'click',
                    fn : () => {
                        //获取输入
                        const latex = $('#input-insert-latex').val().trim();
                        if(!latex)return;
                        insertLatex(latex);
                        return true;
                    }
                }
            ]
        }]
    }
    return conf;
} 

export default class InsertLatex extends PanelMenu {
    constructor(editor){
        const $elem = $(
            `<div class="w-e-menu" data-title="latex" style="color: grey; font-weight: 500;font-size: 14px;">
                <button>
                    Latex
                </button>
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
        if(selection.getNodeName() === 'LATEXPRESSION'){
            return true;
        }else{
            return false;
        }
    }

    tryChangeActive(){
        this.isActiveFunc() ? this.active() : this.unActive();
    }
}