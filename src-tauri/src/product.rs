use serde::{Deserialize, Serialize};

use crate::{node::{meta, product, rate::RateNode}};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProductMeta {
    pub nodes: [ProductNode; 29],
}

impl ProductMeta {
    pub fn from(data: meta::MetaData) -> Result<Self, String> {
        let rate_list = data.rate.nodes;
        let prod_list = data.product.nodes;
        let mut res_list = [ProductNode::empty(); 29];
        for i in rate_list {
            let r = res_list.get_mut(i.id as usize);
            match r {
                None => return Err(format!("Invalid rate id {}", i.id)),
                Some(v) => {
                    v.update_rate(&i);
                    v.update_id(i.id);
                }
            }
        }
        for i in prod_list {
            let r = res_list.get_mut(i.id as usize);
            match r {
                None => return Err(format!("Invalid rate id {}", i.id)),
                Some(v) => {
                    v.update_prod(&i);
                }
            }
        }
        Ok(ProductMeta { nodes: res_list })
    }
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct ProductNode {
    pub id: u8,
    pub is_direct: bool,
    pub time: f64,
    pub doubloon: f64,
    pub cube: f64,
    pub super_rare_blp: f64,
    pub ultra_rare_blp: f64,
    pub ultra_rare_equip: f64,
    pub cognitive_chips: f64,
    // Here `select_rate` refers to `actual_select` of `rate::RateNode`.
    pub select_rate: f64,
}

impl ProductNode {
    pub fn empty() -> ProductNode {
        Self::new(0, false)
    }

    pub fn new(id: u8, is_direct: bool) -> ProductNode {
        ProductNode {
            id,
            is_direct,
            time: 0.0,
            doubloon: 0.0,
            cube: 0.0,
            super_rare_blp: 0.0,
            ultra_rare_blp: 0.0,
            ultra_rare_equip: 0.0,
            cognitive_chips: 0.0,
            select_rate: 0.0,
        }
    }

    pub fn update_rate(&mut self, rate: &RateNode) {
        self.select_rate = rate.actual_rate;
    }

    pub fn update_prod(&mut self, prod: &product::ProductNode) {
        self.is_direct = prod.is_direct;
        self.time = prod.time;
        self.cube = prod.cube;
        self.doubloon = prod.doubloon;
        self.super_rare_blp = prod.super_rare_blp;
        self.ultra_rare_blp = prod.ultra_rare_blp;
        self.ultra_rare_equip = prod.ultra_rare_equip;
        self.cognitive_chips = prod.cognitive_chips;
    }

    pub fn update_id(&mut self, id: u8) {
        self.id = id;
    }
}
