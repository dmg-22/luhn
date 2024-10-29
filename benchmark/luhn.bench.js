import Benchmark from 'benchmark';
import validate from '../dist/luhn.js';

const suite = new Benchmark.Suite;

// Casos de prueba
const validCard = '4532875311640795';
const invalidCard = '4532875311640796';
const longCard = '4532875311640795453287531164079545328753116407954532875311640795';

suite
.add('Valid card validation', function() {
  validate(validCard);
})
.add('Invalid card validation', function() {
  validate(invalidCard);
})
.add('Long number validation', function() {
  validate(longCard);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
