// 获取地址栏query参数
export default function getQueryParam(key: string, url?: string): string {
    return new URLSearchParams(new URL(url || window.location.href).search).get(key);
}