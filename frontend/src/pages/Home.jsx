import { Fragment, Suspense } from "react"
import { LandingPage } from "../components/LandingPage"
import { Container } from "../utils/Container"
import { ProductsList } from "../components/ProductsList"

export const Home = () => {
  return (
    <Fragment>
      <Suspense fallback="loading.....">
        <LandingPage />
      </Suspense>
      <Container>
        <ProductsList />
      </Container>
    </Fragment>
  )
}
