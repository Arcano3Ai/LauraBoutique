---
name: ecommerce-luxury-architecture
description: Directrices y estándares de arquitectura, diseño editorial de alta costura, microinteracciones y rendimiento para e-commerce de moda femenina de lujo accesible (My Boutique More).
---

# E-Commerce Luxury Architecture & Aesthetics Skill

## 1. Principios de Diseño Editorial de Moda
- **Tipografía Editorial**: Utilizar combinaciones refinadas de fuentes Serif (`Playfair Display` / `Cormorant Garamond`) para títulos y titulares, con espaciado generoso de letras (`tracking-widest` / `tracking-[0.2em]`) y toques en cursiva suave para términos clave.
- **Paleta de Colores de Boutique Contemporánea**:
  - `Cream / Ivory`: `#F8F5F0` y `#F7F2EA` (Fondo cálido y luminoso).
  - `Charcoal Obsidiana`: `#1C1A18` y `#121110` (Contraste de alto impacto).
  - `Soft Gold Satinado`: `#B99663` y `#D4AF77` (Insignias, acentos y llamadas a la acción).
  - `Beige & Taupe`: `#DCCFBD` y `#A99B8B` (Separadores y jerarquía secundaria).
- **Tratamiento de Fotografía**:
  - Proporciones estilizadas 3:4 y 4:5.
  - Efecto *cross-fade* o cambio a segunda toma en *hover*.
  - Medallón oficial de la marca en alta resolución con marco de oro cepillado.

## 2. Experiencia de Compra & Conversión
- **Barra de Progreso de Envío Gratis**: Visibilidad en Drawer de Carrito y Carrito completo hacia el umbral de $1,499 MXN.
- **Selector Express de Tallas**: Botones de talla directos en cards con *micro-feedback* al agregar.
- **Guía de Tallas Interactiva**: Medidas anatómicas en centímetros con consejos de ajuste según el corte (lino, viscosa, sastre).
- **Checkout Seguro en 2 Pasos**: Soporte nativo para métodos de pago mexicanos (Tarjeta, Mercado Pago, PayPal, OXXO Pay).

## 3. Calidad de Código & Estado
- Estado centralizado y persistente con **Zustand** (`localStorage`).
- Componentes modulares y reutilizables en TypeScript estricto.
- Optimización SEO completa (OpenGraph, títulos descriptivos, meta tags y JSON-LD de producto).
