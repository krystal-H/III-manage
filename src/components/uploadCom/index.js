import React, { useState, forwardRef, useImperativeHandle, memo, useEffect } from 'react';
import { Upload, Modal, Button,notification } from 'antd';
import { fileHost } from "../../util/utils";
import './style.scss'
// 上传地址
const uploadConfigs = {
    action: fileHost,
    data: file => ({ appId: 31438, domainType: 4 })
}
function UploadFileHooks({ maxCount = 1, format, maxSize = 0.2, isNotImg = false, preferSize = '192px*192px', cb, value, onChange }, uploadRef) {

    //回显
    useEffect(() => {
        if (value) {
            setFileList(value)
        }
    }, [])
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    useImperativeHandle(uploadRef, () => {
        // 这个函数会返回一个对象
        // 该对象会作为父组件 current 属性的值
        return {
            /**
             * 对外函数，获取腾讯云返回的文件列表链接
             */
            getFileListUrl: () => {
                return getFileListUrl();
            },
            /**
             * 对外函数，文件数据回填
             */
            setFileList: (fileList) => {
                setFileList(fileList);
            },
            /**
             * 对外函数，获取文件列表
             */
            getFileList: () => {
                return fileList;
            }
        }
    }, [fileList, getFileListUrl]); // 如果想要useImperativeHandle更新，需要传参数
    const uploadImg = (
        <div>
            {/* <PlusOutlined style={{ fontSize: '34px', color: '#C4C6CF' }} /> */}
            <div className="ant-upload-text">上传图片</div>
        </div>
    );
    const uploadButton = (
        <Button type="primary">
           上传附件
        </Button>
    );
    const buttonType = isNotImg ? uploadButton : uploadImg;
    const buttonStyle = isNotImg ? 'text' : 'picture-card';
    let acceptFormat = '';
    if (!format) {
        acceptFormat = isNotImg ? '.doc,.docx' : '.gif,.jpeg,.jpg,.png';
    } else {
        acceptFormat = format;
    }
    let desc = '';
    if (isNotImg) {
        desc = <span className="upload-desc">支持{acceptFormat}格式，不超过{maxSize}MB。</span>
    } else {
        desc = <span className="upload-desc">推荐尺寸{preferSize}。支持{acceptFormat}格式，不超过{maxSize * 1000}kB。</span>
    }
    const isLtMaxSize = (file) => {
        return file.size / 1024 / 1024 < maxSize;
    }
    const isLtMaxCount = () => {
        return fileList.length < maxCount;
    };
    const ifFormat = (file) => {
        if (acceptFormat) {
            let arr = acceptFormat.split(',');
            let upformat = file.name.substring(file.name.lastIndexOf('.')).toLowerCase(),
                find = false;
            for (let i in arr) {
                if (arr[i].toLowerCase() == upformat) {
                    find = true;
                    break;
                }
            }
            return find
        }
        return true
    }
    const getExtraData = () => {
        return {
            appId: 31438,
            domainType: 4,
        };
    };
    const getFileListUrl = () => {
        let fileListUrl = [];
        fileList.forEach((file) => {
            let { response, url } = file;
            if (response) {
                let { code, data } = response;
                if (code === 0) {
                    fileListUrl.push(data.url);
                }
            } else {
                fileListUrl.push(url);
            }
        });
        return fileListUrl;
    };
    /**
     * handleChange会自动调3次 1.选中的文件改变 2.上传中 3.上传完成（成功/失败）
     * @param file
     * @param fileList
     */
    const handleChange = ({ file, fileList }) => {
        fileList = fileList.map(file => {
            if (file.response) {
                let { code, data } = file.response;
                if (code === 0) {
                    // Component will show file.url as link
                    file.url = data.url;
                }
            }
            return file;
        });
        // console.log(fileList,'===')
        if (isLtMaxSize(file) && fileList.length <= maxCount && ifFormat(file)) {
            setFileList(fileList);
            if (file.status === 'done') {
                onChange(fileList)
                // alert(1)
                cb && typeof cb === 'function' && cb();
            }
        }
    };
    const handleCancel = () => setPreviewVisible(false);
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true);
        setPreviewImage(file.url || file.preview);
    };
    const onPreview = isNotImg ? null : handlePreview;
    const beforeUpload = (file) => {
        const isLt = isLtMaxSize(file);
        if (!ifFormat(file)) {
            notification.info({
                message: '提示',
                description: '不支持上传此格式文件',
            });
            return false;
        }
        if (!isLt) {
            notification.info({
                message: '提示',
                description: isNotImg ? `文件必须小于 ${maxSize} MB!` : `文件必须小于 ${maxSize * 1000} kB!`,
            });
            return false;
        }
        if (!isLtMaxCount()) {
            notification.info({
                message: '提示',
                description: `文件个数最多 ${maxCount} 个!`,
            });
            return false;
        }
        return true;
    };
    const onRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
        onChange(newFileList)
    }
    return (
        <div className="upload-wrapper">
            <div className="upload clearfix">
                <Upload
                    className="upload-component"
                    {...uploadConfigs}
                    listType={buttonStyle}
                    fileList={fileList}
                    data={getExtraData}
                    onPreview={onPreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    accept={acceptFormat}
                    onRemove={onRemove}
                    showUploadList={{ showDownloadIcon: false }}
                >
                    {(maxCount === fileList.length && !isNotImg) ? null : buttonType}
                </Upload>
                {isNotImg && <span className="file-upload-desc">最多{maxCount}个</span>}
                {desc}
                {previewVisible && <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>}
            </div>
        </div>
    )
}

export default UploadFileHooks = memo(forwardRef(UploadFileHooks))
// export { UploadFileHooks }