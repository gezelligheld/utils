// 浏览器是否支持webp格式的图片
export default function checkWebp() {
    try {
        return (
            document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') ===
            0
        );
    } catch {
        return false;
    }
}
