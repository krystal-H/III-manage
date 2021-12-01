
import { axiosNobaseurl } from '../util/api.request';
import { fileHost } from '../util/utils';



export function UpFileToCloud (file,backfunc) {
    let parameterobj = {
        appId:31438,
        domainType:4,
        file
    }
    axiosNobaseurl.Post( fileHost, parameterobj, {needFormData:true} ).then(({data={}}) => {
        if(data.code==0){
           let src = data.data.url;
           backfunc(src);
        }else{
            backfunc(null);
        }
    });
};
