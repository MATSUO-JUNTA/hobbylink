'use client'

import { createContext, useState } from 'react'

type FormProviderProps = {
  children: React.ReactNode
}

type Product = {
  id: string
  name: string
  details: string
  price: number
  image: string
  productUrl: string
}

type Form = {
  image: File | null
  content: string
  category: string
  products: Product[]
}

type FormContextType = {
  formData: Form
  setField: (key: string, value: File | string) => void
  addProducts: (product: Product[]) => void
  deleteProduct: (id: string) => void
  resetFormData: () => void
}

const FormContext = createContext<FormContextType>({
  formData: {
    image: null,
    content: '',
    category: '',
    products: [],
  },
  setField: () => {},
  addProducts: () => {},
  deleteProduct: () => {},
  resetFormData: () => {},
})

const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<Form>({
    image: null,
    content: '',
    category: '',
    products: [],
  })

  const setField = (key: string, value: File | string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const addProducts = (products: Product[]) => {
    setFormData((prev) => ({
      ...prev,
      products: [...products],
    }))
  }

  const deleteProduct = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter(
        (currentProduct) => currentProduct.id !== id,
      ),
    }))
  }

  const resetFormData = () => {
    setFormData({
      image: null,
      content: '',
      category: '',
      products: [],
    })
  }
  return (
    <FormContext.Provider
      value={{ formData, setField, addProducts, deleteProduct, resetFormData }}
    >
      {children}
    </FormContext.Provider>
  )
}

export type { Product, Form }
export { FormContext, FormProvider }
