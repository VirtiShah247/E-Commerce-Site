import { Fragment } from "react"
import { AiFillFacebook, AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
export const Footer = () => {
    return (
        <Fragment>
            <footer className="bg-dull-pink text-brown w-full grid sm:flex sm:flex-column sm:justify-evenly gap-20 sm:gap-5  place-items-center shadow-lg pt-[70px] pb-[40px] px-4">

                <div className="grid grid-cols-3 gap-3 sm:gap-10 text-wrap text-start">
                        <div>
                            <h4 className="mb-2 uppercase">Customer Service</h4>
                            <ul>
                                <Link to="/contact-us" className="hover:opacity-50">
                                    <li>
                                        Contact Us
                                    </li>
                                </Link>
                                <Link to="/delivery-returns" className="hover:opacity-50">
                                    <li>
                                        Delivery & Returns
                                    </li>
                                </Link>

                                {/* <li>
                                    Make An Appointment
                                </li>
                                <li>
                                    Bespoke Services
                                </li> */}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 uppercase">Our Company</h4>
                            <ul>
                                <Link to="/about-us" className="hover:opacity-50">
                                    <li>
                                        About us
                                    </li>
                                </Link>
                                <Link to="/news" className="hover:opacity-50">
                                    <li>
                                        News
                                    </li>
                                </Link>
                                <Link to="/terms-and-conditions" className="hover:opacity-50">
                                    <li>
                                        Terms & Conditions
                                    </li>
                                </Link>
                                <Link to="/website-conditions" className="hover:opacity-50">
                                    <li>
                                        Website Conditions
                                    </li>
                                </Link>
                                <Link to="privacy-policy" className="hover:opacity-50">
                                    <li>
                                        Privacy Policy
                                    </li>
                                </Link>

                                <Link to="/cookie-policy" className="hover:opacity-50">
                                    <li>
                                        Cookie Policy
                                    </li>
                                </Link>


                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 uppercase">Also Of Interest</h4>
                            <ul>
                                <Link to="/men" className="hover:opacity-50">
                                    <div>Men</div>
                                </Link>
                                <Link to="/women" className="hover:opacity-50">
                                    <div>Women</div>
                                </Link>
                                <Link to="/kids" className="hover:opacity-50">
                                    <div>Kids</div>
                                </Link>
                                <Link to="/beauty" className="hover:opacity-50">
                                    <div>Beauty</div>
                                </Link>
                            </ul>
                        </div>
                </div>
                <div className="text-center grid gap-y-4 -order-1 sm:order-1">
                    <div className="grid gap-y-2">
                        <h4 className="uppercase">Stay in touch</h4>
                        <p>Be the first to hear about new collections and exclusive events.</p>
                    </div>
                    <form className="flex flex-col items-center relative ps-2 pe-3">

                        <input type="email" placeholder="Email Address" id="email" name="email" className="grid w-full px-3 py-3 rounded-md focus:outline-none" />
                        <div className="absolute top-3 right-5">
                            {
                                <SlArrowRight size={20} />
                            }
                        </div>
                    </form>
                    <div className="flex gap-5 place-items-center justify-center text-brown">
                        <div>
                            <AiOutlineInstagram size={30} />
                        </div>
                        <div>
                            <AiFillFacebook size={30} />
                        </div>
                        <div>
                            <FaPinterest size={30} />
                        </div>
                        <div>
                            <RiTwitterXLine size={30} />
                        </div>
                        <div >
                            <AiFillYoutube size={30} />
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
