import { matchPath, generatePath } from 'react-router';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

// 拼接restful接口参数
export default function (api: string, params: object): [string, object] {
    const { params: matchParams } = matchPath(api, api)!;
    const matchKeys = Object.keys(matchParams);
    const apiParams = pick(params, matchKeys);
    const requestParams = omit(params, matchKeys);
    let targetApi = api;
    try {
        targetApi = generatePath(api, apiParams);
    } catch {
        // todo
    }
    return [targetApi, requestParams];
}