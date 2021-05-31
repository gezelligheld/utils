// 获取地址栏query参数
export default function getQueryParam(key: string, url?: string): string | null {
    const params = new URLSearchParams(new URL(url || window.location.href).search);
    return params ? params.get(key) : null;
}