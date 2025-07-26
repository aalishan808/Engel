'use client';

import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ProductFormModal from './ProductFormModal';
import { ProductFormData } from '@/schemas/productSchema';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Image from 'next/image';

export default function ProductTable() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFormData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
const fetched: ProductFormData[] = snapshot.docs.map((doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    category: data.category,
    imageUrl: data.imageUrl,
  };
});
    setProducts(fetched);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrEdit = async (data: ProductFormData) => {
    if (editingId) {
      await updateDoc(doc(db, 'products', editingId), data);
    } else {
      await addDoc(collection(db, 'products'), data);
    }
    setModalVisible(false);
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (row: ProductFormData & { id: string }) => {
    setSelectedProduct(row);
    setEditingId(row.id);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  const imageBodyTemplate = (rowData: ProductFormData) => (
    <Image src={rowData.imageUrl} alt={rowData.name} width={60} height={60} />
  );

const actionBodyTemplate = (rowData: ProductFormData & { id: string }) => ( // Correctly type rowData
  <div className="flex gap-2">
    <Button icon="pi pi-pencil" rounded onClick={() => handleEdit(rowData)} />
    <Button icon="pi pi-trash" severity="danger" rounded onClick={() => handleDelete(rowData.id)} />
  </div>
);
  return (
    <div className="card">
      <div className="flex justify-between mb-3">
        <h3 className="text-xl font-semibold">Product List</h3>
        <Button label="Add Product" icon="pi pi-plus" onClick={() => { setSelectedProduct(null); setModalVisible(true); }} />
      </div>

      <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} filterDisplay="row" responsiveLayout="scroll">
        <Column field="name" header="Name" filter filterPlaceholder="Search by name" />
        <Column field="description" header="Description" filter filterPlaceholder="Search by description" />
        <Column field="price" header="Price" />
        <Column field="stock" header="Stock" />
        <Column field="category" header="Category" />
        <Column header="Image" body={imageBodyTemplate} />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>

      <ProductFormModal
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        onSubmit={handleAddOrEdit}
        defaultValues={selectedProduct || undefined}
      />
    </div>
  );
}
