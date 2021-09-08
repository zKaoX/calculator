const TOKEN_TYPES = {
  DIGITS: 'DIGITS',
  DOT: 'DOT',
  PLUS: 'PLUS',
  MINUS: 'MINUS',
  STAR: 'STAR',
  SLASH: 'SLASH',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
};

class Token {
  constructor({type, value}) {
      this.type = type;
      this.value = value;
  }
};

const WHITESPACES = [' ', '\t'];
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function lexer(string) {
  const tokens = [];
  let cursor = 0;
  
  while(cursor < string.length) {
    let char = string[cursor];
    
    if (char === '.') {
      const token = new Token({ type: TOKEN_TYPES.DOT, value: null });
      tokens.push(token);
      cursor++;
      continue;
    }
    
    if (char === '+') {
      const token = new Token({ type: TOKEN_TYPES.PLUS, value: null });
      tokens.push(token);
      cursor++;
      continue;
    } 
    
    if (char === '-') {
      const token = new Token({ type: TOKEN_TYPES.MINUS, value: null });
      tokens.push(token);
      cursor++;
     continue;
    } 
    
    if (char === '*') {
      const token = new Token({ type: TOKEN_TYPES.STAR, value: null });
      tokens.push(token);
      cursor++;
      continue;
    } 
    
    if (char === '/') {
      const token = new Token({ type: TOKEN_TYPES.SLASH, value: null });
      tokens.push(token);
      cursor++;
   continue;
    } 
    
    if (char === '(') {
      const token = new Token({ type: TOKEN_TYPES.LPAREN, value: null });
      tokens.push(token);
      cursor++;
      continue;
    }
    
    if (char === ')') {
      const token = new Token({ type: TOKEN_TYPES.RPAREN, value: null });
      tokens.push(token);
      cursor++;
      continue;
    } 
    
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
      let digits = '';
      while (cursor < string.length && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
        digits += char;
        cursor++;
        char = string[cursor];
      }
      const token = new Token({ type: TOKEN_TYPES.DIGITS, value: digits });
      tokens.push(token);
      continue;
    }
    
    if ([char === ' ']) {
      cursor++;
      continue;
    }
  }

  return tokens;
}

// console.log(lexer('+++3.2 - - +34'));
// console.log(lexer(''));

// =============================================
// =============================================

class BinaryOperator {
  constructor(left, right, combinator) {
      this.left = left;
      this.right = right;
      this.combinator = combinator;
  }

  evaluate() {
    return this.combinator(
      this.left.evaluate(),
      this.right.evaluate()
    );
  }
};

class Number_ {
  constructor(value) {
      this.value = value;
  }

  evaluate() {
    return Number.parseFloat(this.value);
  }
}
// listOf(node|token) -> node
function parse(tokens) {
if (tokens.length === 0) {
  throw 'Tokens length is zero.'
} 

if (tokens.length === 1) {
  const token = tokens[0];
  if (token.type === TOKEN_TYPES.DIGITS) {
    return new Number_(token.value);
  }

  if (token.type === undefined || token.type === null) {
    return token;
  }


  throw { message: 'Invalid last token', token };
}



if (tokens.length === 2) {
  const token = tokens[0];
  if (token.type === TOKEN_TYPES.MINUS) {
    return new BinaryOperator( new Number_(0), parse(tokens.slice(1, tokens.length)), (l, r) => l - r);
  }

  if (token.type === TOKEN_TYPES.PLUS) {
    return new BinaryOperator( new Number_(0), parse(tokens.slice(1, tokens.length)), (l, r) => l + r);
  }

  throw { message: 'Invalid last token', token };
}

const dotIndex = tokens.findIndex(token => token.type === TOKEN_TYPES.DOT);
if (dotIndex !== -1) {
  const token = tokens[dotIndex];
  let left = tokens[dotIndex - 1];
  let right = tokens[dotIndex + 1];
  if (left.type === TOKEN_TYPES.DIGITS && right.type === TOKEN_TYPES.DIGITS) {
   const integerPart = Number.parseInt(left.value);
   const ss = Number.parseInt(right.value);
   const xx = Math.pow(10, right.value.length);
   const floatPart = ss / xx;
   const num = new Number_(integerPart + floatPart);
   tokens.splice(dotIndex - 1, 3, num);
   return parse(tokens);
  } else {
      throw { message: 'Dot has not number on both side', tokens: { leftSide: left, rightSide: right } };
  }
}

const lParenIndex = tokens.findIndex(token => token.type === TOKEN_TYPES.LPAREN);
let rParentIndex = tokens.slice().reverse().findIndex(token => token.type === TOKEN_TYPES.RPAREN);
rParentIndex = -1;
let unmatchedLeftP = 1;
for (let i = lParenIndex + 1; i < tokens.length; i++) {
  const t = tokens[i];
  if (t.type === TOKEN_TYPES.RPAREN) { unmatchedLeftP -= 1; }
  if (t.type === TOKEN_TYPES.LPAREN) { unmatchedLeftP += 1; }
  if (t.type === TOKEN_TYPES.RPAREN && unmatchedLeftP === 0) {
    rParentIndex = i;
    break;
  }
}
if (lParenIndex !== -1 || rParentIndex !== -1) {
  if (lParenIndex === -1 || rParentIndex === -1) {
    throw { message: 'Unbalanced parenthesis' };
  }

  if (lParenIndex >= rParentIndex) {
    throw { message: 'Invalid parenthesis order' };
  }

  const node =  parse( tokens.slice(lParenIndex + 1, rParentIndex) );
  tokens = tokens.filter((el, index) => index < lParenIndex || index > rParentIndex);
  tokens.splice(lParenIndex, 0, node);
  return parse(tokens);
}

const minusIndex = tokens.findIndex(token => token.type === TOKEN_TYPES.MINUS);
if (minusIndex > 0) {
  let leftNode;
  if (minusIndex === 0) {
    leftNode = new Number_(0);
  } else {
    leftNode = tokens[minusIndex - 1].type
              ? parse( tokens.slice(0, minusIndex) )
              : tokens[minusIndex - 1];
  }
  const rightNode = tokens[minusIndex + 1].type
                    ? parse( tokens.slice(minusIndex + 1, tokens.length) )
                    : tokens[minusIndex + 1];
  return new BinaryOperator(leftNode, rightNode, (l, r) => l - r);

}

const plusIndex = tokens.findIndex(token => token.type === TOKEN_TYPES.PLUS);
if (plusIndex > 0) {
  const leftNode = tokens[plusIndex - 1].type
                   ? parse( tokens.slice(0, plusIndex) )
                   : tokens[plusIndex - 1];
  const rightNode = tokens[plusIndex + 1].type
                    ? parse( tokens.slice(plusIndex + 1, tokens.length) )
                    : tokens[plusIndex + 1];
  return new BinaryOperator(leftNode, rightNode, (l, r) => l + r);
}

const starIndex = tokens.findIndex(token => token.type === TOKEN_TYPES.STAR);
if (starIndex !== -1) {
  const leftNode = tokens[starIndex - 1].type
                   ? parse( tokens.slice(0, starIndex) )
                   : tokens[starIndex - 1];
  const rightNode = tokens[starIndex + 1].type
                    ? parse( tokens.slice(starIndex + 1, tokens.length) )
                    : tokens[starIndex + 1];
  return new BinaryOperator(leftNode, rightNode, (l, r) => l * r);
}

const slashIndex = tokens.findIndex(token => token.type === TOKEN_TYPES.SLASH);
if (slashIndex !== -1) {
  const leftNode = tokens[slashIndex - 1].type
                   ? parse( tokens.slice(0, slashIndex) )
                   : tokens[slashIndex - 1];
  const rightNode = tokens[slashIndex + 1].type
                    ? parse( tokens.slice(slashIndex + 1, tokens.length) )
                    : tokens[slashIndex + 1];
  return new BinaryOperator(leftNode, rightNode, (l, r) => l / r);
}


return null;
}

// lexer('((3 + 2) * 4) + 1');
// lexer('((3 + 2) * (4 +1)) - (1 + 1)');
const tokens = lexer('((3.1 + 2) * (5.5 +1.2)) - 4')
const tree = parse([...tokens]);
console.log(tokens);
console.log(tree);
console.log(tree.evaluate());

export const evaluate = (str) => parse( lexer(str) ).evaluate();
