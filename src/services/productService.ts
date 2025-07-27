import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '@/models/product';

const productRef = collection(db, 'products');

export const addProduct = async (product: Product) => {
  return await addDoc(productRef, product);
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  return await updateDoc(doc(productRef, id), product);
};

export const deleteProduct = async (id: string) => {
  return await deleteDoc(doc(productRef, id));
};

export const onProductsSnapshot = (callback: (data: Product[]) => void) => {
  const q = query(productRef, orderBy('name'));
  return onSnapshot(q, (snapshot) =>
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) })))
  );
};

export const saveProduct = async (id: string, product: Product) => {
  if (id) {
    return updateProduct(id, product);
  } else {
    return addProduct(product);
  }
};
