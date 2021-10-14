import axios from '../util/api.request'

export const getList = (data) => {
    return axios.request({
        url: `/banner/getBannerList`,
        method: 'post',
        data
    })
}
