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
}