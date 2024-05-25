import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { PiHeartStraightFill, PiHeartStraightLight } from "react-icons/pi";

export const ProductCard = ({ id, name, price, memberPrice, mainImage, secondImage, colorsCode, colorsName, allArticleCode }) => {
    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef();
    const [favouriteStatus, setFavouriteStatus] = useState(false);

    useEffect(() => {
        let observer;
        if (imgRef.current !== null) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setImgSrc(mainImage);
                        observer.disconnect();
                    }
                });
            });
            if (imgRef.current) {
                observer.observe(imgRef.current);
            }
            return () => {
                observer.disconnect();
            };
        }

    }, [mainImage, imgRef]);



    useEffect(() => {
        if (imgSrc !== null) {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => {
                setIsLoading(false);
            };
        }
    }, [imgSrc]);



    useEffect(() => {
        if (isLoading == false) {
            const imgElement = imgRef.current;
            const handleMouseOver = () => {
                imgElement.src = secondImage;
            };
            const handleMouseOut = () => {
                imgElement.src = mainImage;
            };
            imgElement.addEventListener("mouseover", handleMouseOver);
            imgElement.addEventListener("mouseout", handleMouseOut);

            return () => {
                imgElement.removeEventListener("mouseover", handleMouseOver);
                imgElement.removeEventListener("mouseout", handleMouseOut);
            };
        }
    }, [mainImage, secondImage, isLoading]);

    return (
        <Fragment key={id}>
            <div ref={imgRef}>
                {isLoading ? (
                    <Skeleton height={400} width={350} />
                ) : (
                    <div className="relative">
                        <Link to={`/product/${id}`}>
                            <img ref={imgRef} data-tooltip-id={`product-image-${id}`} src={imgSrc} alt="Product Image" />
                        </Link>
                        <button className="absolute bottom-2 right-3" onClick={() => setFavouriteStatus(!favouriteStatus)}>
                            {
                                favouriteStatus === true ?
                                    <PiHeartStraightFill size={25} color="red" /> :
                                    <PiHeartStraightLight size={25} />
                            }
                        </button>
                    </div>

                )}
            </div>
            <Link to={`/product/${id}`}>
                <div className="p-5">
                    <p>{name}</p>
                    <p>{price}</p>
                    <div className="flex gap-1 items-center">
                        {colorsCode.map((code, key) => (
                            <div
                                key={key}
                                data-tooltip-id={`product-color-${id}-${allArticleCode[key]}`}
                                className="rounded-full p-1 w-[13px] h-[13px]"
                                style={{ backgroundColor: code }}
                            ></div>
                        ))}
                        {colorsName.length > 4 && <div>+{colorsName.length - 4}</div>}
                    </div>
                    {memberPrice && <p className="text-sm text-secondary-color">Member price {memberPrice}</p>}
                </div>
            </Link>
            <Tooltip id={`product-image-${id}`} place="bottom" content={price} />
            {colorsCode.map((code, key) => (
                <Tooltip key={key} id={`product-color-${id}-${allArticleCode[key]}`} place="bottom" content={colorsName[key]} />
            ))}
        </Fragment>
    );
};

ProductCard.propTypes = {
    id: PropTypes.node.isRequired,
    name: PropTypes.node.isRequired,
    price: PropTypes.node.isRequired,
    memberPrice: PropTypes.node,
    mainImage: PropTypes.string.isRequired,
    secondImage: PropTypes.string.isRequired,
    colorsCode: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorsName: PropTypes.arrayOf(PropTypes.string).isRequired,
    allArticleCode: PropTypes.arrayOf(PropTypes.string).isRequired,
};
