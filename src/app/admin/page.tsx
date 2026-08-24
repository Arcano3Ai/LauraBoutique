'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Package, ShoppingBag, Users, Tag, Star, Settings, 
  Plus, Edit, Trash2, CheckCircle2, Truck, AlertCircle, ArrowUpRight, DollarSign 
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product, Order } from '@/types';
import { useToast } from '@/components/ui/ToastProvider';

export default function AdminDashboardPage() {
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'productos' | 'pedidos' | 'inventario' | 'cupones' | 'resenas' | 'configuracion'
  >('dashboard');

  // New Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<any>('vestidos');
  const [newProdPrice, setNewProdPrice] = useState('899');
  const [newProdStock, setNewProdStock] = useState('20');
  const [newProdBadge, setNewProdBadge] = useState<any>('NUEVO');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newSlug = newProdName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: newSlug,
      name: newProdName,
      tagline: 'Nueva prenda de colección confeccionada con acabado artesanal',
      category: newProdCategory,
      categoryName: newProdCategory.charAt(0).toUpperCase() + newProdCategory.slice(1),
      price: parseFloat(newProdPrice) || 899,
      badge: newProdBadge || undefined,
      rating: 5.0,
      reviewCount: 1,
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'
      ],
      colors: [
        { name: 'Beige', hex: '#DCCFBD' },
        { name: 'Negro', hex: '#292725' }
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
      stockCount: parseInt(newProdStock) || 20,
      description: `${newProdName} diseñada bajo la filosofía atemporal de Laura Boutique.`,
      composition: '80% Lino, 20% Algodón Peinado',
      careInstructions: ['Lavar en frío', 'No usar blanqueador']
    };

    addProduct(newProduct);
    toast(`Producto "${newProduct.name}" agregado al catálogo con éxito`, { type: 'success' });
    setShowAddProductModal(false);
    setNewProdName('');
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast(`Estado del pedido actualizado a: ${newStatus}`, { type: 'success' });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-8 md:py-12 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-[#DCCFBD]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-bold block mb-1">
              Administración General
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
              PANEL DE CONTROL
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="text-xs uppercase tracking-wider text-[#292725] hover:text-[#B99663] font-semibold flex items-center gap-1"
            >
              <span>Ver Tienda en Vivo</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dashboard Nav Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#DCCFBD] scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'productos', label: `Productos (${products.length})`, icon: Package },
            { id: 'pedidos', label: `Pedidos (${orders.length})`, icon: ShoppingBag },
            { id: 'inventario', label: 'Inventario', icon: DollarSign },
            { id: 'cupones', label: 'Cupones', icon: Tag },
            { id: 'resenas', label: 'Reseñas', icon: Star },
            { id: 'configuracion', label: 'Configuración', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap flex items-center gap-2 border transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#292725] text-white border-[#292725]'
                    : 'bg-[#F7F2EA] text-[#292725] border-[#DCCFBD] hover:border-[#292725]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards (4 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] font-semibold block">
                  Ventas del Día
                </span>
                <p className="font-editorial text-3xl font-bold text-[#292725]">$14,890 MXN</p>
                <span className="text-[11px] text-emerald-700 font-medium">+18% vs ayer</span>
              </div>

              <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] font-semibold block">
                  Ventas del Mes
                </span>
                <p className="font-editorial text-3xl font-bold text-[#292725]">$184,320 MXN</p>
                <span className="text-[11px] text-[#B99663] font-medium">Meta: $200,000 MXN</span>
              </div>

              <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] font-semibold block">
                  Total Pedidos
                </span>
                <p className="font-editorial text-3xl font-bold text-[#292725]">128 órdenes</p>
                <span className="text-[11px] text-emerald-700 font-medium">98.4% entregados a tiempo</span>
              </div>

              <div className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] font-semibold block">
                  Ticket Promedio
                </span>
                <p className="font-editorial text-3xl font-bold text-[#292725]">$1,438 MXN</p>
                <span className="text-[11px] text-[#B99663] font-medium">Califica a Envío Gratis</span>
              </div>
            </div>

            {/* Recent Orders Preview & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-8 bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCCFBD]">
                  <h3 className="font-editorial text-xl text-[#292725]">Pedidos Recientes</h3>
                  <button onClick={() => setActiveTab('pedidos')} className="text-xs text-[#B99663] underline font-bold">
                    Ver todos
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#DCCFBD] text-[#A99B8B] uppercase tracking-wider text-[10px]">
                        <th className="pb-2">Orden</th>
                        <th className="pb-2">Clienta</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Estado</th>
                        <th className="pb-2">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCCFBD]/50">
                      {orders.map((o) => (
                        <tr key={o.id} className="py-2.5">
                          <td className="py-2.5 font-bold text-[#292725]">{o.orderNumber}</td>
                          <td className="py-2.5 text-[#292725]">{o.shippingAddress?.fullName || 'Clienta'}</td>
                          <td className="py-2.5 font-semibold text-[#292725]">${o.total.toLocaleString('es-MX')} MXN</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#B99663]/15 text-[#B99663] border border-[#B99663]/30">
                              {o.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-[#A99B8B]">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="lg:col-span-4 bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
                <h3 className="font-editorial text-xl text-[#292725] pb-3 border-b border-[#DCCFBD]">
                  Más Vendidos
                </h3>
                <div className="space-y-3">
                  {products.filter((p) => p.isBestSeller).slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-2 bg-white border border-[#DCCFBD]">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-[#ECE5DC]" />
                      <div className="flex-1 min-w-0">
                        <p className="font-editorial text-sm font-semibold text-[#292725] truncate">{p.name}</p>
                        <p className="text-[11px] text-[#B99663] font-bold">${p.price.toLocaleString('es-MX')} MXN</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#292725]">{p.stockCount} en stock</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTOS */}
        {activeTab === 'productos' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl text-[#292725]">Catálogo de Productos ({products.length})</h2>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="btn-editorial-primary flex items-center gap-2 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nueva Prenda</span>
              </button>
            </div>

            <div className="bg-[#F7F2EA] border border-[#DCCFBD] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#292725] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Prenda</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Badge</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCCFBD]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/60 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-[#ECE5DC] border border-[#DCCFBD]" />
                        <div>
                          <span className="font-editorial text-sm font-semibold text-[#292725] block">{p.name}</span>
                          <span className="text-[10px] text-[#A99B8B]">Slug: {p.slug}</span>
                        </div>
                      </td>
                      <td className="p-3 capitalize">{p.categoryName}</td>
                      <td className="p-3 font-bold">${p.price.toLocaleString('es-MX')} MXN</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 font-semibold text-[10px] ${p.stockCount <= 5 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {p.stockCount} pzas
                        </span>
                      </td>
                      <td className="p-3">
                        {p.badge ? (
                          <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-[#B99663] text-white">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-[#A99B8B]">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const newPrice = prompt(`Modificar precio para ${p.name}:`, p.price.toString());
                              if (newPrice) {
                                updateProduct(p.id, { price: parseFloat(newPrice) });
                                toast(`Precio de ${p.name} actualizado a $${newPrice} MXN`, { type: 'success' });
                              }
                            }}
                            className="p-1.5 text-[#292725] hover:text-[#B99663]"
                            title="Editar Precio"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar ${p.name} del catálogo?`)) {
                                deleteProduct(p.id);
                                toast(`${p.name} eliminado.`, { type: 'info' });
                              }
                            }}
                            className="p-1.5 text-[#A99B8B] hover:text-[#C48B71]"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PEDIDOS */}
        {activeTab === 'pedidos' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-editorial text-2xl text-[#292725]">Gestión de Pedidos</h2>

            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="p-6 bg-[#F7F2EA] border border-[#DCCFBD] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#DCCFBD] gap-2">
                    <div>
                      <span className="font-editorial text-lg font-bold text-[#292725]">{o.orderNumber}</span>
                      <p className="text-xs text-[#A99B8B]">Clienta: <strong>{o.shippingAddress?.fullName}</strong> ({o.shippingAddress?.email})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#A99B8B]">Cambiar estado:</span>
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as any)}
                        className="p-1.5 bg-white border border-[#DCCFBD] text-xs font-semibold text-[#292725]"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                        <option value="En preparación">En preparación</option>
                        <option value="En camino">En camino</option>
                        <option value="Entregado">Entregado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#292725]">
                    <div>
                      <span className="text-[10px] uppercase text-[#A99B8B] block font-semibold">Envío a</span>
                      <p>{o.shippingAddress?.street}, {o.shippingAddress?.city}, {o.shippingAddress?.state}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#A99B8B] block font-semibold">Guía Paquetería</span>
                      <p className="font-bold">{o.trackingNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#A99B8B] block font-semibold">Monto Total</span>
                      <p className="font-bold text-base text-[#B99663]">${o.total.toLocaleString('es-MX')} MXN</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INVENTARIO */}
        {activeTab === 'inventario' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-editorial text-2xl text-[#292725]">Control de Stock e Inventario</h2>
            <div className="bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="p-4 bg-white border border-[#DCCFBD] flex items-center justify-between">
                    <div>
                      <h4 className="font-editorial text-sm font-semibold text-[#292725]">{p.name}</h4>
                      <p className="text-[11px] text-[#A99B8B]">Categoría: {p.categoryName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          updateProduct(p.id, { stockCount: Math.max(0, p.stockCount - 1) });
                          toast(`Stock de ${p.name} actualizado`, { type: 'info' });
                        }}
                        className="w-7 h-7 bg-[#ECE5DC] text-[#292725] font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-xs">{p.stockCount}</span>
                      <button
                        onClick={() => {
                          updateProduct(p.id, { stockCount: p.stockCount + 1 });
                          toast(`Stock de ${p.name} actualizado`, { type: 'info' });
                        }}
                        className="w-7 h-7 bg-[#ECE5DC] text-[#292725] font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUPONES */}
        {activeTab === 'cupones' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-editorial text-2xl text-[#292725]">Cupones de Descuento Activos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { code: 'LAURA10', desc: '10% de descuento directo en cualquier compra', active: true },
                { code: 'BIENVENIDA15', desc: '15% de descuento en compras superiores a $999 MXN', active: true },
                { code: 'ENVIOGRATIS', desc: 'Envío estándar sin costo para pedidos especiales', active: true }
              ].map((c) => (
                <div key={c.code} className="p-6 bg-[#F7F2EA] border border-[#B99663]/50 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-[#292725] tracking-widest">{c.code}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800">Activo</span>
                  </div>
                  <p className="text-xs text-[#A99B8B]">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: RESEÑAS */}
        {activeTab === 'resenas' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-editorial text-2xl text-[#292725]">Reseñas de Clientas Verificadas</h2>
            <div className="space-y-4">
              {[
                { name: 'Mariana R.', prod: 'Vestido Aura', rating: 5, comment: 'Me encantó la caída de la tela de lino. Se ve carísimo.' },
                { name: 'Fernanda G.', prod: 'Pantalón Siena', rating: 5, comment: 'Corte sastre perfecto para oficina y eventos.' },
                { name: 'Alejandra M.', prod: 'Set Laura', rating: 5, comment: 'Súper cómodo y el color carbón es elegantísimo.' }
              ].map((r, i) => (
                <div key={i} className="p-4 bg-[#F7F2EA] border border-[#DCCFBD] flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong>{r.name}</strong>
                      <span className="text-[#A99B8B]">sobre {r.prod}</span>
                    </div>
                    <p className="text-[#292725] mt-1">&ldquo;{r.comment}&rdquo;</p>
                  </div>
                  <span className="text-[#B99663] font-bold">★★★★★ (5.0)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CONFIGURACION */}
        {activeTab === 'configuracion' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-editorial text-2xl text-[#292725]">Configuración de Tienda</h2>
            <div className="max-w-xl bg-[#F7F2EA] p-6 border border-[#DCCFBD] space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Nombre Comercial de la Tienda</label>
                <input type="text" defaultValue="Laura Boutique" className="w-full p-2 bg-white border border-[#DCCFBD]" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Umbral de Envío Gratis (MXN)</label>
                <input type="number" defaultValue={1499} className="w-full p-2 bg-white border border-[#DCCFBD]" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Costo de Envío Estándar (MXN)</label>
                <input type="number" defaultValue={149} className="w-full p-2 bg-white border border-[#DCCFBD]" />
              </div>
              <button type="button" onClick={() => toast('Configuración guardada exitosamente.', { type: 'success' })} className="btn-editorial-primary">
                Guardar Configuración
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Add New Product */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowAddProductModal(false)} className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs" />
          <div className="relative bg-[#FDFBF7] max-w-md w-full p-6 border border-[#DCCFBD] shadow-2xl z-10 space-y-4">
            <h3 className="font-editorial text-2xl text-[#292725]">Agregar Nueva Prenda</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Nombre de la Prenda *</label>
                <input type="text" required placeholder="Ej. Vestido Carmen" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="w-full p-2 bg-white border border-[#DCCFBD]" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Categoría</label>
                <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} className="w-full p-2 bg-white border border-[#DCCFBD]">
                  <option value="vestidos">Vestidos</option>
                  <option value="blusas">Blusas</option>
                  <option value="pantalones">Pantalones</option>
                  <option value="sets">Sets</option>
                  <option value="accesorios">Accesorios</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Precio (MXN) *</label>
                  <input type="number" required value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="w-full p-2 bg-white border border-[#DCCFBD]" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Stock Inicial *</label>
                  <input type="number" required value={newProdStock} onChange={(e) => setNewProdStock(e.target.value)} className="w-full p-2 bg-white border border-[#DCCFBD]" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Badge Promocional</label>
                <select value={newProdBadge} onChange={(e) => setNewProdBadge(e.target.value)} className="w-full p-2 bg-white border border-[#DCCFBD]">
                  <option value="NUEVO">NUEVO</option>
                  <option value="BEST SELLER">BEST SELLER</option>
                  <option value="ÚLTIMAS PIEZAS">ÚLTIMAS PIEZAS</option>
                  <option value="SALE">SALE</option>
                </select>
              </div>
              <div className="pt-2 flex gap-2">
                <button type="submit" className="btn-editorial-primary flex-1">Crear Prenda</button>
                <button type="button" onClick={() => setShowAddProductModal(false)} className="btn-editorial-secondary">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
