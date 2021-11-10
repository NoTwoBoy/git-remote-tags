export function promisify(original: Function){
    function fn(this: any, ...args: any[]){
        return new Promise((resolve, reject) => {
            args.push((err: Error, ...values: any[]) => {
                if(err){
                    return reject(err);
                }
                resolve(values);
            });
            Reflect.apply(original, this, args);
        });
    }
    return fn;
}