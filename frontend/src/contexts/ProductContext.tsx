'use client'

import { createContext, useState } from 'react'

type ProductProviderProps = {
  children: React.ReactNode
}

type RakutenProduct = {
  itemCode: string
  itemName: string
  itemCaption: string
  itemPrice: number
  mediumImageUrls: string
  itemUrl: string
}

type Form = {
  image: File | null
  content: string
  category: string
  products: RakutenProduct[]
}

type ProductContextType = {
  formData: Form
  setField: (key: string, value: File | string) => void
  addProducts: (product: RakutenProduct[]) => void
  deleteProduct: (itemCode: string) => void
  resetFormData: () => void
}

const ProductContext = createContext<ProductContextType>({
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

const ProductProvider = ({ children }: ProductProviderProps) => {
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

  const addProducts = (products: RakutenProduct[]) => {
    setFormData((prev) => ({
      ...prev,
      products: [...products],
    }))
  }

  const deleteProduct = (itemCode: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter(
        (currentProduct) => currentProduct.itemCode !== itemCode,
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
    <ProductContext.Provider
      value={{ formData, setField, addProducts, deleteProduct, resetFormData }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export type { RakutenProduct, Form }
export { ProductContext, ProductProvider }
