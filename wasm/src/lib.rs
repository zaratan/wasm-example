use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {}

#[derive(Serialize)]
#[serde(deny_unknown_fields)]
pub struct Result {
    pub operation: String,
    pub result: i32,
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Params {
    numbers: Vec<i32>,
}

#[wasm_bindgen]
pub fn sum(params: JsValue) -> JsValue {
    let default = Params { numbers: vec![] };
    let params: Params = params.into_serde().unwrap_or(default);

    let sum = params.numbers.iter().sum();
    let operation = params
        .numbers
        .iter()
        .map(|n| n.to_string())
        .collect::<Vec<String>>()
        .join(" + ");

    let result = Result {
        result: sum,
        operation,
    };
    return JsValue::from_serde(&result).unwrap();
}
