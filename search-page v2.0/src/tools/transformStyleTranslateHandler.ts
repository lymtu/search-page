type Transform = {
  x: number;
  y: number;
  scale: number;
};

function transformStyleTranslateHandler<T extends string | Transform>(
  style: T
): T extends string ? string[] : string {
  if (typeof style === "object") {
    // 如果输入是对象，返回格式化的字符串
    return `translate(${style.x}px, ${style.y}px) scale(${style.scale})` as T extends string
      ? string[]
      : string;
  } else if (typeof style === "string") {
    // 如果输入是字符串，提取其中的数字并返回数组
    const numbers = style.match(/[-+]?\d*\.?\d+/g);
    if (!numbers || numbers.length < 3) {
      throw new Error("Invalid input string format");
    }
    return [...numbers] as T extends string ? string[] : string;
  } else {
    throw new Error("Invalid input type");
  }
}

export default transformStyleTranslateHandler;
