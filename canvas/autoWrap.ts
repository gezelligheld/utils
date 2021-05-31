// 文字自动换行
export default function wrapText(
    ctx: CanvasRenderingContext2D,
    content: string,
    width: number,
    x: number,
    y: number,
    lineHeight?: number,
): number {
    let letter = '';
    // 记录需要折行的字符索引
    const indexs: number[] = [];
    const realLineHeight = lineHeight || 0;
  
    for (let i = 0; i < content.length; i ++) {
        const curText = letter + content[i];
        const textWidth = ctx.measureText(curText).width;
        if (textWidth >= width) {
            indexs.push(i);
            letter = '';
        }
        else {
            letter += content[i];
        }
    }
  
    if (indexs.length > 0) {
        indexs.forEach((item, index) => {
            const str = content.slice(index === 0 ? 0 : indexs[index - 1], item);
            ctx.fillText(str, x, y + index * realLineHeight);
            if (index === indexs.length - 1) {
                ctx.fillText(content.slice(item), x, y + (index + 1) *  realLineHeight);
            }
        });
    }
    else {
        ctx.fillText(content, x, y);
    }
  
    return indexs.length;
}