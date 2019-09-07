export default {
    date(format, timestamp){
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let res = '';
        for(let i in format){
            if(format[i] === 'Y'){
                res += date.getFullYear();
            }else if(format[i]  === 'M'){
                res += (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
            }else if(format[i]  === 'D'){
                res += date.getDate();
            }else if(format[i]  === 'h'){
                res += date.getHours();
            }else if(format[i]  === 'm'){
                res += date.getMinutes();
            }else if(format[i]  === 's'){
                res += date.getSeconds();
            }else{
                res += format[i] ;
            }
        }
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
}