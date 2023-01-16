function toPercent(value: number, fix: number) {
    if (!value) {
        value = 0.0
    }
    let percent = Number(value * 100).toFixed(fix);
    percent += '%';
    return percent;
}

export default toPercent;
