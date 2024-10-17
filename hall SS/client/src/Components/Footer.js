import "./FooterStyle.css"

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1 ><b>SS COMPLEX</b></h1>
                    <p>Celebrate your special occassion with us!  </p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-behance-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                </div>
            </div>
            <div className="bottom">
                <div>
                    <h4>Services</h4>
                    <a href ="/">photography</a>
                    <a href ="/">transport</a>
                    <a href ="/">catering</a>
                    <a href ="/">event management</a>
                </div>
               
                <div>
                    <h4>Help</h4>
                    <a href ="/">Support</a>
                    <a href ="/">Troubles</a>
                    <a href ="/">Chat</a>
                    <a href ="/">Contact us</a>
                </div>
                <div>
                    <h4>Others</h4>
                    <a href ="/">Terms of Service</a>
                    <a href ="/">Privacy</a>
                    <a href ="/">Policy</a>
                    <a href ="/">License</a>
                </div>
            </div>

        </div>
    )
}

export default Footer