import { Fragment, useEffect, useRef, useState } from "react"
import landingPage1 from "../assets/landing-page-1.jpg";
import landingPage2 from "../assets/landing-page-2.jpg";

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
    let sliderInterval;
    const [landingPageNo, setLandingPageNo] = useState(0);
    const sliderRef = useRef();
    useEffect(() => {
        
        startSlider();
        return () => {
            pauseSlider();
        }
    }, []);
    const startSlider = () => {
        sliderInterval = setInterval(() => {
            handleNextSlide();
        }, 2000);
    }
    const pauseSlider = () => {
        clearInterval(sliderInterval);
    }
    const handleNextSlide = () => {

        setLandingPageNo(landingPageNo => (landingPageNo + 1) % landingPages.length);
        sliderRef.current.addEventListener("mouseenter", pauseSlider);
        sliderRef.current.addEventListener("mouseleave", startSlider);

    }
    return (
        <Fragment>
            <div className="relative">
                {
                    landingPages.map(landingPage =>
                        <div key={landingPage.id} className={`${landingPage.id == landingPageNo + 1 ? "grid" : "hidden"} "w-full text-foreground-color"`}>
                            <div ref={sliderRef} className="">
                                <img src={landingPage.imageLink} alt="landing-page" className="w-full h-auto max-h-[600px] fade-animation" />
                            </div>
                        </div>)
                }
                <form action="" className="absolute bottom-0 left-1/2 space-x-3">
                    {
                        landingPages.map(landingPage => <button type="button" id={`radio${landingPage.id}`} key={landingPage.id} onClick={() => setLandingPageNo(landingPage.id - 1)}
                            className={`w-3 h-3 bg-base-color rounded-full  hover:bg-secondary-color  cursor-pointe focus:ring-1 focus:secondary-color   ${landingPage.id == landingPageNo + 1 && "!bg-secondary-color"}`}
                        />)
                    }
                </form>

            </div>

        </Fragment>
    )
}

