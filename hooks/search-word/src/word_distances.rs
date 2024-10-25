use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
pub struct WordDistances {
    pub words: Vec<String>,
    pub distances: Vec<usize>,
}

impl WordDistances {
    pub fn from(words: Vec<String>, distances: Vec<usize>) -> Self {
        Self { words, distances }
    }
}
