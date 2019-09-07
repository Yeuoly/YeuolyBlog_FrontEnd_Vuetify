import axios from 'axios';

export default {
    csrf_post(url,params,then,_catch){
        axios.post('/v2/safe/csrf').then( response => {
            let _data = response.data;
            if(_data['data']['res'] === 666){
                let from_data = new FormData();
                params.forEach( ( item , key ) => {
                    from_data.append( key,item )
                });
                from_data.append('jct',_data['data']['data']['jct']);
                axios.post(url,from_data).then( response => {
                    then ? then(response) : undefined;
                }).catch( error => {
                    _catch ? _catch(error) : undefined;
                });
            }
        }).catch( () => {
            alert('服务器大姨妈了');
        });
    }
}