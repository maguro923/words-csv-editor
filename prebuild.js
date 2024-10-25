const { execSync } = require('child_process');

console.log(
  execSync('cd hooks/search-word/ && wasm-pack build --target web').toString(),
);