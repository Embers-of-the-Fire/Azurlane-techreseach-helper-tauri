// import { ResProps } from "./Result/Res/res/fns";

interface MetaData {
    generation: number;
    learn1: number;
    learn2: number;
    inertia_s: number;
    inertia_e: number;
    node_amo: number;
    vmax: number;
    thread_amo: number;
}

interface SaveObj {
    title: string;
    description: string;
    dataset: {
        select: boolean;
        index: number;
        name: string;
        id: number;
    }[];
    daily: {
        time: number;
        doubloon: number;
        cube: number;
        cogn_chip: number;
        ssr_blp: number;
        direct_ssr_blp: number;
        ur_blp: number;
        direct_ur_blp: number;
        ur_equip: number;
    };
    meta: IptMeta;
}

interface Rest {
    value: number;
    status: boolean;
    strict: boolean;
}

interface IptMeta {
    reference: {
        doubloon: number;
        cube: number;
        ssr_blp: number;
        ur_blp: number;
        ur_equip: number;
        cogn_chip: number;
    };
    restriction: {
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
    };
}

export { MetaData, SaveObj, Rest, IptMeta };
