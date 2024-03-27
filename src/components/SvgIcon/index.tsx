import { FC } from "react";

// 官方文档：https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
interface SvgIconProps {
    name: string;
    prefix?: string;
    color?: string;
    size?: number;
    style?: Record<string, any>;
    stroke?: string; // 描边颜色
    strokeWidth?: number;
    strokeOpacity?: number;
    fillOpacity?: number;
}

const SvgIcon: FC<SvgIconProps> = ({
    name,
    prefix = "icon",
    color,
    size = 16,
    stroke,
    style,
    strokeWidth = 0,
    strokeOpacity = 1,
    fillOpacity = 1,
}) => {
    const symbolId = `#${prefix}-${name}`;
    const svgAttr = {
        style: { ...style, width: `${size}px`, height: `${size}px` },
        stroke,
        strokeWidth,
        strokeOpacity,
        fillOpacity,
    };
    return (
        <svg {...svgAttr} aria-hidden="true">
            <use href={symbolId} fill={color} />
        </svg>
    );
};

export default SvgIcon;
