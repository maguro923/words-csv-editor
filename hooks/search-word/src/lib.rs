extern crate console_error_panic_hook;

use wasm_bindgen::prelude::wasm_bindgen;
use word_distance::levenshtein::levenshtein;
use word_distances::WordDistances;

pub mod word_distances;

/*
CSV should follow RFC4180 Format
https://www.rfc-editor.org/rfc/rfc4180.txt

header: entry,meaning,ipa,word_id,example_sentence,translated_sentence,type
value: [String, String, String, i32, String, String]
 */

fn set_error_hook() {
    #[cfg(feature = "error_handle")]
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
pub fn get_word_distances(
    word: &str,
    target_csv: &str,
    csv_column_position: usize,
) -> WordDistances {
    set_error_hook();

    let mut csv = csv::Reader::from_reader(target_csv.as_bytes());

    let (distances, words) = csv
        .records()
        .map(|v| {
            let v = v.unwrap();
            (
                levenshtein(word, &v[csv_column_position]),
                v[csv_column_position].to_string(),
            )
        })
        .unzip();

    WordDistances::from(words, distances)
}

#[wasm_bindgen]
pub fn get_word_distances_sorted(
    word: &str,
    target_csv: &str,
    csv_column_position: usize,
) -> WordDistances {
    set_error_hook();

    let mut csv = csv::Reader::from_reader(target_csv.as_bytes());

    let mut temp = csv
        .records()
        .map(|v| {
            let v = v.unwrap();
            (
                levenshtein(word, &v[csv_column_position]),
                v[csv_column_position].to_string(),
            )
        })
        .collect::<Vec<(usize, String)>>();

    temp.sort_by(|(d0, _), (d1, _)| d0.cmp(d1));

    let (distances, words) = temp.into_iter().unzip();

    WordDistances::from(words, distances)
}
