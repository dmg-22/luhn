import Benchmark from 'benchmark';
import validate from '../src/luhn';
import validateOptimized from '../src/luhnOptimized';

const suite = new Benchmark.Suite;

// Ejemplos de cadenas para validar
const testStrings = [
  "4539 1488 0343 6467",
  "4716 1234 5678 9112",
  "6011 1111 1111 1117",
  "3782 822463 10005",
  "3056 9309 0259 04"
];

suite
  .add('Validar Luhn Original', function() {
    testStrings.forEach(str => validate(str));
  })
  .add('Validar Luhn Optimizado', function() {
    testStrings.forEach(str => validateOptimized(str));
  })
  .on('cycle', function(event: any) {
    console.log(String(event.target));
  })
  .on('complete', function(this: any) {
    console.log('Método más rápido es ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });
