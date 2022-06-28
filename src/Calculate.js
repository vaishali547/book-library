import React, { useState } from "react";

const Calculate = () => {
  const [input, setInput] = useState("");
  const [solution, setSolution] = useState("");

  const findResult = (exp = "") => {
    const digits = "0123456789.";
    const operators = ["+", "-", "*", "/", "negate"];
    const legend = {
      "+": {
        pred: 2,
        func: (a, b) => {
          return a + b;
        },
        assoc: "left",
      },
      "-": {
        pred: 2,
        func: (a, b) => {
          return a - b;
        },
        assoc: "left",
      },
      "*": {
        pred: 3,
        func: (a, b) => {
          return a * b;
        },
        assoc: "left",
      },
      "/": {
        pred: 3,
        func: (a, b) => {
          if (b != 0) {
            return a / b;
          } else {
            return 0;
          }
        },
      },
      assoc: "left",
      negate: {
        pred: 4,
        func: (a) => {
          return -1 * a;
        },
        assoc: "right",
      },
    };
    exp = exp.replace(/\s/g, "");
    function containsAnyLetter(str) {
      return /[a-zA-Z#$%&@^!_]/.test(str);
    }
    function containsMoreOperators(str) {
      return /[\+\*\/\-][\+\*\/\-]/.test(str);
    }
    if (containsAnyLetter(exp) || containsMoreOperators(exp)) {
      alert("Invalid Expression");
      // setInput("");
    } else {
      let operations = [];
      let outputQueue = [];
      let ind = 0;
      let str = "";
      while (ind < exp.length) {
        debugger;
        let ch = exp[ind];
        if (operators.includes(ch)) {
          if (str !== "") {
            outputQueue.push(new Number(str));
            str = "";
          }
          if (ch === "-") {
            if (ind == 0) {
              ch = "negate";
            } else {
              let nextCh = exp[ind + 1];
              let prevCh = exp[ind - 1];
              if (
                (digits.includes(nextCh) || nextCh === "(" || nextCh === "-") &&
                (operators.includes(prevCh) || exp[ind - 1] === "(")
              ) {
                ch = "negate";
              }
            }
          }
          if (operations.length > 0) {
            let topOper = operations[operations.length - 1];
            // console.log(topOper)
            while (
              operations.length > 0 &&
              legend[topOper] &&
              ((legend[ch].assoc === "left" &&
                legend[ch].pred <= legend[topOper].pred) ||
                (legend[ch].assoc === "right" &&
                  legend[ch].pred < legend[topOper].pred))
            ) {
              // console.log(operations)
              outputQueue.push(operations.pop());
              // console.log(outputQueue)
              // console.log(operations)
              topOper = operations[operations.length - 1];
            }
          }
          operations.push(ch);
          // console.log(operations)
        } else if (digits.includes(ch)) {
          str += ch;
        } else if (ch === "(") {
          operations.push(ch);
        } else if (ch === ")") {
          if (str !== "") {
            outputQueue.push(new Number(str));
            str = "";
          }
          while (
            operations.length > 0 &&
            operations[operations.length - 1] !== "("
          ) {
            outputQueue.push(operations.pop());
          }
          if (operations.length > 0) {
            operations.pop();
          }
        }
        // console.log(outputQueue)
        // console.log(operations)
        ind++;
      }
      if (str !== "") {
        outputQueue.push(new Number(str));
      }
      outputQueue = outputQueue.concat(operations.reverse());
      console.log(outputQueue);
      let res = [];
      while (outputQueue.length > 0) {
        let ch = outputQueue.shift();
        if (operators.includes(ch)) {
          let num1, num2, subResult;
          if (ch === "negate") {
            res.push(legend[ch].func(res.pop()));
          } else {
            let [num2, num1] = [res.pop(), res.pop()];
            res.push(legend[ch].func(num1, num2));
          }
        } else {
          res.push(ch);
        }
      }
      return res.pop().valueOf();
    }
  };

  const handleClick = () => {
    const exp = input;
    const res = findResult(exp);
    console.log(res);
    setSolution(res);
  };

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input type="submit" value="Calculate" onClick={handleClick} />
      <p>{solution}</p>
    </>
  );
};

export default Calculate;
