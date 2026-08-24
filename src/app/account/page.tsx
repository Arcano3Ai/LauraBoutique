'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, LogOut, ChevronRight, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';

export default function AccountPage() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const orders = useStore((state) => state.orders);
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'pedidos' | 'direcciones' | 'perfil'>('pedidos');

  const handleLogout = () => {
    logout();
    toast('Has cerrado sesión correctamente.', { type: 'info' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Entregado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'En camino':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'En preparación':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-[#F7F2EA] text-[#292725] border-[#DCCFBD]';
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#DCCFBD]/70 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
              Área de Clienta
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
              MI CUENTA
            </h1>
            <p className="text-xs text-[#A99B8B] mt-1">
              Bienvenida, <strong className="text-[#292725]">{user?.name || 'Clienta Laura Boutique'}</strong> ({user?.email || 'laura@ejemplo.com'})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold uppercase tracking-wider text-[#B99663] bg-[#B99663]/10 px-3 py-2 border border-[#B99663]/30 hover:bg-[#B99663] hover:text-white transition-all"
            >
              Ir al Panel Administrador
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-wider text-[#A99B8B] hover:text-[#C48B71] flex items-center gap-1.5 p-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Nav (3 cols) */}
          <div className="lg:col-span-3 bg-[#F7F2EA] p-4 border border-[#DCCFBD] space-y-1">
            <button
              onClick={() => setActiveTab('pedidos')}
              className={`w-full p-3 text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all ${
                activeTab === 'pedidos'
                  ? 'bg-[#292725] text-white'
                  : 'text-[#292725] hover:bg-[#ECE5DC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Mis Pedidos ({orders.length})</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('direcciones')}
              className={`w-full p-3 text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all ${
                activeTab === 'direcciones'
                  ? 'bg-[#292725] text-white'
                  : 'text-[#292725] hover:bg-[#ECE5DC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Direcciones Guardadas</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('perfil')}
              className={`w-full p-3 text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-all ${
                activeTab === 'perfil'
                  ? 'bg-[#292725] text-white'
                  : 'text-[#292725] hover:bg-[#ECE5DC]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Datos Personales</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Main Tab Content (9 cols) */}
          <div className="lg:col-span-9 bg-[#F7F2EA] p-6 sm:p-8 border border-[#DCCFBD]">
            
            {/* Tab: PEDIDOS */}
            {activeTab === 'pedidos' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-[#292725]">Historial de Pedidos</h3>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xs text-[#A99B8B] mb-4">Aún no has realizado pedidos.</p>
                    <Link href="/shop" className="btn-editorial-primary">Comenzar a Comprar</Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => (
                      <div key={ord.id} className="bg-white border border-[#DCCFBD] p-6 space-y-4 shadow-xs">
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DCCFBD]/60 gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#A99B8B] block">Número de Pedido</span>
                            <span className="font-editorial text-lg font-bold text-[#292725]">{ord.orderNumber}</span>
                            <span className="text-xs text-[#A99B8B] block">Fecha: {ord.date}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`text-xs font-semibold px-3 py-1 border rounded-none ${getStatusBadge(ord.status)}`}>
                              {ord.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Tracking */}
                        <div className="p-3 bg-[#F7F2EA] border border-[#DCCFBD]/60 text-xs text-[#292725] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-[#B99663]" />
                            <span>Guía de rastreo: <strong>{ord.trackingNumber}</strong></span>
                          </div>
                          <span className="text-[11px] text-[#A99B8B]">Paquetería: DHL Express México</span>
                        </div>

                        {/* Items in order */}
                        <div className="divide-y divide-[#DCCFBD]/40">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                              <div className="flex items-center gap-3">
                                <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-14 object-cover bg-[#ECE5DC] border border-[#DCCFBD]" />
                                <div>
                                  <p className="font-editorial text-sm font-semibold text-[#292725]">{item.product.name}</p>
                                  <p className="text-[#A99B8B] text-[11px]">Talla: {item.selectedSize} • Color: {item.selectedColor.name} • Cantidad: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-bold text-[#292725]">
                                ${(item.product.price * item.quantity).toLocaleString('es-MX')} MXN
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Total Footer */}
                        <div className="pt-3 border-t border-[#DCCFBD]/60 flex items-center justify-between text-xs">
                          <span className="text-[#A99B8B]">Método de pago: <strong>{ord.paymentMethod}</strong></span>
                          <span className="text-base font-bold text-[#292725]">
                            Total: ${ord.total.toLocaleString('es-MX')} MXN
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: DIRECCIONES */}
            {activeTab === 'direcciones' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-[#292725]">Direcciones de Envío Guardadas</h3>
                <div className="p-5 bg-white border border-[#DCCFBD] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">Dirección Principal (Casa)</span>
                    <span className="text-[10px] text-[#B99663] bg-[#B99663]/10 px-2 py-0.5 font-bold uppercase">Predeterminada</span>
                  </div>
                  <p className="text-xs text-[#292725]">Campos Elíseos 204, Int. 5B</p>
                  <p className="text-xs text-[#A99B8B]">Polanco, Miguel Hidalgo, Ciudad de México, C.P. 11560</p>
                  <p className="text-xs text-[#A99B8B]">Tel: 55 4321 8765</p>
                </div>
              </div>
            )}

            {/* Tab: PERFIL */}
            {activeTab === 'perfil' && (
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-[#292725]">Datos de la Cuenta</h3>
                <div className="space-y-4 max-w-md text-xs">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-[#A99B8B] block mb-1">Nombre Completo</label>
                    <input type="text" defaultValue={user?.name || 'Laura Méndez'} className="w-full p-2.5 bg-white border border-[#DCCFBD] text-[#292725]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-[#A99B8B] block mb-1">Correo Electrónico</label>
                    <input type="email" defaultValue={user?.email || 'laura.mendez@ejemplo.com'} className="w-full p-2.5 bg-white border border-[#DCCFBD] text-[#292725]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-[#A99B8B] block mb-1">Teléfono</label>
                    <input type="tel" defaultValue={user?.phone || '55 4321 8765'} className="w-full p-2.5 bg-white border border-[#DCCFBD] text-[#292725]" />
                  </div>
                  <button type="button" onClick={() => toast('Datos actualizados correctamente.', { type: 'success' })} className="btn-editorial-primary mt-2">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
