import { SelectType } from "../../selection";

interface ProductNode {
    id: number,
    is_direct: boolean,
    time: number,
    doubloon: number,
    cube: number,
    super_rare_blp: number,
    ultra_rare_blp: number,
    ultra_rare_equip: number,
    cognitive_chips: number,
    // Here `select_rate` refers to `actual_select` of `rate::RateNode`. See `product.rs` for details.
    select_rate: number,
}

interface ProductMeta {
    nodes: ProductNode[];
}

const get_product_value_from = (p: ProductNode, key: SelectType): number | undefined => {
    switch (key) {
        case SelectType.rt_status: return p.time;
        case SelectType.db_status: return p.doubloon;
        case SelectType.cb_status: return p.cube;
        case SelectType.sb_status: return p.super_rare_blp;
        case SelectType.dsb_status: return p.is_direct ? p.super_rare_blp : undefined;
        case SelectType.ub_status: return p.ultra_rare_blp;
        case SelectType.dub_status: return p.is_direct ? p.ultra_rare_blp : undefined;
        case SelectType.ue_status: return p.ultra_rare_equip;
        case SelectType.cc_status: return p.cognitive_chips;
        default: return undefined;
    }
}

export { ProductMeta, ProductNode, get_product_value_from };