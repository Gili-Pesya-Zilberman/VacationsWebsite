import "./Home.css";

function Home(): JSX.Element {

    return (

        <div className="Home">

            <h5>
                Welcome to our vacation website! We're thrilled to offer a wide range of vacation packages that cater to every type of traveler. <br></br>
                Whether you're seeking adventure, relaxation, or a bit of both, we've got you covered.<br></br>
                Our vacation packages include everything from flights and accommodations to activities and meals, so you can sit back, relax, and enjoy your getaway.<br></br>
                From beachside retreats to city breaks, our packages are designed to suit a variety of travel styles and budgets. We offer romantic getaways, family-friendly vacations, adventure packages, spa retreats, and wellness vacations.
                Start planning your dream vacation today and let us help you create unforgettable memories that will last a lifetime.<br></br>
                So what are you waiting for?<br></br>
                log in or register and browse our collection of vacation packages, pick your dream destination, and let us take care of the rest.<br></br>
                With our expert travel planning, you'll be on your way to the vacation of a lifetime in no time!
            </h5>

            <span>
                <i className="bi bi-airplane"></i><i className="bi bi-bus-front"></i>
                <i className="bi bi-globe-asia-australia"></i>
            </span>

        </div>

    );

}

export default Home;