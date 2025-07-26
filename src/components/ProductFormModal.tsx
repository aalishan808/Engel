'use client';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormData, productSchema } from '@/schemas/productSchema';
import { useEffect } from 'react';
import Image from 'next/image';

interface ProductFormModalProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: ProductFormData;
}

const categories = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Books', value: 'Books' },
  { label: 'Clothing', value: 'Clothing' },
];

export default function ProductFormModal({
  visible,
  onHide,
  onSubmit,
  defaultValues,
}: ProductFormModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog header="Product Form" visible={visible} onHide={onHide} modal style={{ width: '30rem' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-4">
        <span className="p-float-label">
          <InputText id="name" {...register('name')} className={errors.name && 'p-invalid'} />
          <label htmlFor="name">Product Name</label>
        </span>
        <small className="text-red-500">{errors.name?.message}</small>

        <span className="p-float-label">
          <InputText id="description" {...register('description')} className={errors.description && 'p-invalid'} />
          <label htmlFor="description">Description</label>
        </span>
        <small className="text-red-500">{errors.description?.message}</small>

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <span className="p-float-label">
              <InputNumber
                id="price"
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                className={errors.price && 'p-invalid'}
                min={0}
              />
              <label htmlFor="price">Price</label>
            </span>
          )}
        />
        <small className="text-red-500">{errors.price?.message}</small>

        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <span className="p-float-label">
              <InputNumber
                id="stock"
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                className={errors.stock && 'p-invalid'}
                min={0}
              />
              <label htmlFor="stock">Stock</label>
            </span>
          )}
        />
        <small className="text-red-500">{errors.stock?.message}</small>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Dropdown
              id="category"
              options={categories}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              placeholder="Select Category"
              className={errors.category && 'p-invalid'}
            />
          )}
        />
        <small className="text-red-500">{errors.category?.message}</small>

        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <>
              {field.value && <Image src={field.value} alt="Product" width={100} height={100} className="mb-2" />}
              <FileUpload
                accept="image/*"
                mode="basic"
                auto
                customUpload
                uploadHandler={(e) => {
                  const file = e.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => field.onChange(reader.result as string);
                  reader.readAsDataURL(file);
                }}
              />
            </>
          )}
        />
        <small className="text-red-500">{errors.imageUrl?.message}</small>

        <Button type="submit" label="Submit" className="mt-3" />
      </form>
    </Dialog>
  );
}
