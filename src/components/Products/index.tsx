import { Button, Rating, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import type { Product as ProductType } from "src/types/entities/product";
import { useAppDispatch, useAppSelector } from "@common/hooks/redux";
import { addProductsCart } from "@store/actions/productsCart";

import * as Styled from "./Product.styled";

type ProductProps = {
  product: ProductType;
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const { productsCart } = useAppSelector((state) => state.productsCart);
  const dispatch = useAppDispatch();
  const isPurchasedProduct = !!productsCart.find((el) => el.id === product.id);

  return (
    <Styled.Container>
      <Styled.Image
        src={product.image}
        alt={product.title}
        width={0}
        height={0}
        sizes="100vw"
        priority
      />
      <Styled.Info>
        <Typography variant="h1" fontSize="28px">
          {product.title}
        </Typography>
        <span>{product.category}</span>
        <Typography variant="body1"> {product.description}</Typography>
        <Styled.Price>
          <Styled.Rating>
            <Rating precision={0.5} value={product.rating.rate} readOnly />
            <span>({product.rating.count})</span>
          </Styled.Rating>
          <span style={{ fontWeight: 700, fontSize: "22px" }}>
            $ {product.price}
          </span>
        </Styled.Price>
        <Button
          variant="text"
          onClick={() => dispatch(addProductsCart(product.id))}
          disabled={isPurchasedProduct}
          sx={{ gap: "8px", alignItems: "center", marginLeft: "auto" }}
        >
          {isPurchasedProduct ? (
            <>
              In cart <CheckCircleOutlineIcon />
            </>
          ) : (
            <>
              Add to cart
              <ShoppingCartOutlinedIcon />
            </>
          )}
        </Button>
      </Styled.Info>
    </Styled.Container>
  );
};

export default Product;