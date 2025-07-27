import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/config';
import { Product } from '@/models/product';

const productsCol = collection(db, 'products');

export const onProductsSnapshot = (cb: (data: Product[]) => void) => {
  const q = query(productsCol, orderBy('name'));
  return onSnapshot(q, snapshot =>
cb(snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) })))
  );
};

export const addProduct = async (prod: Omit<Product, 'id'>, file?: File) => {
  let imageUrl = prod.imageUrl;
  if (file) {
    const stRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const snap = await uploadBytes(stRef, file);
    imageUrl = await getDownloadURL(snap.ref);
  }
  await addDoc(productsCol, { ...prod, imageUrl });
};

export const updateProduct = async (id: string, prod: Omit<Product, 'id'>, file?: File) => {
  let imageUrl = prod.imageUrl;
  if (file) {
    const stRef = ref(storage, `products/${Date.now()}_${file.name}`);
    const snap = await uploadBytes(stRef, file);
    imageUrl = await getDownloadURL(snap.ref);
  }
  await updateDoc(doc(productsCol, id), { ...prod, imageUrl });
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(productsCol, id));
};
