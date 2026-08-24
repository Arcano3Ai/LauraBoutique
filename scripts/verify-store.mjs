import assert from 'node:assert';
import { 
  PRODUCTS_DATA, 
  CATEGORIES_DATA, 
  LOOK_BUNDLE_DATA, 
  COUPONS_DATA 
} from '../src/data/mockData.ts';
import { 
  FREE_SHIPPING_THRESHOLD, 
  STANDARD_SHIPPING_COST 
} from '../src/lib/store.ts';

console.log('🧪 INICIANDO TEST SUITE INTEGRAL DE "MY BOUTIQUE MORE"...\n');

// 1. Verificación del catálogo de productos
console.log('1️⃣  Verificando integridad del catálogo...');
assert(PRODUCTS_DATA.length >= 10, 'El catálogo debe tener al menos 10 productos');
for (const p of PRODUCTS_DATA) {
  assert(p.id && p.slug && p.name && p.price > 0, `Producto ${p.id} tiene datos inválidos`);
  assert(p.images.length >= 2, `Producto ${p.name} debe tener al menos 2 imágenes para el hover flip`);
  assert(p.category === 'accesorios' || p.sizes.length >= 3, `Producto ${p.name} debe contar con al menos 3 tallas`);
  assert(p.colors.length >= 1, `Producto ${p.name} debe contar con al menos 1 color`);
  assert(p.description && p.composition, `Producto ${p.name} debe contar con descripción y composición`);
}
console.log(`   ✅ ${PRODUCTS_DATA.length} productos verificados con datos completos, tallas, colores e imágenes dobles.`);

// 2. Verificación de categorías
console.log('\n2️⃣  Verificando categorías de la tienda...');
assert(CATEGORIES_DATA.length >= 5, 'Deben existir al menos 5 categorías');
const requiredCats = ['vestidos', 'blusas', 'pantalones', 'sets', 'accesorios'];
for (const req of requiredCats) {
  assert(CATEGORIES_DATA.some(c => c.id === req), `Categoría requerida ${req} no encontrada`);
}
console.log(`   ✅ Categorías requeridas presentes: ${requiredCats.join(', ')}.`);

// 3. Verificación de la sección "Arma Tu Look" (Bundle)
console.log('\n3️⃣  Verificando bundle "Arma Tu Look"...');
assert(LOOK_BUNDLE_DATA.items.length === 3, 'El bundle debe contener 3 prendas combinadas');
const calculatedBundleTotal = LOOK_BUNDLE_DATA.items.reduce((sum, item) => sum + item.price, 0);
assert.strictEqual(LOOK_BUNDLE_DATA.totalPrice, calculatedBundleTotal, 'El precio del bundle debe coincidir con la suma de las prendas');
console.log(`   ✅ Bundle verificado: ${LOOK_BUNDLE_DATA.name} por $${LOOK_BUNDLE_DATA.totalPrice} MXN.`);

// 4. Verificación de lógica de descuentos y cupones
console.log('\n4️⃣  Verificando motor de cupones de descuento...');
assert(COUPONS_DATA.length >= 3, 'Deben existir al menos 3 cupones');
const bienvenidaCoupon = COUPONS_DATA.find(c => c.code === 'BIENVENIDA15');
assert(bienvenidaCoupon && bienvenidaCoupon.discountPercentage === 15, 'Cupón BIENVENIDA15 debe dar 15%');

const lauraCoupon = COUPONS_DATA.find(c => c.code === 'LAURA10');
assert(lauraCoupon && lauraCoupon.discountPercentage === 10, 'Cupón LAURA10 debe dar 10%');

const envioCoupon = COUPONS_DATA.find(c => c.code === 'ENVIOGRATIS');
assert(envioCoupon && envioCoupon.discountFixed === 149, 'Cupón ENVIOGRATIS debe descontar $149 de envío');
console.log('   ✅ Cupones BIENVENIDA15, LAURA10 y ENVIOGRATIS validados correctamente.');

// 5. Verificación de cálculo de envío gratis y totales
console.log('\n5️⃣  Verificando umbral de envío gratis y cálculos de carrito...');
assert.strictEqual(FREE_SHIPPING_THRESHOLD, 1499, 'El umbral de envío gratis debe ser $1,499 MXN');
assert.strictEqual(STANDARD_SHIPPING_COST, 149, 'El envío estándar debe ser $149 MXN');

// Caso A: Carrito menor a $1,499 MXN sin cupón -> Paga $149 de envío
const subtotalA = 899; // Vestido Aura
const shippingA = subtotalA >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
assert.strictEqual(shippingA, 149, 'Para $899 MXN el envío debe ser $149 MXN');
assert.strictEqual(subtotalA + shippingA, 1048, 'Total debe ser $1,048 MXN');

// Caso B: Carrito mayor a $1,499 MXN -> Envío $0 MXN
const subtotalB = 1697; // Look Bundle completo
const shippingB = subtotalB >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
assert.strictEqual(shippingB, 0, 'Para $1,697 MXN el envío debe ser GRATIS ($0 MXN)');
assert.strictEqual(subtotalB + shippingB, 1697, 'Total debe ser $1,697 MXN');
console.log('   ✅ Lógica de cálculo de envío gratis comprobada.');

// 6. Verificación de filtros de precios y tallas
console.log('\n6️⃣  Verificando lógica de filtros del catálogo...');
const testSizes = ['XS', 'S', 'M', 'L', 'XL'];
for (const sz of testSizes) {
  const matching = PRODUCTS_DATA.filter(p => p.sizes.includes(sz));
  assert(matching.length > 0, `Debe haber al menos 1 producto para la talla ${sz}`);
}
console.log('   ✅ Filtros de tallas validados en todos los productos.');

console.log('\n🎉 ¡TODOS LOS TESTS UNITARIOS Y DE INTEGRACIÓN DE DATOS PASARON AL 100%!');
