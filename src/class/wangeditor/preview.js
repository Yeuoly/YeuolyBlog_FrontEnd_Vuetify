import E from 'wangeditor';

const { $, BtnMenu } = E;

export default class PreviewMenu extends BtnMenu {
    constructor(editor){
        const $elem = $(
            `<div class="w-e-menu" data-title="预览", style="color: grey; font-weight: 500;font-size: 14px;">
                <button>View</button>
            </div>`
        );
        super($elem, editor);
        this.preview = false;
        //加一个点击回调
        editor.config.onPreviewCallBack = cb => {
            this.previewCallback = cb;
        };
    }

    clickHandler(){
        this.preview = !this.preview;
        this.preview ? this.active() : this.unActive();
        typeof this.previewCallback === 'function' && this.previewCallback(this.preview);
    }

    tryChangeActive(){}
}