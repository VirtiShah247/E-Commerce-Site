import { Fragment } from "react"
import { LandingPage } from "../components/LandingPage"
import { Container } from "../utils/Container"
import { ProductsList } from "../components/ProductsList"

export const Home = () => {
  return (
    <Fragment>
      <LandingPage />
      <Container>
        <ProductsList />
      </Container>
    </Fragment>
  )
}
