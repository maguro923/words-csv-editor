use std::cmp::max;

pub fn levenshtein(a: &str, b: &str) -> usize {
  let len_a = a.chars().count();
  let len_b = b.chars().count();

  if len_a == 0 || len_b == 0 {
    return max(len_a, len_b);
  }

  let mut dp: Vec<usize> = (1..).take(len_a).collect();
  let mut result = len_a;
  
  for (index_b, code_b) in b.chars().enumerate() {
      result = index_b;
      let mut dist_a = index_b;
      let mut dist_b;

      for (index_a, code_a) in a.chars().enumerate() {
          if code_a == code_b { // matched
              result = dist_a; // dp[index_b -1][index_a -1]
              dist_a = dp[index_a]; // dp[index_b -1][index_a]
              dp[index_a] = result;
          } else {
              dist_b = dist_a; // dp[index_b][index_a -1]
              dist_a = dp[index_a]; // dp[index_b -1][index_a]
              
              // dist_a: dp[index_b -1][index_a]
              // result: dp[index_b -1][index_a -1]
              result = if dist_a > result { 
                  if dist_b > result {
                      result + 1
                  } else {
                      dist_b + 1
                  }
              } else {
              // dist_a: dp[index_b -1][index_a]
              // dist_b: dp[index_b][index_a -1]
                  if dist_b > dist_a {
                      dist_a + 1
                  } else {
                      dist_b + 1
                  }
              };
              
              dp[index_a] = result;
          }
      }
  }

  result
}

#[cfg(test)]
mod test_levenshtein {
    use crate::levenshtein::levenshtein;

  #[test]
  fn test_levenshtein(){
    let s0 = ("orange", "grape");
    let s1 = ("kitten", "sitting");

    assert_eq!(levenshtein(s0.0, s0.1), 3);
    assert_eq!(levenshtein(s1.0, s1.1), 3);
  }
}