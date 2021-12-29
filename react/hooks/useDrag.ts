/* eslint-disable indent */
import _ from 'lodash';
import { useEffect, useCallback, useState } from 'react';

import getSuffixByName from 'string/getSuffixName';

interface DragProps {
    fileNum: number;
    accept: string;
    classNamePattern: RegExp;
    onChange: (param: { file: File; fileList: File[] }) => void;
}

export default (props: DragProps) => {
    const {
        // 文件数量
        fileNum,
        // 文件格式
        accept,
        // 目标区域类名正则
        classNamePattern,
        // 拖拽释放的回调
        onChange,
    } = props;

    const [fileList, setFileList] = useState();
    const [dragging, setDragging] = useState(false);

    const handleDrop = useCallback(
        (e: any) => {
            const { files } = e.dataTransfer;
            const fileList = _.values(_.omit(files, ['length', 'item']));
            if (fileList.length > fileNum) {
                return;
            }
            if (accept) {
                const types = _.map(accept.split(','), (type: string) =>
                    _.replace(type, /^\./, ''),
                );
                let flag = true;
                _.each(fileList, (file: File) => {
                    if (types.indexOf(getSuffixByName(file.name)) < 0) {
                        flag = false;
                    }
                });
                if (!flag) {
                    return;
                }
            }
            onChange && onChange({ file: _.get(files, '0'), fileList });
            setFileList(files);
        },
        [fileNum, accept, onChange],
    );

    const handleFileDrag = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (classNamePattern.test(_.get(e, 'target.className'))) {
                switch (e.type) {
                    case 'dragenter':
                        setDragging(true);
                        break;
                    case 'dragover':
                        e.dataTransfer.dropEffect = 'copy';
                        break;
                    case 'drop':
                        setDragging(false);
                        handleDrop(e);
                        break;
                    case 'dragleave':
                        setDragging(false);
                        break;
                    default:
                        break;
                }
            }
        },
        [classNamePattern, handleDrop],
    );

    useEffect(() => {
        document.addEventListener('dragenter', handleFileDrag);
        document.addEventListener('dragover', handleFileDrag);
        document.addEventListener('drop', handleFileDrag);
        document.addEventListener('dragleave', handleFileDrag);

        return () => {
            document.removeEventListener('dragover', handleFileDrag);
            document.removeEventListener('drop', handleFileDrag);
            document.removeEventListener('dragleave', handleFileDrag);
            document.removeEventListener('dragenter', handleFileDrag);
        };
    }, []);

    return {
        fileList,
        dragging,
    };
};
