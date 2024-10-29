import Benchmark from 'benchmark';
import validate from '../dist/luhn.js';

const suite = new Benchmark.Suite;

suite
  .add('Luhn Validate', function() {
    validate('1234567890123456'); // Example card number
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true }); 