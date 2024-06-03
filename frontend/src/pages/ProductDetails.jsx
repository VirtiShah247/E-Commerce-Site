import { Fragment, useState } from "react";
import { useParams } from "react-router-dom"
import { useAxios } from "../hooks/useAxios";
import { Container } from "../utils/Container";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../firebase/config";
import { ProductDisplay } from "../components/ProductDisplay";


export const ProductDetails = () => {
    const { id } = useParams();
    const { data, loading, error } = useAxios("product");
    const [currencySymbol, setCurrencySymbol] = useState("$");
    let productDetail;
    const toCapitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const fetchCountryData = async() => {
        const dataCollection = collection(firestoreDb, "country");
        const countryDocs = await getDocs(dataCollection);
        const countryDetails = countryDocs.docs.map((doc) => doc.data());
        setCurrencySymbol(countryDetails[0]?.currency);
    }
    if(!loading && data !== null){
        const product = data[0]?.data?.product;
        console.log("whiteprice:::: " + product?.whitePrice);
        fetchCountryData();
        productDetail = {
            "id": product?.code,
            "subHeader": product?.mainCategory?.code.split("_").map((item) => toCapitalize(item)).join(" / "),
            "name": product?.name,
            "currencySymbol": currencySymbol,
            "price": product?.whitePrice?.price,
            "memberPrice": product?.yellowPrice?.price,
            "lengthCollection": product?.lengthCollection,
            "color": product?.color?.text,
            "articlesList": product?.articlesList,
            "fits": product?.fits,
            "styleCollection": product?.styleCollection[0]?.value
        }
    }

    return (
        <Fragment key={id}>
            <Container>
                {
                    loading === true? 
                    <div className="h-dvh w-dvw bg-slate-300 grid content-center justify-center">
                        loading...
                    </div> :
                        (
                            error !== "" ? <div className="text-secondary-color">Error {error.message}</div> :
                                (
                                    <ProductDisplay {...productDetail}/>
                                )
                        )
                }
            </Container>
        </Fragment>
    )
}
