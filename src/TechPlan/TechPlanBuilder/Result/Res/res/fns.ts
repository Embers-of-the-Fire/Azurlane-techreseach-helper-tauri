const toPercent = (value: number, fix: number): string =>  {
    if (!value) {
        value = 0.0
    }
    let percent = Number(value * 100).toFixed(fix);
    percent += '%';
    return percent;
}

interface ResProps {
    style?: React.CSSProperties;
    time: number;
    doubloon: number;
    cube: number;
    cogn_chip: number;
    ssr_blp: number;
    direct_ssr_blp: number;
    ur_blp: number;
    direct_ur_blp: number;
    ur_equip: number;
}

export { toPercent, ResProps };