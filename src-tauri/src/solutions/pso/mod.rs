//! Solution using `PSO` method. See [PSO documentation](https://blog.csdn.net/qq_44186838/article/details/109212631)

use std::{sync::mpsc, rc::Rc, thread};

use serde::{Serialize, Deserialize};

use crate::{enum_val::{Strict, ReferVal}, dataset::{PROJECT_NAME, ResearchDataCollection}, value::{resource_value::ResourceValue, restriction::ResourceRestriction}, node::meta::PerformanceMode};

use self::pso::{PsoHandler, DataNode};

pub mod pso_coef;
pub mod error;
pub mod pso;



#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct InputReference {
    doubloon: f64,
    cube: f64,
    cogn_chip: f64,
    ssr_blp: f64,
    ur_blp: f64,
    ur_equip: f64,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
pub struct IptStrict {
    value: f64,
    strict: bool,
    status: bool,
}

impl IptStrict {
    pub fn into_strict(&self) -> Strict<f64> {
        if self.status == false {
            return Strict::None;
        } else {
            match self.strict {
                true => Strict::Strict(self.value),
                false => Strict::Loose(self.value),
            }
        }
    }
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
pub struct InputRestriction {
    doubloon: IptStrict,
    cube: IptStrict,
    cogn_chip: IptStrict,
    ssr_blp: IptStrict,
    ur_blp: IptStrict,
    ur_equip: IptStrict,
    time: IptStrict,
    finished_former_ship: usize,
    finished_ssr_ship: usize,
    finished_ur_ship: usize,
    limit: usize,
    mode: bool,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
pub struct InputMeta {
    generation: usize,
    inertia_s: f64,
    inertia_e: f64,
    learn1: f64,
    learn2: f64,
    node_amo: usize,
    vmax: f64,
    thread_amo: usize,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
pub struct ResValue {
    time: f64,
    doubloon: f64,
    cube: f64,
    ssr_blp: f64,
    direct_ssr_blp: f64,
    ur_blp: f64,
    direct_ur_blp: f64,
    cogn_chip: f64,
    ur_equip: f64,
}

impl ResValue {
    pub fn new(
        time: f64,
        doubloon: f64,
        cube: f64,
        ssr_blp: f64,
        direct_ssr_blp: f64,
        ur_blp: f64,
        direct_ur_blp: f64,
        cogn_chip: f64,
        ur_equip: f64,
    ) -> ResValue {
        ResValue {
            time,
            doubloon,
            cube,
            ssr_blp,
            direct_ssr_blp,
            ur_blp,
            direct_ur_blp,
            cogn_chip,
            ur_equip
        }
    }

    pub fn empty() -> ResValue {
        ResValue {
            time: 0.0,
            doubloon: 0.0,
            cube: 0.0,
            ssr_blp: 0.0,
            direct_ssr_blp: 0.0,
            ur_blp: 0.0,
            direct_ur_blp: 0.0,
            cogn_chip: 0.0,
            ur_equip: 0.0
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OptResDataNode {
    select: bool,
    index: usize,
    name: String,
}

impl OptResDataNode {
    pub fn new(select: bool, index: usize, name: String) -> OptResDataNode {
        OptResDataNode {
            select,
            index,
            name,
        }
    }

    pub fn empty() -> OptResDataNode {
        OptResDataNode {
            select: false,
            index: 0,
            name: String::new(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OptResult {
    dataset: [OptResDataNode; 29],
    average: ResValue,
    daily: ResValue,
    annual: ResValue,
}

impl OptResult {
    pub fn from(data: &DataNode, limit: u8) -> OptResult {
        let dsl = data.position;
        let dresn = [
            OptResDataNode::new(
                dsl[0] < limit,
                1,
                String::from(PROJECT_NAME[dsl[0] as usize]),
            ),
            OptResDataNode::new(
                dsl[1] < limit,
                2,
                String::from(PROJECT_NAME[dsl[1] as usize]),
            ),
            OptResDataNode::new(
                dsl[2] < limit,
                3,
                String::from(PROJECT_NAME[dsl[2] as usize]),
            ),
            OptResDataNode::new(
                dsl[3] < limit,
                4,
                String::from(PROJECT_NAME[dsl[3] as usize]),
            ),
            OptResDataNode::new(
                dsl[4] < limit,
                5,
                String::from(PROJECT_NAME[dsl[4] as usize]),
            ),
            OptResDataNode::new(
                dsl[5] < limit,
                6,
                String::from(PROJECT_NAME[dsl[5] as usize]),
            ),
            OptResDataNode::new(
                dsl[6] < limit,
                7,
                String::from(PROJECT_NAME[dsl[6] as usize]),
            ),
            OptResDataNode::new(
                dsl[7] < limit,
                8,
                String::from(PROJECT_NAME[dsl[7] as usize]),
            ),
            OptResDataNode::new(
                dsl[8] < limit,
                9,
                String::from(PROJECT_NAME[dsl[8] as usize]),
            ),
            OptResDataNode::new(
                dsl[9] < limit,
                10,
                String::from(PROJECT_NAME[dsl[9] as usize]),
            ),
            OptResDataNode::new(
                dsl[10] < limit,
                11,
                String::from(PROJECT_NAME[dsl[10] as usize]),
            ),
            OptResDataNode::new(
                dsl[11] < limit,
                12,
                String::from(PROJECT_NAME[dsl[11] as usize]),
            ),
            OptResDataNode::new(
                dsl[12] < limit,
                13,
                String::from(PROJECT_NAME[dsl[12] as usize]),
            ),
            OptResDataNode::new(
                dsl[13] < limit,
                14,
                String::from(PROJECT_NAME[dsl[13] as usize]),
            ),
            OptResDataNode::new(
                dsl[14] < limit,
                15,
                String::from(PROJECT_NAME[dsl[14] as usize]),
            ),
            OptResDataNode::new(
                dsl[15] < limit,
                16,
                String::from(PROJECT_NAME[dsl[15] as usize]),
            ),
            OptResDataNode::new(
                dsl[16] < limit,
                17,
                String::from(PROJECT_NAME[dsl[16] as usize]),
            ),
            OptResDataNode::new(
                dsl[17] < limit,
                18,
                String::from(PROJECT_NAME[dsl[17] as usize]),
            ),
            OptResDataNode::new(
                dsl[18] < limit,
                19,
                String::from(PROJECT_NAME[dsl[18] as usize]),
            ),
            OptResDataNode::new(
                dsl[19] < limit,
                20,
                String::from(PROJECT_NAME[dsl[19] as usize]),
            ),
            OptResDataNode::new(
                dsl[20] < limit,
                21,
                String::from(PROJECT_NAME[dsl[20] as usize]),
            ),
            OptResDataNode::new(
                dsl[21] < limit,
                22,
                String::from(PROJECT_NAME[dsl[21] as usize]),
            ),
            OptResDataNode::new(
                dsl[22] < limit,
                23,
                String::from(PROJECT_NAME[dsl[22] as usize]),
            ),
            OptResDataNode::new(
                dsl[23] < limit,
                24,
                String::from(PROJECT_NAME[dsl[23] as usize]),
            ),
            OptResDataNode::new(
                dsl[24] < limit,
                25,
                String::from(PROJECT_NAME[dsl[24] as usize]),
            ),
            OptResDataNode::new(
                dsl[25] < limit,
                26,
                String::from(PROJECT_NAME[dsl[25] as usize]),
            ),
            OptResDataNode::new(
                dsl[26] < limit,
                27,
                String::from(PROJECT_NAME[dsl[26] as usize]),
            ),
            OptResDataNode::new(
                dsl[27] < limit,
                28,
                String::from(PROJECT_NAME[dsl[27] as usize]),
            ),
            OptResDataNode::new(
                dsl[28] < limit,
                29,
                String::from(PROJECT_NAME[dsl[28] as usize]),
            ),
        ];
        let ave = data.data.product.average;
        let dly = data.data.product.per_day;
        let aver = ResValue::new(
            ave.average_time,
            ave.doubloon,
            ave.cube,
            ave.super_rare_blp + ave.indirect_ssr_blp,
            ave.super_rare_blp,
            ave.ultra_rare_blp + ave.indirect_ur_blp,
            ave.ultra_rare_blp,
            ave.cognitive_chips,
            ave.ultra_rare_equip,
        );
        let dlyr = ResValue::new(
            dly.research_time,
            dly.doubloon,
            dly.cube,
            dly.super_rare_blp + dly.indirect_ssr_blp,
            dly.super_rare_blp,
            dly.ultra_rare_blp + dly.indirect_ur_blp,
            dly.ultra_rare_blp,
            dly.cognitive_chips,
            dly.ultra_rare_equip,
        );
        let annr = ResValue::new(
            dlyr.time * 365.0,
            dlyr.doubloon * 365.0,
            dlyr.cube * 365.0,
            dlyr.ssr_blp * 365.0,
            dlyr.direct_ssr_blp * 365.0,
            dlyr.ur_blp * 365.0,
            dlyr.direct_ur_blp * 365.0,
            dlyr.cogn_chip * 365.0,
            dlyr.ur_equip * 365.0,
        );
        OptResult {
            dataset: dresn,
            daily: dlyr,
            average: aver,
            annual: annr,
        }
    }
    pub fn empty() -> OptResult {
        OptResult {
            dataset: [
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
                OptResDataNode::empty(),
            ],
            average: ResValue::empty(),
            daily: ResValue::empty(),
            annual: ResValue::empty(),
        }
    }
}

fn pso_handle(
    irefer: InputReference,
    irest: InputRestriction,
    imeta: InputMeta,
    channel: mpsc::Sender<(f64, OptResult)>,
) {
    let research_data: ResearchDataCollection = ResearchDataCollection::load();
    let data_ptr = Rc::new(research_data);
    let resv = ResourceValue::new(
        irefer.doubloon,
        irefer.cube,
        irefer.ssr_blp,
        ReferVal::Value(irefer.ur_blp),
        ReferVal::Value(irefer.ur_equip),
        irefer.cogn_chip,
        irest.finished_ur_ship as u8,
        irest.finished_ssr_ship as u8,
        irest.finished_former_ship as u8,
    );
    let rest = ResourceRestriction::new(
        irest.doubloon.into_strict(),
        irest.cube.into_strict(),
        irest.ssr_blp.into_strict(),
        irest.ur_blp.into_strict(),
        irest.ur_equip.into_strict(),
        irest.cogn_chip.into_strict(),
        irest.time.into_strict(),
        irest.limit as u8,
    );
    let mode = match irest.mode {
        true => PerformanceMode::PureIncome,
        false => PerformanceMode::CostPerformance,
    };
    let mut pso = PsoHandler::new(
        imeta.node_amo,
        imeta.generation,
        resv,
        rest,
        imeta.learn1,
        imeta.learn2,
        imeta.inertia_s,
        imeta.inertia_e,
        Rc::clone(&data_ptr),
        imeta.vmax,
        mode,
    );
    pso.generate();
    channel
        .send((
            pso.global_best.best_performance(),
            OptResult::from(&pso.global_best.data, irest.limit as u8),
        ))
        .unwrap();
}

#[tauri::command]
pub fn pso_plan(
    irefer: InputReference,
    irest: InputRestriction,
    imeta: InputMeta,
) -> Result<OptResult, String> {
    let (tx, rx) = mpsc::channel();
    let mut v = Vec::new();
    for _ in 0..imeta.thread_amo {
        let ntx = tx.clone();
        let t = thread::spawn(move || {
            pso_handle(irefer, irest, imeta, ntx);
        });
        v.push(t);
    }
    drop(tx);
    for i in v {
        i.join().unwrap();
    }
    let mut vres = (0.0, OptResult::empty());
    for vri in rx {
        if vri.0 > vres.0 {
            vres = vri
        }
    }
    Ok(vres.1)
}
