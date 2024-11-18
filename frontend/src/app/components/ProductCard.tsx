import { Card, CardContent, Typography, Box } from '@mui/material'
import Image from 'next/image'
import { useContext } from 'react'
import { FormContext } from '@/contexts/FormContext'

type ProductCardProps = {
  id: string
  name: string
  price: number
  image: string
  selected: boolean
  deletable: boolean
}

const ProductCard = (props: ProductCardProps) => {
  const { deleteProduct } = useContext(FormContext)

  return (
    <>
      <Card
        sx={{
          border: props.selected
            ? '1.6px #1E90FF solid'
            : '1.6px #D9D9D9 solid',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: 125 }}>
          <Image
            src={props.image}
            alt={props.name}
            fill
            style={{ width: '100%', height: '100%' }}
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Box>
        <CardContent sx={{ height: 75, pt: 1 }}>
          <Typography
            sx={{
              color: 'black',
              fontSize: 10.5,
              fontWeight: 'medium',
              mb: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {props.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              sx={{ color: 'red', fontSize: 12.5, fontWeight: 'bold' }}
            >
              {props.price}円
            </Typography>
            {props.deletable && (
              <Typography
                sx={{
                  color: '#1E90FF',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
                onClick={() => deleteProduct(props.id)}
              >
                削除
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ProductCard
