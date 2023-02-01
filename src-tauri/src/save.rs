use std::{fs, io::{self, Write, Read}};

use serde::{Serialize, Deserialize};

#[derive(Debug)]
pub struct Error {
    pub data: ErrorType
}

#[derive(Debug)]
pub enum ErrorType {
    Io(io::Error),
    Serde(serde_json::Error)
}

impl Error {
    pub fn new(err: ErrorType) -> Error {
        Error { data: err }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SaveFile {
    pub svlist: Vec<SavePlanNode>,
}

impl SaveFile {
    pub fn from_str(s: &str) -> Result<SaveFile, serde_json::Error> {
        serde_json::from_str(s)
    }

    pub fn to_string(&self) -> Result<String, serde_json::Error> {
        serde_json::to_string(&self)
    }

    pub fn save_to_file(&self, fp: &str) -> Result<(), Error> {
        let mut file = match fs::File::create(fp) {
            Ok(v) => v,
            Err(e) => return Err(Error::new(ErrorType::Io(e)))
        };
        let s = match self.to_string() {
            Ok(v) => v,
            Err(e) => return Err(Error::new(ErrorType::Serde(e)))
        };
        match file.write_all(s.as_bytes()) {
            Ok(_) => return Ok(()),
            Err(e) => return Err(Error::new(ErrorType::Io(e)))
        };
    }

    pub fn load_from_file(fp: &str) -> Result<SaveFile, Error> {
        let mut file = match fs::File::open(fp) {
            Ok(v) => v,
            Err(e) => return Err(Error::new(ErrorType::Io(e)))
        };
        let mut s = String::new();
        match file.read_to_string(&mut s) {
            Ok(_) => (),
            Err(e) => return Err(Error::new(ErrorType::Io(e)))
        };
        match Self::from_str(s.as_str()) {
            Ok(v) => Ok(v),
            Err(e) => Err(Error::new(ErrorType::Serde(e)))
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SavePlanNode {
    pub title: String,
    pub description: String,
    pub dataset: Vec<DatasetNode>,
    pub daily: PlanRes,
    pub meta: IptMeta,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct Reference {
    pub doubloon: f64,
    pub cube: f64,
    pub ssr_blp: f64,
    pub ur_blp: f64,
    pub ur_equip: f64,
    pub cogn_chip: f64,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct Rest {
    pub value: f64,
    pub status: bool,
    pub strict: bool,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct Restriction {
    pub doubloon: Rest,
    pub cube: Rest,
    pub ssr_blp: Rest,
    pub ur_blp: Rest,
    pub ur_equip: Rest,
    pub cogn_chip: Rest,
    pub time: Rest,
    pub limit: u8,
    pub finished_former_ship: u8,
    pub finished_ssr_ship: u8,
    pub finished_ur_ship: u8,
    pub mode: bool,
    // Here mode `true` for `PerformanceMode::PureIncome`, `false` for `PerformanceMode::CostPerformance`.
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct IptMeta {
    pub reference: Reference,
    pub restriction: Restriction
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DatasetNode {
    pub select: bool,
    pub index: usize,
    pub name: String,
    pub id: usize,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct PlanRes {
    pub time: f64,
    pub doubloon: f64,
    pub cube: f64,
    pub ssr_blp: f64,
    pub direct_ssr_blp: f64,
    pub ur_blp: f64,
    pub direct_ur_blp: f64,
    pub ur_equip: f64,
    pub cogn_chip: f64,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum ItemType {
    Time,
    Doubloon,
    Cube,
    SsrBlp,
    UrBlp,
    UrEquip,
    CognChip,
}
