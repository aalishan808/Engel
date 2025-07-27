'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload, FileUploadHandlerEvent, FileUpload as FileUploadType } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormData, productSchema } from '@/schemas/productSchema';
import Image from 'next/image';

interface ProductFormModalProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (data: ProductFormData) => void;
  defaultValues?: ProductFormData;
  loading?: boolean;
}

const categories = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Books', value: 'Books' },
  { label: 'Clothing', value: 'Clothing' },
];

const statusOptions = [
  { label: 'In Stock', value: 'In Stock' },
  { label: 'Out of Stock', value: 'Out of Stock' },
  { label: 'Limited', value: 'Limited' },
];

export default function ProductFormModal({
  visible,
  onHide,
  onSubmit,
  defaultValues,
  loading = false,
}: ProductFormModalProps) {
  const toast = useRef<Toast>(null);
  const fileUploadRef = useRef<FileUploadType>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      imageUrl: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (visible) {
      reset({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        imageUrl: '',
        ...defaultValues,
      });
      
      if (defaultValues?.imageUrl) {
        setImagePreview(defaultValues.imageUrl);
      } else {
        setImagePreview(null);
      }
    }
  }, [defaultValues, reset, visible]);

  const handleUpload = async (event: FileUploadHandlerEvent) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const file = event.files[0];
      if (!file) {
        throw new Error('No file selected');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 10, 90);
          return newProgress;
        });
      }, 200);

      // Process the file
      const reader = new FileReader();
      reader.onload = (e) => {
        clearInterval(interval);
        setUploadProgress(100);
        
        const result = e.target?.result as string;
        setImagePreview(result);
        setValue('imageUrl', result, { shouldDirty: true });
        
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Image uploaded successfully',
            life: 3000,
          });
        }, 500);
      };
      reader.onerror = () => {
        clearInterval(interval);
        throw new Error('Failed to read file');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error instanceof Error ? error.message : 'Failed to upload image',
        life: 3000,
      });
      if (fileUploadRef.current) {
        fileUploadRef.current.clear();
      }
    } finally {
      event.options.clear();
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('imageUrl', '', { shouldDirty: true });
    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  const onSubmitHandler = (data: ProductFormData) => {
    onSubmit(data);
    reset();
    setImagePreview(null);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {defaultValues ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-sm text-gray-500">
            {defaultValues ? 'Update product details' : 'Fill in the form to add a new product'}
          </p>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="flex justify-end gap-3">
        <Button 
          label="Cancel" 
          icon="pi pi-times" 
          onClick={onHide} 
          className="p-button-text border border-gray-300 hover:bg-gray-50"
          disabled={isSubmitting || loading}
          severity="secondary"
        />
        <Button 
          label={defaultValues ? 'Update Product' : 'Create Product'} 
          icon="pi pi-check" 
          type="submit"
          onClick={handleSubmit(onSubmitHandler)} 
          loading={isSubmitting || loading}
          className="shadow-md hover:shadow-lg transition-shadow"
          severity="success"
        />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      
      <Dialog 
        header={renderHeader} 
        footer={renderFooter}
        visible={visible} 
        onHide={onHide}
        modal 
        dismissableMask
        style={{ width: '750px' }}
        breakpoints={{ '960px': '75vw', '640px': '90vw' }}
        className="product-form-modal"
        contentClassName="p-0"
      >
        <div className="p-6">
          <form className="p-fluid space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Information */}
              <div className="space-y-5">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Basic Information
                  </h3>
                  
                  <div className="field">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <InputText
                      id="name"
                      {...register('name')}
                      className={`w-full ${errors.name ? 'p-invalid border-red-300' : 'border-gray-300'}`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <small className="p-error block mt-2 text-red-500 text-sm">{errors.name.message}</small>
                    )}
                  </div>
                  
                  <div className="field mt-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id="category"
                          value={field.value}
                          options={categories}
                          onChange={(e) => field.onChange(e.value)}
                          placeholder="Select Category"
                          className={`w-full ${errors.category ? 'p-invalid border-red-300' : 'border-gray-300'}`}
                        />
                      )}
                    />
                    {errors.category && (
                      <small className="p-error block mt-2 text-red-500 text-sm">{errors.category.message}</small>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="field">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <InputNumber
                            id="price"
                            inputRef={field.ref}
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                            mode="currency"
                            currency="USD"
                            locale="en-US"
                            className={`w-full ${errors.price ? 'p-invalid border-red-300' : 'border-gray-300'}`}
                            placeholder="0.00"
                            min={0}
                          />
                        )}
                      />
                      {errors.price && (
                        <small className="p-error block mt-2 text-red-500 text-sm">{errors.price.message}</small>
                      )}
                    </div>
                    
                    <div className="field">
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="stock"
                        control={control}
                        render={({ field }) => (
                          <InputNumber
                            id="stock"
                            inputRef={field.ref}
                            value={field.value}
                            onValueChange={(e) => field.onChange(e.value)}
                            className={`w-full ${errors.stock ? 'p-invalid border-red-300' : 'border-gray-300'}`}
                            placeholder="0"
                            min={0}
                          />
                        )}
                      />
                      {errors.stock && (
                        <small className="p-error block mt-2 text-red-500 text-sm">{errors.stock.message}</small>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">
                    Description
                  </h3>
                  
                  <div className="field">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Product Description <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <InputTextarea
                          id="description"
                          {...field}
                          rows={5}
                          className={`w-full ${errors.description ? 'p-invalid border-red-300' : 'border-gray-300'}`}
                          placeholder="Detailed product description..."
                        />
                      )}
                    />
                    {errors.description && (
                      <small className="p-error block mt-2 text-red-500 text-sm">{errors.description.message}</small>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Image Upload and Status */}
              <div className="space-y-5">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    Product Image
                  </h3>
                  
                  <div className="field">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <FileUpload
                          ref={fileUploadRef}
                          mode="basic"
                          name="productImage"
                          accept="image/*"
                          maxFileSize={1000000}
                          customUpload={true}
                          chooseLabel="Upload Photo"
                          uploadHandler={handleUpload}
                          className={`${errors.imageUrl ? 'p-invalid' : ''}`}
                          disabled={isUploading}
                        />
                      </div>
                      
                      {imagePreview && (
                        <div className="relative">
                          <div className="h-10 w-10 rounded overflow-hidden border border-gray-200">
                            <Image 
                              src={imagePreview} 
                              alt="Preview" 
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <Button 
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger p-button-sm absolute -top-2 -right-2"
                            onClick={removeImage}
                            type="button"
                            aria-label="Remove image"
                            disabled={isUploading}
                          />
                        </div>
                      )}
                    </div>
                    
                    {isUploading && (
                      <div className="mt-2">
                        <div className="h-1 w-full bg-gray-200 rounded">
                          <div 
                            className="h-full bg-blue-500 rounded" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <small className="text-xs text-gray-500">
                          Uploading: {uploadProgress}%
                        </small>
                      </div>
                    )}
                    
                    {errors.imageUrl && (
                      <small className="p-error block mt-2 text-red-500 text-sm">{errors.imageUrl.message}</small>
                    )}
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">
                    Inventory Status
                  </h3>
                  
                  <div className="field">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Availability Status
                    </label>
                    <Controller
                      name="stock"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          id="status"
                          value={field.value}
                          options={statusOptions}
                          onChange={(e) => field.onChange(e.value)}
                          placeholder="Select Status"
                          className="w-full border-gray-300"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          
          {isDirty && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6 flex items-start gap-3">
              <i className="pi pi-info-circle text-blue-500 mt-0.5"></i>
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">Unsaved Changes</h4>
                <p className="text-sm text-blue-600">
                  You have unsaved changes. Make sure to save before leaving this page.
                </p>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}