import { gql } from "@urql/next";

export const CREATE_CART = gql`
  query GetCartDetails($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalItems
    }
  }
`;

export const GET_CART_DETAILS = gql`
  query GetCartDetails($cartId: ID!) {
    cart(id: $cartId) {
      id
      items {
        id
        name
        quantity
        lineTotal {
          amount
          currency {
            code
            symbol
            decimalDigits
            decimalSeparator
          }
          formatted
        }
        unitTotal {
          amount
          currency {
            code
            symbol
            decimalDigits
            decimalSeparator
          }
          formatted
        }
        __typename
      }
      totalItems
      subTotal {
        amount
        currency {
          code
          symbol
          decimalDigits
          decimalSeparator
        }
        formatted
      }
      taxTotal {
        amount
        currency {
          code
          symbol
          decimalDigits
          decimalSeparator
        }
        formatted
      }
      grandTotal {
        amount
        currency {
          code
          symbol
          decimalDigits
          decimalSeparator
        }
        formatted
      }
      abandoned
      metadata
      currency {
        code
        symbol
        decimalSeparator
        decimalDigits
        __typename
      }
      __typename
    }
  }
`;

export const ADD_ITEMS = gql`
  mutation AddItem(
    $cartId: ID!
    $id: ID!
    $name: String
    $description: String
    $price: Int!
    $quantity: Int
  ) {
    addItem(
      input: {
        cartId: $cartId
        id: $id
        name: $name
        description: $description
        price: $price
        quantity: $quantity
      }
    ) {
      id
      isEmpty
      abandoned
      totalItems
      totalUniqueItems
      subTotal {
        formatted
      }
      items {
        id
        name
        description
        images
        unitTotal {
          amount
          formatted
        }
        lineTotal {
          amount
          formatted
        }
        quantity
        metadata
      }
    }
  }
`;
