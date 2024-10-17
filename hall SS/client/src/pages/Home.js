import Destination from "../Components/Destination";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"
import Course from "../Components/Course";
import HomeImg from "../assets/homebanner2.png"

function Home (){
    return(
        <>
        <Navbar/>
        <Hero
            cName = "hero"
            heroImg ={HomeImg}
            title = "Discover perfect venue for your event"
            text = "Unlock the convenience of hall booking with our user-friendly website! "
            buttonText ="View Services"
            url = "../../service"
            btnClass = "show"
        />
        <Destination />
        <Course />
        <Footer />
        </>
    )
}

export default Home;