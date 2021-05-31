var input = require("fs").readFileSync("stdin", "utf8");
var lines = input.split("\n");

const winner = () => {
  let A = 0;
  if (lines[1].includes("A")) A = lines[1].match(/A/g).length;
  let C = 0;
  if (lines[1].includes("C")) C = lines[1].match(/C/g).length;
  const str = A < C ? "Cuti" : A > C ? "Alexis" : "Tie";

  return str;
};

const antiprogression = (index) => {
  let arr = [0, 1, 3];
  for (let i = 2; i < index - 1; i++) {
    let z = getNextAPN(arr);
    arr.push(z);
  }
  return arr;
};

const getNextAPN = (arr) => {
  let z = arr[arr.length - 1];
  let tryNext = true;
  while (tryNext) {
    tryNext = false;
    z++;
    for (let y = arr.length - 1; y > 0; y--) {
      const _y = arr[y];
      for (let x = y - 1; x > 0; x--) {
        const _x = arr[x];
        if (z - _y == _y - _x) tryNext = true;
      }
    }
  }
  return z;
};

const otherAntiprogression = (index) => {
  let arr = [
    {
      num: 0,
      dif: [0],
    },
    {
      num: 1,
      dif: [1],
    },
    {
      num: 3,
      dif: [2],
    },
    {
      num: 4,
      dif: [1, 3],
    },
  ];
  while (arr.length < index) {
    let occ = true;
    let _num = arr[arr.length - 1].num;
    let _dif = [];
    while (occ == true) {
      _num++;
      _dif = [];
      occ = false;
      for (let i = arr.length - 1; i > 0; i--) {
        const y = arr[i];
        const diff = _num - y.num;
        if (y.dif.includes(diff)) {
          occ = true;
          break;
        } else {
          _dif.push(diff);
        }
      }
    }
    let obj = { num: _num, dif: _dif };
    arr.push(obj);
  }
  return arr.map((item) => item.num);
};

const easyTask = (_lines) => {
  const network = _lines[0].split(" ").map((x) => parseInt(x));
  const connecs = _lines
    .map((x) => x.split(" ").map((x) => parseInt(x)))
    .slice(1);

  return connecs;
};

const passwords = (arrOfLetters) => {
  const n = arrOfLetters.length;
  const arr = [
    {
      lett: arrOfLetters[0],
      occu: 1,
    },
  ];
  for (let i = 1; i < n; i++) {
    const finded = arr.find((x) => x.lett == arrOfLetters[i]);
    finded ? finded.occu++ : arr.push({ lett: arrOfLetters[i], occu: 1 });
  }
  const _arr = arr.map((x) => x.occu);
  const n_fac = factorial(n);
  const occ_fac = occ(_arr);
  const result = n_fac / occ_fac;

  return result > 31536000 ? "Secure" : result;
};

const occ = (arr) => {
  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    result *= factorial(arr[i]);
  }
  return result;
};

const factorial = (num) => {
  return num == 1 ? num : num * factorial(num - 1);
};

const ap_ver3 = (num) => {
  let result = 1;
  if (num > 1) {
    result = ap_ver3(num - 1) + Math.floor(ap_ver3(num - 1) / (num - 1)) + 2;
  }
  return result;
  // a(n) = a(n-1) + floor(a(n-1)/(n-1)) + 2
};

const ap_ver4 = (num) => {
  let result =
    num * (Math.floor(Math.log2(num)) + 3) -
    Math.pow(2, Math.floor(Math.log2(num) + 1));
  return result;
};

const ap_ver5 = (n) => {
  return parseInt(((n - 1) >>> 0).toString(2), 3);
};

const teams = (str) => {
  let teams = [];
  // let obj = { num: _num, dif: _dif };
  for (let i = 0; i < str.length; i++) {
    const team = str[i];
    if (teams.find((x) => x.name == team)) {
    } else {
      let indices = [];
      let idx = str.indexOf(team);
      while (idx != -1) {
        indices.push(idx);
        idx = str.indexOf(team, idx + 1);
      }
      const peri = period(indices, str.length);

      teams.push({
        name: team,
        indexes: indices,
        Ft: indices[0] + 1,
        Pt: peri,
        Ft_plus_Pt: indices[0] + 1 + peri,
      });
    }
  }

  let posible_cheaters = teams
    .filter((x) => x.Pt != -1)
    .filter((x) => x.Ft <= x.Pt);
  // const result = "";
  for (let i = 0; i < str.length; i++) {}

  let result = posible_cheaters
    .map((x) => x.name)
    .sort()
    .join("");
  return result == false ? -1 : result;
};

const period = (arr, historyLen) => {
  let result = false;
  let period = -1;
  for (let i = 1; i < arr.length; i++) {
    const n_1 = arr[i];
    const n_0 = arr[i - 1];
    const diff = n_1 - n_0;
    if (i == 1) {
      period = diff;
    } else if (period != diff) {
      period = -1;
      break;
    }
  }

  if (period != -1) {
    const last = arr[arr.length - 1];
    if (last + period < historyLen) {
      period = -1;
    }
  }

  return period;
};

var encryted_pdf = require("fs").readFileSync("encrypted.pdf", "utf8");

const decrypt = (seed = 0, input = encryted_pdf) => {
  let regex = /component|resp|answ|a\Wn\Ws\We\Wr|index/i;
  // let regex =
  //   /width|prog|http|encr|admin|index|lang|link|encod|contra|prize|size/i;
  // let regex = /.*/;
  let result = "";
  if (seed == 0) {
    for (let j = -10; j < 10; j++) {
      const ch = j;
      for (let i = 10000 * (ch - 1); i < 10000 * ch; i++) {
        let X = i;
        let newFile = "";
        for (let k = 0; k < input.length / 5; k++) {
          newFile += String.fromCharCode(input[k].charCodeAt(0) + X);
          X--;
        }
        if (regex.test(newFile)) {
          // console.log(newFile);
          console.log("found: " + i);
        }
      }
      console.log("found: none");
    }
  } else {
    let X = seed;
    let newFile = "";
    for (let k = 0; k < input.length / 5; k++) {
      newFile += String.fromCharCode(input[k].charCodeAt(0) + X);
      X--;
    }
    console.log(newFile.match(regex));
  }
};
// decrypt(171);

// console.clear();
const _decrypt = (input) => {
  newFile = "";
  X = 0;
  for (let k = 0; k < input.length; k++) {
    const pivot = input[k].charCodeAt(0);
    if (pivot != 65533) {
      // newFile += String.fromCharCode(input[k].charCodeAt(0));
    }
    newFile += String.fromCharCode(input[k].charCodeAt(0) + X);
    X--;
  }
  console.log(newFile);
};

const dec = () => {
  const nums = [
    -196469, -196437, -193273, -191176, -189623, -189591, -189099, -130933,
    -130901, -127737, -125640, -124087, -124055, -123563, -65397, -65365,
    -62201, -60104, -58551, -58519, -58027, 139, 171, 3335, 5432, 6985, 7017,
    7509, 65675, 65707, 68871, 70968, 72521, 72553, 73045, 131211, 131243,
    134407, 136504, 138057, 138089, 138581,
  ];
  nums.forEach((element) => {
    decrypt(element);
  });
};
// dec();

const safe = (lines) => {
  const parsed = lines.map((x) => x.split(" ").map((y) => parseInt(y)));
  const w_empty = parsed[0][1];
  const w_measured = parsed[0][2];
  let objects = parsed.map((x) => [x[0], x[1]]);
  objects.shift();
  const w_unstolen = objects.map((x) => x[1]).reduce((a, b) => a + b) + w_empty;
  const w_diff = w_unstolen - w_measured;
  const _combi = powerset(objects);
  _combi.pop();
  console.log(_combi);
  let combi = [];
  for (let i = 0; i < _combi.length; i++) {
    let v = 0;
    let w = 0;
    for (let j = 0; j < _combi[i].length; j++) {
      j % 2 ? (v += _combi[i][j]) : (w += _combi[i][j]);
    }
    combi.push([v, w]);
  }

  const candidates = combi.filter((x) => x[0] == w_diff);
  if (candidates.length > 0) {
    const values = candidates.map((x) => x[1]);
    const max = Math.max(...values);
    const min = Math.min(...values);

    return min + " " + max;
  } else {
    return -1;
  }
};

function powerset(arr, prefix = [], i = 0) {
  if (i == arr.length) return [prefix];

  return powerset(arr, prefix.concat(arr[i]), i + 1).concat(
    powerset(arr, prefix, i + 1)
  );
}

// console.log(findPowerSet([5, 3, 2]));
// console.log(safe(lines));

const findBestContainer = (inp) => {
  const fac = factor(parseInt(inp));
  const result = best3(fac);
  return result;
};

const areaOfCube = (x, y, z) => {
  return 2 * (y * x + y * z + x * z);
};

const factor = (number, values = [], counter = 2) => {
  while (number % counter !== 0) {
    counter++;
  }
  values.push(counter);
  return counter >= number ? values : factor(number / counter, values);
};

const best3 = (arr) => {
  let result = 0;
  if (arr.length == 1) {
    result = areaOfCube(arr[0], 1, 1);
  } else if (arr.length == 2) {
    result = areaOfCube(arr[0], arr[1], 1);
  } else if (arr.length == 3) {
    result = areaOfCube(arr[0], arr[1], arr[2]);
  } else {
    arr.reverse();
    let x = arr.shift();
    let y = arr.shift();
    let z = arr.shift();
    while (arr.length >= 1) {
      const small = arr[arr.length - 1];
      if (z * small <= y) {
        z *= arr.pop();
      } else if (y * small <= x) {
        y *= arr.pop();
      } else {
        x *= arr.pop();
      }
    }
    // console.log({ x: x, y: y, z: z });
    result = areaOfCube(x, y, z);
  }
  return result;
};

function primesTo(max) {
  var store = [],
    result = [];
  for (let i = 2; i <= max; ++i) {
    if (!store[i]) {
      result.push(i);
      for (let j = i << 1; j <= max; j += i) {
        store[j] = true;
      }
    }
  }
  return result;
}

const grapho = (l) => {
  const arr = l.map((a) => a.split(" "));
  const V = arr[0][0];
  const E = arr[0][1];
  let matrix = zeroMatrix(V, E);
  for (let i = 1; i < arr.length; i++) {
    let a = parseInt(arr[i][0]) - 1;
    let b = parseInt(arr[i][1]) - 1;
    matrix[a][b] += 1;
    matrix[b][a] += 1;
  }
  return matrix;
};

const getIsomorph = (base_matrix, ones, zeros, perms) => {
  let arr = [];
  let r = base_matrix.length;
  let c = base_matrix[0].length;
  const amoutOfPermutations = perms;

  console.table(base_matrix);
  for (let p = 0; p < zeros; p++) {
    let moving = false;
    let occupied = base_matrix.map((x) => x);
    let newMat = base_matrix.map((x) => x);
    for (let i = 0; i < base_matrix.length; i++) {
      for (let j = 1 + i; j < base_matrix.length; j++) {
        if (!moving) {
          if (newMat[i][j] == 1) {
            newMat[i][j] = 0;
            moving = true;
          }
        } else {
          if (newMat[i][j] == 0 && occupied[i][j] == 0) {
            newMat[i][j] == 1;
            occupied[i][j] == 1;
            arr.push([...newMat]);
            newMat = [...base_matrix];
            moving = false;
          }
        }
      }
    }
  }
  // console.log(arr);

  return arr;
};

const zeroMatrix = (V) => {
  let matrix = [];
  for (let f = 0; f < V; f++) {
    let row = [];
    for (let c = 0; c < V; c++) {
      row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
};

const network = (l) => {
  const base_matrix = grapho(l);
  const arr = l.map((a) => a.split(" "));
  const V = arr[0][0];
  const E = arr[0][1];
  const posible_permutations = factorial(E - 1);
  const cons_count = E - 1;
  const zeros_count = posible_permutations - cons_count;
  let isomorphic_network = getIsomorph(
    base_matrix,
    cons_count,
    zeros_count,
    posible_permutations
  );
  return isomorphic_network;
};

const isomorphism = (b_mat, p_mat) => {};

network(lines);
