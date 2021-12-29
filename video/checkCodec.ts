import MP4Box from 'mp4box';

// 判断mp4的codec是否被浏览器所支持
export default function checkCodec(url: string, method = 'get') {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'arraybuffer';
    xhr.send();

    const mp4boxfile = MP4Box.createFile();

    return new Promise((resolve, reject) => {
        xhr.onload = (e: ProgressEvent<EventTarget>) => {
            if ((e?.target as XMLHttpRequest).readyState === 4) {
                const buffer = (e?.target as XMLHttpRequest).response;
                buffer.fileStart = 0;
                mp4boxfile.appendBuffer(buffer);
            }
        };

        mp4boxfile.onReady = function (info: any) {
            const { mime } = info;
            const codec = mime.match(/codecs="(\S*),/)?.[1];
            if (!codec || codec.indexOf('avc') === -1) {
                reject(new Error('codec不支持，请转码'));
            } else {
                resolve(info);
            }
        };
    });
}
