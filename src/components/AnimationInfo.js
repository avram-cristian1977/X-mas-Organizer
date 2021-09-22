import "./Animation.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const AnimationInfo = () => {
    return <>
        <div id="scroll-container">
            <div id="scroll-text">
                <div>
                <h3 className="contactTitle">Contact</h3> <br />
                Address: Dezrobirii Str. no 85, Craiova, Romania <br />
                Email : asct1977ro@gmail.com <br />
                Mobile : +40728181218 <br />
                Creator webside : www.avram-cristian.ro <br />
                Our team whishes you "Merry Christmas!"<br />
                <div className="socialMediaIcons">
                    <FontAwesomeIcon className="socialMediaIcon" icon={faFacebook} />
                    <FontAwesomeIcon className="socialMediaIcon" icon={faInstagram} />
                    <FontAwesomeIcon className="socialMediaIcon" icon={faYoutube} />
                    <FontAwesomeIcon className="socialMediaIcon" icon={faTwitter} />
                    <FontAwesomeIcon className="socialMediaIcon" icon={faWhatsapp} />
                </div>
                </div>
            </div>
        </div>
    
        


    </>
}

export default AnimationInfo;