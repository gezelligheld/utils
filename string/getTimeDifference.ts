import dayjs, { UnitType } from 'dayjs';

const rangeMap = new Map<UnitType, string>([
    ['year', '年'],
    ['month', '个月'],
    ['day', '天'],
    ['hour', '小时'],
    ['minute', '分钟'],
    ['second', '刚刚'],
]);

// 显示多久之前
export default function getTimeDifference(previous: string) {
    const ranges: UnitType[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    let index = 0;
    const now = new Date().getTime();
    const getDifference = (uint: UnitType): string => {
        if (index === ranges.length) {
            return '';
        }
        // 缩小到秒的范围，显示'刚刚'，不计算时间差
        if (index === ranges.length - 1) {
            return rangeMap.get(ranges[index])!;
        }

        const nowTime = dayjs(now).get(uint);
        const previousTime = dayjs(previous).get(uint);

        if (nowTime <= previousTime) {
            return getDifference(ranges[++ index]);
        }
        return `${(nowTime - previousTime) + rangeMap.get(ranges[index])!}前`;
    };
    return getDifference(ranges[index]);
}