import axios from '../util/api.request'

export const saveStaticLabelApi = (formData) => {
  return axios.request({
    url: 'manage-open/labelInfo/saveStaticLabel',
    data: formData,
    needFormData: true,
    method: 'post',
    loading: true,
  })
};
