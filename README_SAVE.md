# 存储文件结构

```ts
interface SaveFile {        // 存储文件
    svlist: SavePlanNode[]; // 策略内容列表
}

interface SavePlanNode {
    title: string;          // 策略标题
    description: string;    // 策略备注
    list: number[];         // 策略实际项目排序(u8)
    result: PlanRes;        // 策略结论
    meta: MetaPlan;         // 制定策略时的输入
}

interface MetaPlan {
    reference: MetaReference;       // 参考价值
    restriction: MetaRestriction;   // 限制条件
}

interface Rest {
    value: number;
    status: boolean;
    strict: boolean;
}

interface MetaRestriction {
    doubloon: Rest;
    cube: Rest;
    ssr_blp: Rest;
    ur_blp: Rest;
    ur_equip: Rest;
    cogn_chip: Rest;
    time: Rest;
    limit: number;
    finished_former_ship: number;
    finished_ssr_ship: number;
    finished_ur_ship: number;
    mode: boolean;
    // Here mode `true` for `PerformanceMode::PureIncome`, `false` for `PerformanceMode::CostPerformance`.
}

interface MetaReference {
    doubloon: number;
    cube: number;
    ssr_blp: number;
    ur_blp: number;
    ur_equip: number;
    cogn_chip: number;
}

enum ItemType {
    TIME,                   // 时间 单位：天
    DOUBLOON,               // 物资
    CUBE,                   // 魔方
    SSR_BLP,                // 金图
    UR_BLP,                 // 彩图
    UR_EQUIP,               // 彩装
    COGN_CHIP,              // 心智
}

interface PlanRes {         // 每日产出
    time: number;
    doubloon: number;
    cube: number;
    ssr_blp: number;
    direct_ssr_blp: number;
    ur_blp: number;
    direct_ur_blp: number;
    ur_equip: number
    cogn_chip: number
}

```
