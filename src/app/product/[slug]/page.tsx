import React from 'react';
import { PRODUCTS_DATA } from '@/data/mockData';
import { ProductDetailView } from '@/components/product/ProductDetailView';

export function generateStaticParams() {
  return PRODUCTS_DATA.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailView slug={slug} />;
}
