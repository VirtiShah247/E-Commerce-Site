import { Fragment } from "react"
import { useAxios } from "../hooks/useAxios"
import { Container } from "../utils/Container";
import LoadingIcons from "react-loading-icons";
import { ProductCard } from "./ProductCard";

export const ProductsList = () => {
    const { data, loading, error } = useAxios("products");

    return (
        <Fragment>
            <h2 className="text-center underline my-2">
                Products
            </h2>
            <Container size="fluid" className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4 gap-5 mx-6">
                {
                    loading === true ? <LoadingIcons.Oval stroke="gray" className="relative left-14" /> :
                        error ? <p className="text-secondary-color">{error.message}</p> :
                            (
                                data !== null && data[0]?.results?.map((product) => {
                                    const details = {
                                        "id": product?.articles[0]?.code,
                                        "name": product?.articles[0]?.name,
                                        "price": product?.articles[0]?.whitePrice?.formattedValue,
                                        "memberPrice": product?.articles[0]?.yellowPrice?.formattedValue,
                                        "mainImage": product?.articles[0]?.images[0]?.baseUrl,
                                        "secondImage": product?.articles[0]?.logoPicture[0]?.url,
                                        "colorsCode": product?.rgbColors,
                                        "colorsName": product?.articleColorNames,
                                        "comingSoon": product?.articles[0]?.comingSoon,
                                        "sale": product?.sale,
                                        "concept": product?.concept,
                                        "sizes": product?.variantSizes,
                                        "allArticleCode": product?.allArticleCodes,
                                        "allArticleImages": product?.allArticleBaseImages,
                                        // "galleryImages": product?.galleryImages,
                                        "categoryName": product?.categoryName,
                                        "mainCategoryCode": product?.mainCategoryCode,
                                        "linkPdp": product?.linkPdp,
                                        "searchEngineProductId": product?.searchEngineProductId,
                                    }
                                    // console.log(" Loading states: " + loadingStates[details.id]);
                                    return <Container key={details.id} size="md" className="shadow-lg">
                                       
                                        <ProductCard {...details} />
                                    </Container>
                                })
                            )
                }



            </Container>
        </Fragment>
    )
}
