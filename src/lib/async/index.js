export default class AsyncLoading {
    constructor(default_value){
        this.cache = {};
        this.default_value = default_value;
    }

    /**
     * 用户需要自己定义判断数据存在函数
     * @param {*} sign 唯一标识符 
     */
    exist(sign){
        return false;
    }

    /**
     * 用户需要自己定义获取标识符下数据的函数
     * @param {*} sign 唯一标识符
     */
    data(sign){
        return 'Yeouly.Works';
    }

    /**
     * 用户需要自己定义储存数据的函数
     * @param {*} sign 
     * @param {*} data 
     */
    store(sign, data){
        //do something
    }

    /**
     * @param {String|Number} sign 唯一标识符
     */
    get(sign){
        return new Promise(resolve => {
            //开始加载前，先判断数据的存在性
            if(this.exist(sign)){
                resolve(this.data(sign));
            }else{
                //如果已经有缓存函数了，说明此时已经在加载了，则加入队列等待
                if(this.cache[sign]){
                    this.cache[sign].push(resolve);
                }else{
                    //否则创建缓存函数
                    this.cache[sign] = [resolve];
                    try{
                        this.load(sign, data => {
                            //加载完成后先入库
                            this.store(sign, data);
                            //然后执行缓存函数
                            for(const i of this.cache[sign]){
                                i(data);
                            }
                            this.cache[sign] = null;
                        }, error => {
                            //如果出错了就全部返回错误结果
                            for(const i of this.cache[sign]){
                                i(error);
                            }
                            this.cache[sign] = null;
                        });
                    }catch(e){
                        resolve(typeof this.default_value);
                    }
                }
            }
        });
    }

    /**
     * @param {String|Number} sign 该参数为唯一标识数据
     * @param {Function} resolve 该参数的作用类似于Promise中的resolve
     */
    async load(sign ,resolve, reject){
        //async loading code
        resolve('Yeuoly.Works');
    }
}