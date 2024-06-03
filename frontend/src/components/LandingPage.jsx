import { Fragment, useEffect, useRef, useState } from "react"
import landingPage1 from "../assets/landing-page-1.jpg";
import landingPage2 from "../assets/landing-page-2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const LandingPage = () => {
    const [landingPages, setLandingPages] = useState([{
        id: 1,
        imageLink: landingPage1,
        loading: true,
    },
    {
        id: 2,
        imageLink: landingPage2,
        loading: true,
    },
    ]);
    const landingPagesRef = useRef(landingPages);
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,

    }

    useEffect(() => {
        landingPagesRef?.current?.map((landingPage) => {
            if (landingPage?.imageLink !== null) {
                const img = new Image();
                img.src = landingPage?.imageLink;
                img.onload = () => {
                    setLandingPages((prevDetails) => prevDetails.map((detail) => detail.id === landingPage.id ? { ...detail, loading: false } : detail)
                    );
                }
            }
        })
    }, [])
    return (
        <Fragment>
            <div className="min-w-[200px]">
                <Slider {...settings} className="relative w-auto min-w-[200px]">
                    {
                        landingPages.map(landingPage =>
                            <div key={landingPage.id} className="w-full">
                                {
                                    landingPage.loading === true ? <div className="h-[600px] bg-slate-300">
                                        Loading....
                                    </div> :
                                        <img src={landingPage.imageLink} alt="landing-page" className="w-full h-auto max-h-[600px]" />
                                }
                            </div>)
                    }
                </Slider>
            </div>
        </Fragment>
    )
}

