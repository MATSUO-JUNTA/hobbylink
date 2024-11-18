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
  isFormReady: boolean
  setIsFormReady: (isFormReady: boolean) => void
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
  isFormReady: false,
  setIsFormReady: () => {},
})

const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<Form>({
    image: null,
    content: '',
    category: '',
    products: [],
  })
  const [isFormReady, setIsFormReady] = useState<boolean>(false)

  // フィールドの値を設定
  const setField = (key: string, value: File | string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // 商品を追加
  const addProducts = (products: Product[]) => {
    setFormData((prev) => ({
      ...prev,
      products: [...products],
    }))
  }

  // 商品を削除
  const deleteProduct = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter(
        (currentProduct) => currentProduct.id !== id,
      ),
    }))
  }

  // フォームをリセット
  const resetFormData = () => {
    setFormData({
      image: null,
      content: '',
      category: '',
      products: [],
    })
    setIsFormReady(false)
  }
  return (
    <FormContext.Provider
      value={{
        formData,
        isFormReady,
        setField,
        addProducts,
        deleteProduct,
        resetFormData,
        setIsFormReady,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export type { Product, Form }
export { FormContext, FormProvider }
