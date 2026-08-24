import React from 'react';
import { Truck, RefreshCw, ShieldCheck, FileText } from 'lucide-react';

export default function PoliticasPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10 md:py-16 border-b border-[#DCCFBD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B99663] font-semibold block mb-1">
            Información Legal & Políticas
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#292725] font-normal">
            POLÍTICAS DE LAURA BOUTIQUE
          </h1>
          <p className="text-xs sm:text-sm text-[#A99B8B] mt-1 font-light">
            Transparencia y claridad en cada paso de tu experiencia de compra.
          </p>
        </div>

        {/* Section 1: Envíos */}
        <section id="envios" className="p-8 bg-[#F7F2EA] border border-[#DCCFBD] space-y-3">
          <div className="flex items-center gap-2.5 text-[#292725]">
            <Truck className="w-5 h-5 text-[#B99663]" />
            <h2 className="font-editorial text-2xl">Políticas de Envíos a todo México</h2>
          </div>
          <div className="text-xs text-[#292725]/80 space-y-2 leading-relaxed">
            <p>• <strong>Cobertura:</strong> Enviamos a todos los estados de la República Mexicana mediante convenios con DHL Express y Estafeta.</p>
            <p>• <strong>Tiempos de entrega:</strong> Los pedidos se preparan y despachan en 24 a 48 horas hábiles. El tiempo promedio de tránsito es de 2 a 4 días hábiles.</p>
            <p>• <strong>Envío Gratis:</strong> Aplicable de manera automática en todas las compras a partir de $1,499 MXN.</p>
            <p>• <strong>Rastreo:</strong> Al despacharse tu paquete, recibirás vía correo electrónico y/o WhatsApp tu número de guía oficial para seguimiento en tiempo real.</p>
          </div>
        </section>

        {/* Section 2: Cambios y Devoluciones */}
        <section id="cambios" className="p-8 bg-[#F7F2EA] border border-[#DCCFBD] space-y-3">
          <div className="flex items-center gap-2.5 text-[#292725]">
            <RefreshCw className="w-5 h-5 text-[#B99663]" />
            <h2 className="font-editorial text-2xl">Cambios y Devoluciones</h2>
          </div>
          <div className="text-xs text-[#292725]/80 space-y-2 leading-relaxed">
            <p>• <strong>Plazo de solicitud:</strong> Tienes hasta 30 días naturales a partir de la entrega para solicitar un cambio de talla o modelo.</p>
            <p>• <strong>Condiciones de la prenda:</strong> Las piezas deben estar nuevas, sin usar, sin lavar, sin olores y con sus etiquetas y empaques originales intactos.</p>
            <p>• <strong>Proceso:</strong> Escríbenos a nuestro WhatsApp o a <em>pedidos@lauraboutique.mx</em> con tu número de orden para proporcionarte la guía de retorno.</p>
          </div>
        </section>

        {/* Section 3: Aviso de Privacidad */}
        <section id="privacidad" className="p-8 bg-[#F7F2EA] border border-[#DCCFBD] space-y-3">
          <div className="flex items-center gap-2.5 text-[#292725]">
            <ShieldCheck className="w-5 h-5 text-[#B99663]" />
            <h2 className="font-editorial text-2xl">Aviso de Privacidad</h2>
          </div>
          <div className="text-xs text-[#292725]/80 space-y-2 leading-relaxed">
            <p>En Laura Boutique respetamos tu privacidad. Tus datos personales (nombre, dirección, teléfono y correo) son utilizados estrictamente para procesar tus compras, emitir comprobantes y coordinar la entrega de tus paquetes.</p>
            <p>No compartimos ni comercializamos tu información con terceros no autorizados. Los pagos son procesados directamente por pasarelas seguras certificadas PCI-DSS.</p>
          </div>
        </section>

        {/* Section 4: Términos y Condiciones */}
        <section id="terminos" className="p-8 bg-[#F7F2EA] border border-[#DCCFBD] space-y-3">
          <div className="flex items-center gap-2.5 text-[#292725]">
            <FileText className="w-5 h-5 text-[#B99663]" />
            <h2 className="font-editorial text-2xl">Términos y Condiciones</h2>
          </div>
          <div className="text-xs text-[#292725]/80 space-y-2 leading-relaxed">
            <p>Todos los precios mostrados en nuestro portal web están expresados en Moneda Nacional Mexicana (MXN) e incluyen IVA. Las promociones y cupones de descuento no son acumulables a menos que se indique explícitamente.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
