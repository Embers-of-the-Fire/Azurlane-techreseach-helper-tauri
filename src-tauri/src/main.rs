#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::rc::Rc;

use node::meta;
use save::SaveFile;
use solutions::pso::pso_plan;

mod dataset;
mod enum_val;
mod macros;
mod node;
mod solutions;
mod value;
mod save;
mod product;

#[tauri::command]
fn into_string(s: SaveFile) -> Result<String, String> {
    let res = s.to_string();
    match res {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{:?}", e)),
    }
}

#[tauri::command]
fn from_str(s: &str) -> Result<SaveFile, String> {
    let res = SaveFile::from_str(s);
    match res {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{:?}", e)),
    }
}

#[tauri::command]
fn produce(lst: [u8; 29], rate_factor: f64, source_rate_factor_ssr: f64, source_rate_factor_ur: f64, select_limit: u8, mode: bool) -> Result<product::ProductMeta, String> {
    let mode_ = match mode {
        true => meta::PerformanceMode::PureIncome,
        false => meta::PerformanceMode::CostPerformance,
    };
    let data = dataset::ResearchDataCollection::load();
    let data_ptr = Rc::new(data);
    let mut meta = meta::MetaData::new(lst, Rc::clone(&data_ptr), rate_factor, source_rate_factor_ssr, source_rate_factor_ur, &select_limit, mode_);
    meta.generate();
    product::ProductMeta::from(meta)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![pso_plan, produce, into_string, from_str])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
