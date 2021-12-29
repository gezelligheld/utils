// 是否是移动端
export function isMobile() {
    return (
        /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) &&
        typeof window.ontouchstart !== 'undefined'
    );
}

// 是否是微信浏览器
export function isWx() {
    return /MicroMessenger/.test(navigator.userAgent);
}
