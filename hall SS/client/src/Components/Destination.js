import Mountain1 from "../assets/1.jpg";
import Mountain2 from "../assets/2.jpg";
import Mountain3 from "../assets/3.jpg";
import Mountain4 from "../assets/4.jpg";

import DestinationData from "./DestinationData";
import "./DestinationStyles.css"
const Destination = () => {
    return (
        <div className="destination">
           <h1>why is this website?</h1>
            <p>"Discover the ease of booking halls with our website! Whether it's for meetings, weddings, or parties, find the perfect venue hassle-free. With quick search options and transparent pricing, planning your event has never been simpler. Say goodbye to endless calls and emails – book your ideal space with just a few clicks!"</p>

            <DestinationData 
            className="first-des"
            heading="1. Our Event Plannnings"
            text="Our hall booking system offers a hassle-free solution for finding and reserving venues for various events. Whether you're planning a corporate meeting, a wedding reception, a birthday party, or any other gathering, our platform simplifies the entire process. Users can easily browse through a diverse range of venues, each equipped with detailed information such as capacity, amenities, and pricing. With a few clicks, they can check availability, compare options, and make secure bookings, all from the comfort of their own device. Our system eliminates the need for time-consuming phone calls and emails, providing a seamless experience for both hosts and guests."
            
            img1={Mountain1}
            img2={Mountain2}

          
            />
            <DestinationData

            className="first-des-reverse"
            heading="2. Our Services"
            text="Unlock the convenience of hall booking with our user-friendly website! Whether it's a small gathering or a large event, we've got you covered. Easily browse through our wide selection of venues, complete with detailed descriptions and photos, to find the perfect fit for your occasion. With straightforward booking options and instant availability checks, securing your preferred date and time is a breeze. Plus, our transparent pricing ensures no surprises, so you can plan your event with confidence. Say hello to stress-free event planning – start booking your ideal hall today!."

            img1={Mountain3}
            img2={Mountain4}


            />

        </div>
    )
}

export default Destination