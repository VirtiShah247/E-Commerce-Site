import PropTypes from "prop-types";
import { Fragment, useEffect, useRef, useState } from "react";
import { PiHeartStraightFill, PiHeartStraightLight, PiRulerLight } from "react-icons/pi";
import { BsBag } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Button } from "../utils/Button";
import { Accordion } from "../utils/Accordion";
import { Container } from "../utils/Container";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tooltip } from "react-tooltip";


export const ProductDisplay = ({ id, subHeader, name, currencySymbol, price, memberPrice, lengthCollection, color, articlesList, fits, styleCollection }) => {
    const [articleDetails, setArticleDetails] = useState();
    const [allArticleImages, setAllArticleImages] = useState(null);
    const [gallery, setGallery] = useState(null);
    const screenWidth = useRef(window.innerWidth);
    const [imagesWithPlaceholders, setImagesWithPlaceholders] = useState(allArticleImages);
    const [favouriteStatus, setFavouriteStatus] = useState(false);
    const [openAccordion, setOpenAccordion] = useState("");
    const [pageName, setPageName] = useState([]);
    const newArticleList = useRef(null);

    document.title = pageName;
    

    useEffect(() => {
        const newLengthCollection = lengthCollection.map((length) => length.value[0]);
        setPageName(`${name} - ${newLengthCollection.join(" - ")} - ${color}`);
    }, [])
    useEffect(() => {
        console.log("articlessssss");
        newArticleList.current = articlesList.filter((article) => (article?.redPrice?.price == undefined))
    }, [articlesList])

    useEffect(() => {
        console.log("newArticle: " + newArticleList.current);
        newArticleList?.current?.map((article, key) => {
            if (article?.code === id) {
                setArticleDetails({
                    "id": article?.code,
                    "description": article?.description,
                    "sizes": article?.variantsList,
                    "concept": article?.concepts,
                    "countryOfProduction": article?.countryOfProduction,
                    "productTypeName": article?.productTypeName,
                    "netQuantity": article?.netQuantity,
                    "importedDate": article?.importedDate,
                    "careGuide": article?.careInstructions,
                    "materials": article?.sustainabilityCompositions[0]?.materials,
                    "composition": article?.compositions[0].materials,
                    "materialDetails": article?.materialDetails,
                })
            }
            setAllArticleImages((prevDetails) => {
                if (key !== 0) {
                    return [...prevDetails, { "id": article?.code, "color": article?.color?.text, "imageUrl": article?.fabricSwatchThumbnails[0]?.baseUrl }];
                }
                else {
                    return [{ "id": article?.code,  "color": article?.color?.text, "imageUrl": article?.fabricSwatchThumbnails[0]?.baseUrl }];
                }
            })
        })
    }, [articlesList, id])
    useEffect(() => {
        newArticleList?.current?.map((article) => {
            if (article?.code === id) {
                console.log("callled");
                setGallery(article?.galleryDetails);
            }
        })
    }, [id])

    useEffect(() => {
        if (allArticleImages !== null) {
            let slidesToShowCount = 7;

            if (screenWidth < 641) {
                slidesToShowCount = 5;
            }
            else if (screenWidth < 769) {
                slidesToShowCount = 6;
            }
            const remainder = allArticleImages?.length % slidesToShowCount;
            const placeholderImages = Array(remainder).fill({
                id: 'placeholder',
                imageUrl: '',
            });

            setImagesWithPlaceholders([...allArticleImages, ...placeholderImages]);
        }

    }, [allArticleImages, screenWidth])
    const settings = {
        dots: false,
        autoplay: false,
        arrows: true,
        swipeToSlide: true,
    }
    const responsiveSetting = {
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                }
            },
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            }
        ]
    }
    return (
        <Fragment>
            <div className="text-center my-3 text-sm">
                <p className="inline">{subHeader} / </p>
                <span className="text-secondary-color font-bold">
                    {name}
                </span>
            </div>
            <Container size="fluid" className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-10 gap-5">
                {
                    screenWidth.current < 769 ?
                        (<Slider {...settings} slidesToShow={1} slidesToScroll={1} infinite={true} className="productDescriptionImage relative">
                            {
                                gallery?.map((image, key) => {
                                    return <>
                                        <img key={key} src={image.baseUrl} data-tooltip-id={`product-image-subHeader-${key + 1}`} />
                                    </>
                                })
                            }
                        </Slider>
                        )
                        :
                        <div className="grid xl:grid-cols-2 xl:col-span-2">
                            {
                                gallery?.map((image, key) => {
                                    return <>
                                        <Tooltip id={`product-image-subHeader-${key + 1}`} place="bottom" content={`${pageName} - ${key+1}`} />
                                        <img key={key} src={image.baseUrl} data-tooltip-id={`product-image-subHeader-${key + 1}`} className={`xl:col-span-1 ${key % 3 === 0 && `md:col-span-2`}`} />
                                    </>
                                })
                            }
                        </div>
                }
                {
                    screenWidth.current < 768 && <Button color="foreground-color" className="absolute right-12" onClick={() => setFavouriteStatus(!favouriteStatus)}>
                        {
                            favouriteStatus === true ?
                                <PiHeartStraightFill size={25} color="red" /> :
                                <PiHeartStraightLight size={25} />
                        }
                    </Button>
                }
                <div className="sticky top-24 h-fit">
                    <div className="my-5">
                        <div className="md:grid md:grid-cols-2">
                            <strong className="font-bold">{name}</strong>
                            {/* <PiHeartStraightFill size={25} color="red" /> : */}
                            <Button color="bg-base-color" className="hidden md:grid absolute right-0" onClick={() => setFavouriteStatus(!favouriteStatus)}>
                                {
                                    favouriteStatus === true ?
                                        <PiHeartStraightFill size={25} color="red" /> :
                                        <PiHeartStraightLight size={25} />
                                }
                            </Button>
                        </div>
                        <p className="text-sm">MRP inclusive of all taxes</p>
                        <div className="grid">
                            <p className=" text-xl font-medium">{currencySymbol}{price}.00</p>
                            {
                                memberPrice && <p className="py-0.5 px-5 w-auto max-w-fit bg-primary-color/50 absolute right-0">
                                    Member price {currencySymbol}{memberPrice}.00
                                </p>
                            }
                        </div>
                    </div>
                    <div>
                        <strong className="text-sm font-bold">{color}</strong>
                        <Slider {...settings} slidesToShow={7} slidesToScroll={7} infinite={false} {...responsiveSetting} className="relative allArticlesImagesSlider">
                            {
                                imagesWithPlaceholders?.map((image) => {
                                    return image.id === "placeholder" ? <div></div> :
                                        <Button color="baseColorButton" className="p-1">
                                            <Tooltip id={`product-image-color-${image.id}`} place="bottom" content={image.color} />
                                            <img key={image.id} src={image.imageUrl} alt="not found" data-tooltip-id = {`product-image-color-${image.id}`} className={`${image.id === id && `border-2 border-foreground-color `}`} />
                                        </Button>
                                })
                            }
                        </Slider>
                    </div>

                    {
                        articleDetails?.sizes !== null && <div className="mt-7 mb-5">
                            <p className="text-sm mb-2">Sizes</p>
                            <div className="flex flex-wrap gap-1.5 justify-items-stretch items-stretch">
                                {
                                    articleDetails?.sizes?.map((sizeDetails, key) => {
                                        return <Button key={key} color="baseColorButton" className="border border-foreground-color/30 py-2 px-9 focus:bg-foreground-color/25 focus:text-base-color active:bg-foreground-color active:text-base-color">{sizeDetails.size.name}</Button>
                                    })
                                }
                            </div>
                        </div>
                    }

                    <div className="flex items-stretch mb-1">
                        <PiRulerLight className="inline me-2" size={25} />
                        <Button color="baseColorButton" className="underline">Size Guide</Button>
                    </div>

                    <Button className="flex justify-center items-center gap-3 py-2 px-5 w-full bg-foreground-color text-base-color">
                        <BsBag size={15} className="inline" />
                        <strong>Add</strong>
                    </Button>
                    <div className="mt-10 border-t-2 border-foreground-color/50">
                        <Accordion
                            title="Description & fit"
                            Icon={openAccordion === "Description & fit" ? RiArrowUpSLine : RiArrowDownSLine}
                            titleClassName={`w-full font-bold hover:text-secondary-color ${openAccordion === "Description & fit" && `text-secondary-color`}`}
                            open={openAccordion === "Description & fit"}
                            onClick={() => setOpenAccordion(openAccordion === "Description & fit" ? '' : "Description & fit")}
                        >
                            <div className="my-3">
                                <p>{articleDetails?.description}</p>
                                <small>Article number: {id}</small>
                            </div>
                            <div className="text-sm leading-loose">
                                {
                                    articleDetails?.sizes && <strong>Size:</strong>
                                }
                                {
                                    articleDetails?.sizes?.map((size, key) => {
                                        return <p key={key}>
                                            <strong>{size?.size?.name}: </strong>
                                            <span>Width: {size?.width}, </span>
                                            <span>Length: {size?.length}</span>
                                        </p>
                                    })
                                }
                                {
                                    lengthCollection.map((length, key) => {
                                        const splitCode = length.code.split(/(?=[A-Z])/);
                                        const formattedCode = splitCode[0].charAt(0).toUpperCase() + splitCode[0].slice(1) + ' ' + splitCode[1];
                                        return <p key={key}>
                                            <strong>{formattedCode === "Garment Length" ? `Length: ` : formattedCode + `: `}</strong>
                                            <span>{length.value[0]}</span>
                                        </p>
                                    })
                                }
                                <p>
                                    <strong>Fit: </strong>
                                    <span>{fits[0]}</span>
                                </p>
                                <p>
                                    <strong>Style: </strong>
                                    {
                                        styleCollection?.map((style, key) => <span key={key}>{style}{key !== styleCollection.length - 1 && `, `}</span>)
                                    }
                                </p>
                                <p>
                                    <strong>Description: </strong>
                                    <span>{color}</span>
                                </p>
                                <p>
                                    <strong>Concept: </strong>
                                    <span>{articleDetails?.concept}</span>
                                </p>
                                <p>
                                    <strong>Price(MRP): </strong>
                                    <span>{currencySymbol}{price}.00</span>
                                </p>
                                <p>
                                    <strong>Country of Production: </strong>
                                    <span>{articleDetails?.countryOfProduction}</span>
                                </p>
                                <p>
                                    <strong>Common generic name: </strong>
                                    <span>{articleDetails?.productTypeName}</span>
                                </p>
                                <p>
                                    <strong>Net Quantity: </strong>
                                    <span>{articleDetails?.netQuantity}</span>
                                </p>
                                <p>
                                    <strong>Date of import: </strong>
                                    <span>{articleDetails?.importedDate}</span>
                                </p>
                            </div>
                        </Accordion>
                    </div>
                    <div className="mt-10 border-t-2 border-foreground-color/50">
                        <Accordion
                            title="Materials"
                            Icon={openAccordion === "Materials" ? RiArrowUpSLine : RiArrowDownSLine}
                            titleClassName={`w-full font-bold hover:text-secondary-color ${openAccordion === "Materials" && `text-secondary-color`}`}
                            open={openAccordion === "Materials"}
                            onClick={() => setOpenAccordion(openAccordion === "Materials" ? '' : "Materials")}
                        >
                            <div className="my-3">
                                <strong>Composition</strong>
                                <p className="text-sm">
                                    {
                                        articleDetails?.composition?.map((composition, key) => <span key={key}>{composition.name} {composition.percentage % 1 === 0 ? Math.floor(composition.percentage) : composition.percentage}%{key !== (articleDetails?.composition?.length - 1) && `, `}</span>)
                                    }
                                </p>
                            </div>
                            <div className="my-5">
                                <strong>Additional material information</strong>
                                <div className="text-sm">
                                    <p>The total weight of this product contains:</p>
                                    <ul className="ms-4">
                                        {
                                            articleDetails?.materials?.map((material, key) => <li key={key} className="list-disc">{material?.percentage % 1 === 0 ? Math.floor(material.percentage) : material.percentage}% {material?.name}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <strong>Materials in this product explained</strong>
                                <ul className="text-sm">
                                    {
                                        articleDetails?.materialDetails?.map((detail, key) => <li key={key} className="my-3">
                                            <strong>{detail.name}</strong>
                                            <p>{detail.description}</p>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </Accordion>
                    </div>
                    <div className="mt-10 border-t-2 border-foreground-color/50">
                        <Accordion
                            title="Care guide"
                            Icon={openAccordion === "Care guide" ? RiArrowUpSLine : RiArrowDownSLine}
                            titleClassName={`w-full font-bold hover:text-secondary-color ${openAccordion === "Care guide" && `text-secondary-color`}`}
                            open={openAccordion === "Care guide"}
                            onClick={() => setOpenAccordion(openAccordion === "Care guide" ? '' : "Care guide")}
                        >
                            <div>
                                <ul className="ms-4 text-sm leading-relaxed">
                                    {articleDetails?.careGuide?.map((instruction, key) => <li key={key} className="list-disc">{instruction}</li>)}
                                </ul>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </Container>
        </Fragment >
    )
}
ProductDisplay.propTypes = {
    id: PropTypes.node.isRequired,
    subHeader: PropTypes.node.isRequired,
    name: PropTypes.node.isRequired,
    currencySymbol: PropTypes.node.isRequired,
    price: PropTypes.node.isRequired,
    memberPrice: PropTypes.node.isRequired,
    lengthCollection: PropTypes.node.isRequired,
    color: PropTypes.node.isRequired,
    articlesList: PropTypes.node.isRequired,
    fits: PropTypes.node.isRequired,
    styleCollection: PropTypes.node.isRequired,
}
