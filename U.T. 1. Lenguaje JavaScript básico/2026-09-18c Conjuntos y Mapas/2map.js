const equipos = new Map();
equipos.set('rm', 'Real Madrid');
equipos.set('bc', 'Fútbol Club Barcelona');
equipos.set('am', 'Atlético de Madrid');

console.clear();
console.log(equipos.size);
console.table(equipos);

console.log(equipos.get('bc'));

console.table(equipos.keys());
console.table(equipos.values());

console.table(Array.from(equipos.values()).sort());
