// 获取后缀名
export default function getSuffixName(str: string): string {
    return str.substring(str.lastIndexOf('.') + 1);
}
