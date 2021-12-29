export function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 生成随机num位的数字字母组合
export default function getRandomString(num: number): string {
    const letters = [];
    const numbers = [];

    for (let i = 0; i < 25; i++) {
        letters.push(String.fromCharCode(65 + i));
    }

    for (let i = 0; i < 10; i++) {
        numbers.push(i.toString());
    }

    const groups = [letters, numbers];
    let res = '';
    for (let i = 0; i < num; i++) {
        const randomGroup = getRandomElement(groups);
        res += getRandomElement(randomGroup);
    }
    return res;
}
