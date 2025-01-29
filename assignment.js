function decodeValue(value, base) {  
    return parseInt(value, base);  
}  

function lagrangeInterpolation(decodedValues) {  
    let numValues = decodedValues.length;  
    let c = 0; // Initialize constant term  

    // Looping through each point to apply Lagrange's formula  
    for (let i = 0; i < numValues; i++) {  
        let xi = decodedValues[i].x;  
        let yi = decodedValues[i].y;  
        let term = yi; // Start with the y-value  

        for (let j = 0; j < numValues; j++) {  
            if (i !== j) {  
                let xj = decodedValues[j].x;  
                term *= (0 - xj) / (xi - xj); // Lagrange term  
            }  
        }  
        c += term; // Summing the terms to compute constant  
    }  

    return c; // Final constant term  
}  

function main(jsonInput) {  
    const data = JSON.parse(jsonInput);  
    const n = data.keys.n;  

    const decodedValues = [];  

    // Now we adapt the loop to check for actual existing keys  
    for (let i = 0; i <= n; i++) {  
        const rootInfo = data[i]; 
        if (rootInfo) { 
            const base = parseInt(rootInfo.base);  
            const value = rootInfo.value;  
            const decodedValue = decodeValue(value, base);  
            decodedValues.push({ x: i, y: decodedValue });  
        }  
    }  

    // Calculate the constant term using Lagrange interpolation  
    const c = lagrangeInterpolation(decodedValues);  
    
    return c; 
}  
 
const jsonInput1 = `{  
    "keys": {  
        "n": 4,  
        "k": 3  
    },  
    "1": {  
        "base": "10",  
        "value": "4"  
    },  
    "2": {  
        "base": "2",  
        "value": "111"  
    },  
    "3": {  
        "base": "10",  
        "value": "12"  
    },  
    "6": {  
        "base": "4",  
        "value": "213"  
    }  
}`;  


const jsonInput2 = `{  
  "keys": {  
    "n": 10,  
    "K": 7  
  },  
  "1": {  
    "base": "6",  
    "value": "1344421144045534511"  
  },  
  "2": {  
    "base": "15",  
    "value": "aed7015a346d63"  
  },  
  "3": {  
    "base": "15",  
    "value": "6aeeeb69631c227c"  
  },  
  "4": {  
    "base": "16",  
    "value": "e1b5e05623d881f"  
  },  
  "5": {  
    "base": "8",  
    "value": "3160345145736262673"  
  },  
  "6": {  
    "base": "3",  
    "value": "212212201112202221120220210101202202020"  
  },  
  "7": {  
    "base": "3",  
    "value": "201212212221100100210100210120201211121"  
  },  
  "8": {  
    "base": "6",  
    "value": "202205433538320400022423"  
  },  
  "9": {  
    "base": "12",  
    "value": "45153788322a1255483"  
  },  
  "10": {  
    "base": "7",  
    "value": "110161310313526312514143"  
  }  
}`;

const result1 = main(jsonInput1);  
const result2 = main(jsonInput2);  
console.log(`The constant term c for 1st input is: ${result1}`);
console.log(`The constant term c for 2nd input is: ${result2}`);
