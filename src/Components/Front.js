import { Carousel } from "react-bootstrap";
import Home from './Home1';
import first from './image/image_processing20200121-30622-g2g2.gif';
import second from './image/YUM3.gif';
import third from './image/image_processing20191212-2957-1ywvw74.gif';

import './dash.css';
function DarkVariantExample() {
  return (
    <div>
        <Home/>
      
    <Carousel variant="dark">
      <Carousel.Item>
      <br></br>
        <center>
        <img
          className="d-block w-90"
          height={600}
          src={first}
          
          alt="First slide"
        />
        </center>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <br></br>
      <center>
        <img
          className="d-block w-90"
          src={second}
          height={700}
          alt="Second slide"
        />
        </center>
       
      </Carousel.Item>
      <Carousel.Item>
      <br></br>
        <center>
        <img
            className="d-block w-90"
          src={third}
          height={700}
          alt="Second slide"
        />
        </center>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default DarkVariantExample;