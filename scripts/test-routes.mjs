// Route verification script for My Boutique More
import http from 'node:http';
import assert from 'node:assert';

const ROUTES = [
  '/',
  '/shop',
  '/product/vestido-aura',
  '/product/blusa-isabella',
  '/cart',
  '/checkout',
  '/checkout/success',
  '/wishlist',
  '/account',
  '/login',
  '/register',
  '/admin',
  '/faq',
  '/contacto',
  '/nosotros',
  '/politicas'
];

console.log('🌐 VERIFICANDO DISPONIBILIDAD DE RUTAS HTTP (PORT 3000)...\n');

function checkRoute(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, length: data.length, body: data });
      });
    });
    req.on('error', err => reject(err));
  });
}

async function run() {
  let passed = 0;
  for (const route of ROUTES) {
    try {
      const res = await checkRoute(route);
      assert(res.status === 200, `Ruta ${route} respondió con código ${res.status}`);
      console.log(`   ✅ ${route.padEnd(25)} -> Status 200 OK (${res.length} bytes)`);
      passed++;
    } catch (err) {
      console.error(`   ❌ ${route.padEnd(25)} -> ERROR: ${err.message}`);
    }
  }

  console.log(`\n📊 RESULTADO: ${passed}/${ROUTES.length} rutas verificadas con HTTP 200.`);
  if (passed === ROUTES.length) {
    console.log('🏆 ¡TODAS LAS RUTAS DE LA TIENDA RESPONDEN PERFECTAMENTE!');
  }
}

run();
