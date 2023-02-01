enum ShowType {
    TimeUse, // 科研用时与概率占比
    Resource,
}

interface Selection {
    show_type: ShowType;
    rt_status: boolean; // research time
    db_status: boolean; // doubloon
    cb_status: boolean; // cube
    sb_status: boolean; // ssr blp
    dsb_status: boolean; // direct ssr blp
    ub_status: boolean; // ur blp
    dub_status: boolean; // direct ur blp
    ue_status: boolean; // ur equip
    cc_status: boolean; // cogn chips
}

enum SelectType {
    rt_status = "rt_status",
    db_status = "db_status",
    cb_status = "cb_status",
    sb_status = "sb_status",
    dsb_status = "dsb_status",
    ub_status = "ub_status",
    dub_status = "dub_status",
    ue_status = "ue_status",
    cc_status = "cc_status",
}

const into_name = (s: SelectType): string => {
    switch (s) {
        case SelectType.rt_status:
            return "科研用时";
        case SelectType.db_status:
            return "物资消耗";
        case SelectType.cb_status:
            return "魔方消耗";
        case SelectType.sb_status:
            return "金图产出";
        case SelectType.dsb_status:
            return "定向金图占比";
        case SelectType.ub_status:
            return "彩图产出";
        case SelectType.dub_status:
            return "定向彩图占比";
        case SelectType.ue_status:
            return "彩装产出";
        case SelectType.cc_status:
            return "心智碎片产出";
        default:
            return "Unknown";
    }
};

const into_select_type = (s: string): SelectType | null => {
    switch (s) {
        case "rt_status":
            return SelectType.rt_status;
        case "db_status":
            return SelectType.db_status;
        case "cb_status":
            return SelectType.cb_status;
        case "sb_status":
            return SelectType.sb_status;
        case "dsb_status":
            return SelectType.dsb_status;
        case "ub_status":
            return SelectType.ub_status;
        case "dub_status":
            return SelectType.dub_status;
        case "ue_status":
            return SelectType.ue_status;
        case "cc_status":
            return SelectType.cc_status;
        default:
            return null;
    }
};

export { Selection, ShowType, SelectType, into_select_type, into_name };
