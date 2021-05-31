export function loadImage(
    img: HTMLImageElement,
    src: string,
): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', src);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        const blob = xhr.response;
        const fr = new FileReader();
        fr.onloadend = function () {
            const dataUrl = fr.result;
            img.src = dataUrl as string;
        };
        fr.readAsDataURL(blob);
    };
    xhr.send();
}

export function drawCanvasImg(
    ctx: CanvasRenderingContext2D,
    src: string,
    position: [x: number, y: number, w: number, h: number],
): Promise<Event> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        // 受限于cors策略,图像从外部来源加载后再对画布进行操作无法使用toDataURL等方法
        // 设置crossOrigin属性为Anonymous允许图片跨域使用
        // 但在企业微信和部分浏览器中无效，换种方式，转成base64加载
        if (/^https?/.test(src)) {
            loadImage(img, src);
        }
        else {
            img.src = src;
        }
        img.onload = e => {
            ctx.drawImage(
                img,
                ...position,
            );
            resolve(e);
        };
        img.onerror = reject;
    });
}