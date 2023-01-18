#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use solutions::pso::pso_plan;

mod dataset;
mod enum_val;
mod macros;
mod node;
mod solutions;
mod value;


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![pso_plan])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
