import { Fragment } from "react"
import landingPage1 from "../assets/landing-page-1.jpg";
import landingPage2 from "../assets/landing-page-2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const LandingPage = () => {
    const landingPages = [{
        id: 1,
        imageLink: landingPage1
    },
    {
        id: 2,
        imageLink: landingPage2
    },
    ];
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
    return (
        <Fragment>
            <div className=" max-w-fit min-w-[200px]">
                <Slider {...settings} className="relative  max-w-fit min-w-[200px]">
                    {
                        landingPages.map(landingPage =>
                            <div key={landingPage.id} className="w-full">
                                <div>
                                    <img src={landingPage.imageLink} alt="landing-page" className="w-full h-auto max-h-[600px]" />
                                </div>
                            </div>)
                    }
                </Slider>
            </div>
        </Fragment>
    )
}

