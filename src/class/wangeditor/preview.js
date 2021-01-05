import E from 'wangeditor';

const { $, BtnMenu } = E;

export default class PreviewMenu extends BtnMenu {
    constructor(editor){
        const dom = document.createElement('div');
        dom.classList.add('w-e-menu');
        dom.setAttribute('data-title', '预览');
        dom.setAttribute('style', 'color: grey; font-weight: 500;font-size: 14px;');
        const btn = document.createElement('button');
        btn.innerHTML = 'View';
        dom.appendChild(btn);
        const $elem = $(dom);
        super($elem, editor);
        this.preview = false;
        //加一个点击回调
        editor.config.onPreviewCallBack = cb => {
            this.previewCallback = cb;
        };
        //存节点
        this.node = dom;
    }

    clickHandler(){
        this.preview = !this.preview;
        typeof this.previewCallback === 'function' && this.previewCallback(this.preview);
    }

    tryChangeActive(){
        if(this.preview)
            this.active();
        else
            this.unActive();
    }
}