import { Fragment, useEffect, useRef, useState } from "react"
import landingPage1 from "../assets/landing-page-1.jpg";
import landingPage2 from "../assets/landing-page-2.jpg";
// import landingPage3 from "../assets/wepik-export.png";
// import { Link } from "react-router-dom";
// import { AiFillFacebook, AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
// import { FaPinterest } from "react-icons/fa";
// import { RiTwitterXLine } from "react-icons/ri";
export const LandingPage = () => {
    const landingPages = [{
        id: 1,
        imageLink: landingPage1
    },
    {
        id: 2,
        imageLink: landingPage2
    },
    // {
    //     id: 3,
    //     imageLink: landingPage2
    // },
    ];
    let sliderInterval;
    const [landingPageNo, setLandingPageNo] = useState(0);
    const sliderRef = useRef();
    // const removeAnimation = () => {
    //     sliderRef.current.classList.remove("fade-animation");
    // }
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
        // sliderRef.current.classList.add("fade-animation");
        // sliderRef.current.addEventListener("animationend", removeAnimation);
        sliderRef.current.addEventListener("mouseenter", pauseSlider);
        sliderRef.current.addEventListener("mouseleave", startSlider);
        console.log("ref: " + sliderRef.current);

    }
    return (
        <Fragment>
            <div className="relative">
                {
                    landingPages.map(landingPage =>
                        <div key={landingPage.id} className={`${landingPage.id == landingPageNo + 1 ? "grid" : "hidden"} "w-full text-foreground-color"`}>
                            {/* <div className="w-1/2 absolute grid gap-4 px-5 fade-animation">
                                <h2>Lorem Ipsum</h2>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci autem quam laborum inventore ut ex amet incidunt eum culpa exercitationem, quos itaque dolores placeat hic ullam repudiandae optio cumque! Exercitationem.</p>
                                <button className="bg-dark-yellow py-2">Learn more</button>
                                <div className="flex gap-2">
                                    <Link to="https://www.instagram.com/" className="hover:opacity-50">
                                        <div>
                                            <AiOutlineInstagram size={25} />
                                        </div>
                                    </Link>
                                    <Link to="https://www.facebook.com/" className="hover:opacity-50">
                                        <div>
                                            <AiFillFacebook size={25} />
                                        </div>
                                    </Link>
                                    <Link to="https://in.pinterest.com/" className="hover:opacity-50">
                                        <div>
                                            <FaPinterest size={25} />
                                        </div>
                                    </Link>
                                    <Link to="https://twitter.com/" className="hover:opacity-50">
                                        <div>
                                            <RiTwitterXLine size={25} />
                                        </div>
                                    </Link>
                                    <Link to="https://youtube.com/" className="hover:opacity-50">
                                        <div >
                                            <AiFillYoutube size={25} />
                                        </div>
                                    </Link>
                                </div>
                            </div> */}
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

