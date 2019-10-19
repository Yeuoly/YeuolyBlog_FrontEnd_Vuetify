import PopDialog from '../components/common/PopDialog'

export default {
    components : { PopDialog },
    data(){
        return{
            dialog_title : '',
            dialog_text : '',
            dialog_type : 'info',
            dialog_subtext : '',
            dialog_hook : function(){},
            dialog_hook_cache : function(){},
            dialog_show : false,
        }
    },
    methods : {
        openDialog(title,text,subtext,type,hook) {
            this.dialog_title = title;
            this.dialog_text = text;
            this.dialog_type = type || 'info';
            this.dialog_subtext = subtext || '';
            this.dialog_hook_cache = hook || function(){};
            this.dialog_hook = () => {
                this.dialog_hook_cache();
                this.dialog_hook_cache = function(){};
            };
            this.dialog_show = true;
        },
        closeDialog(){
            this.dialog_show = false;
            this.dialog_text = '';
            this.dialog_title = '';
            this.dialog_subtext = '';
            this.dialog_hook = function(){}
        },
    }
}